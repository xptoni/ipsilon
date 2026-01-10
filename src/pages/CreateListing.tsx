import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";

import WizardStepper from "@/components/create-listing/WizardStepper";
import CategoryStep from "@/components/create-listing/steps/CategoryStep";
import DescriptionStep from "@/components/create-listing/steps/DescriptionStep";
import PhotosStep from "@/components/create-listing/steps/PhotosStep";
import LocationStep from "@/components/create-listing/steps/LocationStep";
import TimeframeStep from "@/components/create-listing/steps/TimeframeStep";
import ContactStep from "@/components/create-listing/steps/ContactStep";
import { ListingFormData, initialFormData, Category } from "@/components/create-listing/types";

const STORAGE_KEY = 'ipsilon_listing_draft';
const QUICK_QUOTE_KEY = 'ipsilon_quick_quote';

const CreateListing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [wasPrefilled, setWasPrefilled] = useState(false);
  const [formData, setFormData] = useState<ListingFormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...initialFormData, ...parsed, photos: [] };
      } catch {
        return initialFormData;
      }
    }
    return initialFormData;
  });

  // Check for quick quote prefill on mount
  useEffect(() => {
    const quickQuote = localStorage.getItem(QUICK_QUOTE_KEY);
    if (quickQuote) {
      try {
        const prefill = JSON.parse(quickQuote);
        if (prefill.prefilled) {
          const updates: Partial<ListingFormData> = {};
          let shouldSkipSteps = false;
          
          if (prefill.category) {
            updates.category = prefill.category as Category;
            shouldSkipSteps = true;
          }
          if (prefill.pickupCity) {
            updates.pickupCity = prefill.pickupCity;
            updates.pickupCountry = 'uk'; // Default to UK if not specified
          }
          if (prefill.deliveryCity) {
            updates.deliveryCity = prefill.deliveryCity;
            updates.deliveryCountry = 'uk'; // Default to UK if not specified
          }
          
          if (Object.keys(updates).length > 0) {
            setFormData((prev) => ({ ...prev, ...updates }));
            setWasPrefilled(true);
            
            // Determine which step to start from
            if (shouldSkipSteps) {
              // If category is prefilled, skip to description step
              setCurrentStep(2);
            }
          }
          
          // Clear the quick quote data
          localStorage.removeItem(QUICK_QUOTE_KEY);
        }
      } catch {
        // Invalid JSON, ignore
        localStorage.removeItem(QUICK_QUOTE_KEY);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const dataToSave = { ...formData, photos: [] }; // Don't save files
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData]);

  const updateFormData = (data: Partial<ListingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleCategorySelect = (category: Category) => {
    updateFormData({ category });
    setCurrentStep(2);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.category;
      case 2:
        return true; // All optional
      case 3:
        return true; // Optional
      case 4:
        return !!formData.pickupCountry && !!formData.pickupCity;
      case 5:
        return !!formData.deliveryCountry && !!formData.deliveryCity;
      case 6:
        return !!formData.timeframe;
      case 7:
        return !!formData.email && !!formData.phone && formData.agreedToTerms;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Clear saved draft and quick quote
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(QUICK_QUOTE_KEY);
    
    // Generate fake listing ID
    const listingId = `LST-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    toast.success(t('wizard.listingCreated'));
    navigate(`/listing-success?id=${listingId}`);
    setIsLoading(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CategoryStep
            selectedCategory={formData.category}
            onSelect={handleCategorySelect}
          />
        );
      case 2:
        return (
          <DescriptionStep
            category={formData.category!}
            formData={formData}
            onUpdate={updateFormData}
          />
        );
      case 3:
        return (
          <PhotosStep
            photos={formData.photos}
            onUpdate={(photos) => updateFormData({ photos })}
          />
        );
      case 4:
        return (
          <LocationStep
            type="pickup"
            country={formData.pickupCountry}
            city={formData.pickupCity}
            onUpdate={({ country, city }) => 
              updateFormData({ pickupCountry: country, pickupCity: city })
            }
          />
        );
      case 5:
        return (
          <LocationStep
            type="delivery"
            country={formData.deliveryCountry}
            city={formData.deliveryCity}
            onUpdate={({ country, city }) => 
              updateFormData({ deliveryCountry: country, deliveryCity: city })
            }
          />
        );
      case 6:
        return (
          <TimeframeStep
            formData={formData}
            onUpdate={updateFormData}
          />
        );
      case 7:
        return (
          <ContactStep
            formData={formData}
            onUpdate={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout hideFooter>
      <div className="container max-w-4xl py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('wizard.backToHome')}
        </Button>

        {wasPrefilled && (
          <Alert className="mb-6 bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              {t('success.prefilledBanner')}
            </AlertDescription>
          </Alert>
        )}

        <WizardStepper currentStep={currentStep} totalSteps={7} />

        <Card>
          <CardContent className="pt-6 pb-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('wizard.previous')}
              </Button>

              {currentStep === 7 ? (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!canProceed() || isLoading}
                  className="px-8"
                >
                  {isLoading ? (
                    t('wizard.submitting')
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t('wizard.submitButton')}
                    </>
                  )}
                </Button>
              ) : currentStep === 3 ? (
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={handleNext}>
                    {t('wizard.skip')}
                  </Button>
                  <Button onClick={handleNext} disabled={!canProceed()}>
                    {t('wizard.continue')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  {t('wizard.continue')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateListing;
