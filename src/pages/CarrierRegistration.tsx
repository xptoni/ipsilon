import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check, Truck, SkipForward } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InfoCards from "@/components/carrier-registration/InfoCards";

const INTRO_STEPS = 5;
const FORM_STEPS = 10;
const TOTAL_STEPS = INTRO_STEPS + FORM_STEPS;

const countryCodes = [
  { code: "+385", country: "HR", flag: "🇭🇷" },
  { code: "+386", country: "SI", flag: "🇸🇮" },
  { code: "+387", country: "BA", flag: "🇧🇦" },
  { code: "+381", country: "RS", flag: "🇷🇸" },
  { code: "+382", country: "ME", flag: "🇲🇪" },
  { code: "+383", country: "XK", flag: "🇽🇰" },
  { code: "+389", country: "MK", flag: "🇲🇰" },
  { code: "+43", country: "AT", flag: "🇦🇹" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+36", country: "HU", flag: "🇭🇺" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+48", country: "PL", flag: "🇵🇱" },
  { code: "+420", country: "CZ", flag: "🇨🇿" },
  { code: "+421", country: "SK", flag: "🇸🇰" },
  { code: "+40", country: "RO", flag: "🇷🇴" },
  { code: "+359", country: "BG", flag: "🇧🇬" },
  { code: "+30", country: "GR", flag: "🇬🇷" },
];

const insuranceTypes = [
  { id: "git", label: "carrierReg.insuranceGIT" },
  { id: "cmr", label: "carrierReg.insuranceCMR" },
  { id: "none", label: "carrierReg.insuranceNone" },
];

const transportCategories = [
  { id: "cars", label: "wizard.categories.cars" },
  { id: "motorcycles", label: "wizard.categories.motorcycles" },
  { id: "furniture", label: "wizard.categories.furniture" },
  { id: "appliances", label: "wizard.categories.appliances" },
  { id: "boxes", label: "wizard.categories.boxes" },
  { id: "pallets", label: "wizard.categories.pallets" },
  { id: "machinery", label: "wizard.categories.machinery" },
  { id: "boats", label: "wizard.categories.boats" },
  { id: "other", label: "wizard.categories.other" },
];

const vehicleCounts = [
  { id: "1", label: "carrierReg.vehicles1" },
  { id: "2-3", label: "carrierReg.vehicles2to3" },
  { id: "4-9", label: "carrierReg.vehicles4to9" },
  { id: "10+", label: "carrierReg.vehicles10plus" },
  { id: "fleet", label: "carrierReg.vehiclesFleet" },
];

const coverageAreas = [
  { id: "local", label: "carrierReg.coverageLocal" },
  { id: "domestic", label: "carrierReg.coverageDomestic" },
  { id: "international", label: "carrierReg.coverageInternational" },
];

const countries = [
  { code: "HR", name: "Croatia" },
  { code: "SI", name: "Slovenia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "RS", name: "Serbia" },
  { code: "ME", name: "Montenegro" },
  { code: "XK", name: "Kosovo" },
  { code: "MK", name: "North Macedonia" },
  { code: "AT", name: "Austria" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "HU", name: "Hungary" },
  { code: "UK", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "SK", name: "Slovakia" },
  { code: "RO", name: "Romania" },
  { code: "BG", name: "Bulgaria" },
  { code: "GR", name: "Greece" },
];

interface FormData {
  fullName: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  userType: "individual" | "business" | "";
  insurance: string[];
  categories: string[];
  vehicleCount: string;
  coverageArea: string[];
  baseCity: string;
  baseCountry: string;
}

const CarrierRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    countryCode: "+385",
    phoneNumber: "",
    userType: "",
    insurance: [],
    categories: [],
    vehicleCount: "",
    coverageArea: [],
    baseCity: "",
    baseCountry: "HR",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    // Info cards don't need validation
    if (step <= INTRO_STEPS) return true;

    const formStep = step - INTRO_STEPS;
    const newErrors: Record<string, string> = {};

    switch (formStep) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = t("carrierReg.errorRequired");
        }
        break;
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = t("carrierReg.errorRequired");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = t("carrierReg.errorInvalidEmail");
        }
        break;
      case 3:
        if (!formData.password.trim()) {
          newErrors.password = t("carrierReg.errorRequired");
        } else if (formData.password.length < 8) {
          newErrors.password = t("carrierReg.errorPasswordMin");
        }
        break;
      case 4:
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = t("carrierReg.errorRequired");
        }
        break;
      case 5:
        if (!formData.userType) {
          newErrors.userType = t("carrierReg.errorRequired");
        }
        break;
      case 6:
        if (formData.insurance.length === 0) {
          newErrors.insurance = t("carrierReg.errorSelectOne");
        }
        break;
      case 7:
        if (formData.categories.length === 0) {
          newErrors.categories = t("carrierReg.errorSelectOne");
        }
        break;
      case 8:
        if (!formData.vehicleCount) {
          newErrors.vehicleCount = t("carrierReg.errorRequired");
        }
        break;
      case 9:
        if (formData.coverageArea.length === 0) {
          newErrors.coverageArea = t("carrierReg.errorSelectOne");
        }
        break;
      case 10:
        if (!formData.baseCity.trim()) {
          newErrors.baseCity = t("carrierReg.errorRequired");
        }
        if (!formData.baseCountry) {
          newErrors.baseCountry = t("carrierReg.errorRequired");
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsComplete(true);
    toast({
      title: t("carrierReg.successToast"),
      description: t("carrierReg.successToastDesc"),
    });
  };

  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  if (isComplete) {
    return (
      <Layout hideFooter>
        <div className="min-h-[80vh] flex items-center justify-center p-4">
          <Card className="max-w-lg w-full text-center">
            <div className="pt-12 pb-8 px-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                {t("carrierReg.successTitle")}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t("carrierReg.successMessage")}
              </p>
              <Button onClick={() => navigate("/")} className="w-full">
                {t("common.backToHome")}
              </Button>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  const isIntroPhase = currentStep <= INTRO_STEPS;
  const formStep = currentStep - INTRO_STEPS;

  const handleSkipIntro = () => {
    setCurrentStep(INTRO_STEPS + 1);
  };

  const renderStep = () => {
    if (isIntroPhase) {
      return <InfoCards step={currentStep} />;
    }

    switch (formStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">{t("carrierReg.fullName")} *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder={t("carrierReg.fullNamePlaceholder")}
                className="mt-2"
              />
              {errors.fullName && (
                <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{t("carrierReg.email")} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder={t("carrierReg.emailPlaceholder")}
                className="mt-2"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">{t("carrierReg.password")} *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder={t("carrierReg.passwordPlaceholder")}
                className="mt-2"
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label>{t("carrierReg.phoneNumber")} *</Label>
              <div className="flex gap-2 mt-2">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) =>
                    setFormData({ ...formData, countryCode: value })
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder={t("carrierReg.phonePlaceholder")}
                  className="flex-1"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-destructive text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <Label>{t("carrierReg.userType")} *</Label>
            <RadioGroup
              value={formData.userType}
              onValueChange={(value: "individual" | "business") =>
                setFormData({ ...formData, userType: value })
              }
              className="mt-2"
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual" className="cursor-pointer flex-1">
                  {t("carrierReg.individual")}
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business" className="cursor-pointer flex-1">
                  {t("carrierReg.business")}
                </Label>
              </div>
            </RadioGroup>
            {errors.userType && (
              <p className="text-destructive text-sm mt-1">{errors.userType}</p>
            )}
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <Label>{t("carrierReg.insuranceType")} *</Label>
            <div className="space-y-3 mt-2">
              {insuranceTypes.map((insurance) => (
                <div
                  key={insurance.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      insurance: toggleArrayItem(formData.insurance, insurance.id),
                    })
                  }
                >
                  <Checkbox
                    checked={formData.insurance.includes(insurance.id)}
                    onCheckedChange={() =>
                      setFormData({
                        ...formData,
                        insurance: toggleArrayItem(formData.insurance, insurance.id),
                      })
                    }
                  />
                  <Label className="cursor-pointer flex-1">
                    {t(insurance.label)}
                  </Label>
                </div>
              ))}
            </div>
            {errors.insurance && (
              <p className="text-destructive text-sm mt-1">{errors.insurance}</p>
            )}
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <Label>{t("carrierReg.transportCategories")} *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {transportCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      categories: toggleArrayItem(formData.categories, category.id),
                    })
                  }
                >
                  <Checkbox
                    checked={formData.categories.includes(category.id)}
                    onCheckedChange={() =>
                      setFormData({
                        ...formData,
                        categories: toggleArrayItem(formData.categories, category.id),
                      })
                    }
                  />
                  <Label className="cursor-pointer flex-1 text-sm">
                    {t(category.label)}
                  </Label>
                </div>
              ))}
            </div>
            {errors.categories && (
              <p className="text-destructive text-sm mt-1">{errors.categories}</p>
            )}
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <Label>{t("carrierReg.vehicleCount")} *</Label>
            <RadioGroup
              value={formData.vehicleCount}
              onValueChange={(value) =>
                setFormData({ ...formData, vehicleCount: value })
              }
              className="mt-2"
            >
              {vehicleCounts.map((count) => (
                <div
                  key={count.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <RadioGroupItem value={count.id} id={count.id} />
                  <Label htmlFor={count.id} className="cursor-pointer flex-1">
                    {t(count.label)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.vehicleCount && (
              <p className="text-destructive text-sm mt-1">{errors.vehicleCount}</p>
            )}
          </div>
        );
      case 9:
        return (
          <div className="space-y-4">
            <Label>{t("carrierReg.coverageArea")} *</Label>
            <div className="space-y-3 mt-2">
              {coverageAreas.map((area) => (
                <div
                  key={area.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      coverageArea: toggleArrayItem(formData.coverageArea, area.id),
                    })
                  }
                >
                  <Checkbox
                    checked={formData.coverageArea.includes(area.id)}
                    onCheckedChange={() =>
                      setFormData({
                        ...formData,
                        coverageArea: toggleArrayItem(formData.coverageArea, area.id),
                      })
                    }
                  />
                  <Label className="cursor-pointer flex-1">
                    {t(area.label)}
                  </Label>
                </div>
              ))}
            </div>
            {errors.coverageArea && (
              <p className="text-destructive text-sm mt-1">{errors.coverageArea}</p>
            )}
          </div>
        );
      case 10:
        return (
          <div className="space-y-4">
            <Label>{t("carrierReg.baseLocation")} *</Label>
            <div className="space-y-4 mt-2">
              <div>
                <Label htmlFor="baseCity" className="text-sm text-muted-foreground">
                  {t("carrierReg.city")}
                </Label>
                <Input
                  id="baseCity"
                  value={formData.baseCity}
                  onChange={(e) =>
                    setFormData({ ...formData, baseCity: e.target.value })
                  }
                  placeholder={t("carrierReg.cityPlaceholder")}
                  className="mt-1"
                />
                {errors.baseCity && (
                  <p className="text-destructive text-sm mt-1">{errors.baseCity}</p>
                )}
              </div>
              <div>
                <Label htmlFor="baseCountry" className="text-sm text-muted-foreground">
                  {t("carrierReg.country")}
                </Label>
                <Select
                  value={formData.baseCountry}
                  onValueChange={(value) =>
                    setFormData({ ...formData, baseCountry: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.baseCountry && (
                  <p className="text-destructive text-sm mt-1">{errors.baseCountry}</p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    if (isIntroPhase) return "";
    switch (formStep) {
      case 1: return t("carrierReg.step1Title");
      case 2: return t("carrierReg.step2Title");
      case 3: return t("carrierReg.step3Title");
      case 4: return t("carrierReg.step4Title");
      case 5: return t("carrierReg.step5Title");
      case 6: return t("carrierReg.step6Title");
      case 7: return t("carrierReg.step7Title");
      case 8: return t("carrierReg.step8Title");
      case 9: return t("carrierReg.step9Title");
      case 10: return t("carrierReg.step10Title");
      default: return "";
    }
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-muted/30">
        <Card className="max-w-xl w-full">
          <CardHeader className="text-center">
            {/* Progress dots - separate for intro and form phases */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {isIntroPhase ? (
                // Intro phase dots
                Array.from({ length: INTRO_STEPS }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index + 1 === currentStep
                        ? "w-8 bg-primary"
                        : index + 1 < currentStep
                        ? "w-2 bg-primary"
                        : "w-2 bg-muted-foreground/30"
                    }`}
                  />
                ))
              ) : (
                // Form phase dots
                Array.from({ length: FORM_STEPS }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index + 1 === formStep
                        ? "w-8 bg-primary"
                        : index + 1 < formStep
                        ? "w-2 bg-primary"
                        : "w-2 bg-muted-foreground/30"
                    }`}
                  />
                ))
              )}
            </div>
            {!isIntroPhase && (
              <>
                <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
                <CardDescription>
                  {t("carrierReg.stepOf", { current: formStep, total: FORM_STEPS })}
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}

            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("carrierReg.back")}
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  t("carrierReg.submitting")
                ) : currentStep === TOTAL_STEPS ? (
                  <>
                    {t("carrierReg.submit")}
                    <Check className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    {t("carrierReg.next")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Skip intro link */}
            {isIntroPhase && (
              <div className="text-center">
                <button
                  onClick={handleSkipIntro}
                  className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  {t("carrierIntro.skipIntro")}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CarrierRegistration;
