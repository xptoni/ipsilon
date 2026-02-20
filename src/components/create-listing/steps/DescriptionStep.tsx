import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ChevronDown, ChevronUp, X, Car } from "lucide-react";
import { Category, ListingFormData, VehicleData } from "../types";

interface DescriptionStepProps {
  category: Category;
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

const VehicleForm = ({
  vehicle,
  onChange,
  category,
}: {
  vehicle: VehicleData;
  onChange: (data: Partial<VehicleData>) => void;
  category: Category;
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('wizard.titleLabel', 'What do you need transport for?')}</Label>
        <Input
          placeholder={t('wizard.titlePlaceholder', 'e.g. BMW 3 Series')}
          value={vehicle.title || ''}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('wizard.make')}</Label>
          <Input
            placeholder={t('wizard.makePlaceholder')}
            value={vehicle.make || ''}
            onChange={(e) => onChange({ make: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>{t('wizard.model')}</Label>
          <Input
            placeholder={t('wizard.modelPlaceholder')}
            value={vehicle.model || ''}
            onChange={(e) => onChange({ model: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>{t('wizard.year')}</Label>
        <Input
          placeholder={t('wizard.yearPlaceholder')}
          value={vehicle.year || ''}
          onChange={(e) => onChange({ year: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>
          {t('wizard.description')} <span className="text-muted-foreground">({t('wizard.optional')})</span>
        </Label>
        <Textarea
          placeholder={t('wizard.descriptionPlaceholder')}
          value={vehicle.description || ''}
          onChange={(e) => onChange({ description: e.target.value.slice(0, 500) })}
          rows={3}
        />
        <p className="text-xs text-muted-foreground text-right">
          {vehicle.description?.length || 0}/500
        </p>
      </div>
    </div>
  );
};

const CollapsedVehicleCard = ({
  vehicle,
  index,
  onExpand,
  onRemove,
}: {
  vehicle: VehicleData;
  index: number;
  onExpand: () => void;
  onRemove: () => void;
}) => {
  const { t } = useTranslation();
  const label = vehicle.title || vehicle.make
    ? [vehicle.make, vehicle.model, vehicle.year].filter(Boolean).join(' ') || vehicle.title
    : `${t('wizard.vehicle', 'Vehicle')} ${index + 1}`;

  return (
    <Card className="border-muted bg-muted/30">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Car className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">{t('wizard.vehicle', 'Vehicle')} {index + 1}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onExpand}>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove} className="text-destructive hover:text-destructive">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const DescriptionStep = ({ category, formData, onUpdate }: DescriptionStepProps) => {
  const { t } = useTranslation();
  const isVehicle = ['cars', 'motorcycles'].includes(category);
  const showPurchaseLink = ['furniture', 'appliances', 'machinery'].includes(category);

  // For vehicles with multi-vehicle support
  const vehicles = formData.vehicles || [];
  const hasMultipleVehicles = vehicles.length > 0;
  const [expandedVehicle, setExpandedVehicle] = useState<number | null>(
    hasMultipleVehicles ? vehicles.length - 1 : null
  );

  const updateVehicle = (index: number, data: Partial<VehicleData>) => {
    const updated = [...vehicles];
    updated[index] = { ...updated[index], ...data };
    onUpdate({ vehicles: updated });
  };

  const addVehicle = () => {
    // If this is the first "add more", move current main form data into vehicles[0]
    if (vehicles.length === 0) {
      const firstVehicle: VehicleData = {
        title: formData.title,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        description: formData.description,
      };
      onUpdate({
        vehicles: [firstVehicle, {}],
        title: undefined,
        make: undefined,
        model: undefined,
        year: undefined,
        description: undefined,
      });
      setExpandedVehicle(1);
    } else {
      onUpdate({ vehicles: [...vehicles, {}] });
      setExpandedVehicle(vehicles.length);
    }
  };

  const removeVehicle = (index: number) => {
    const updated = vehicles.filter((_, i) => i !== index);
    if (updated.length === 1) {
      // Move back to single vehicle mode
      const remaining = updated[0];
      onUpdate({
        vehicles: [],
        title: remaining.title,
        make: remaining.make,
        model: remaining.model,
        year: remaining.year,
        description: remaining.description,
      });
      setExpandedVehicle(null);
    } else {
      onUpdate({ vehicles: updated });
      if (expandedVehicle === index) {
        setExpandedVehicle(updated.length - 1);
      } else if (expandedVehicle !== null && expandedVehicle > index) {
        setExpandedVehicle(expandedVehicle - 1);
      }
    }
  };

  // Single vehicle mode (no "add more" clicked yet)
  const renderSingleVehicleForm = () => (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title">{t('wizard.titleLabel', 'What do you need transport for?')}</Label>
        <Input
          id="title"
          placeholder={t('wizard.titlePlaceholder', 'e.g. BMW 3 Series')}
          value={formData.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="make">{t('wizard.make')}</Label>
          <Input
            id="make"
            placeholder={t('wizard.makePlaceholder')}
            value={formData.make || ''}
            onChange={(e) => onUpdate({ make: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">{t('wizard.model')}</Label>
          <Input
            id="model"
            placeholder={t('wizard.modelPlaceholder')}
            value={formData.model || ''}
            onChange={(e) => onUpdate({ model: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="year">{t('wizard.year')}</Label>
        <Input
          id="year"
          placeholder={t('wizard.yearPlaceholder')}
          value={formData.year || ''}
          onChange={(e) => onUpdate({ year: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          {t('wizard.description')} <span className="text-muted-foreground">({t('wizard.optional')})</span>
        </Label>
        <Textarea
          id="description"
          placeholder={t('wizard.descriptionPlaceholder')}
          value={formData.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value.slice(0, 500) })}
          rows={4}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.description?.length || 0}/500
        </p>
      </div>
    </div>
  );

  // Multi vehicle mode
  const renderMultiVehicleForm = () => (
    <div className="space-y-3 max-w-lg mx-auto">
      {vehicles.map((vehicle, index) =>
        expandedVehicle === index ? (
          <Card key={index} className="border-primary/30">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">
                  {t('wizard.vehicle', 'Vehicle')} {index + 1}
                </h3>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setExpandedVehicle(null)}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  {vehicles.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeVehicle(index)} className="text-destructive hover:text-destructive">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <VehicleForm
                vehicle={vehicle}
                onChange={(data) => updateVehicle(index, data)}
                category={category}
              />
            </CardContent>
          </Card>
        ) : (
          <CollapsedVehicleCard
            key={index}
            vehicle={vehicle}
            index={index}
            onExpand={() => setExpandedVehicle(index)}
            onRemove={() => removeVehicle(index)}
          />
        )
      )}
    </div>
  );

  // Non-vehicle form (furniture, appliances, etc.)
  const renderNonVehicleForm = () => (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title">{t('wizard.titleLabel', 'What do you need transport for?')}</Label>
        <Input
          id="title"
          placeholder={t('wizard.titlePlaceholder', 'e.g. BMW 3 Series')}
          value={formData.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          {t('wizard.description')} <span className="text-muted-foreground">({t('wizard.optional')})</span>
        </Label>
        <Textarea
          id="description"
          placeholder={t('wizard.descriptionPlaceholder')}
          value={formData.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value.slice(0, 500) })}
          rows={4}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.description?.length || 0}/500
        </p>
      </div>

      {showPurchaseLink && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasPurchaseLink"
              checked={formData.hasPurchaseLink}
              onCheckedChange={(checked) =>
                onUpdate({ hasPurchaseLink: checked as boolean, purchaseLink: '' })
              }
            />
            <Label htmlFor="hasPurchaseLink" className="cursor-pointer">
              {t('wizard.hasPurchaseLink')}
            </Label>
          </div>

          {formData.hasPurchaseLink && (
            <div className="space-y-2 pl-6">
              <Input
                placeholder={t('wizard.purchaseLinkPlaceholder')}
                value={formData.purchaseLink || ''}
                onChange={(e) => onUpdate({ purchaseLink: e.target.value })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {t('wizard.descriptionTitle')}
        </h2>
        <p className="text-muted-foreground">
          {t('wizard.descriptionSubtitle')}
        </p>
      </div>

      {isVehicle ? (
        <>
          {hasMultipleVehicles ? renderMultiVehicleForm() : renderSingleVehicleForm()}

          {/* Add more vehicle section */}
          <div className="max-w-lg mx-auto pt-2">
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                {t('wizard.multiVehicleHint', 'Need transport for multiple vehicles?')}
              </p>
              <Button variant="outline" size="sm" onClick={addVehicle} className="gap-2">
                <Plus className="h-4 w-4" />
                {t('wizard.addMoreVehicle', 'Add another vehicle')}
              </Button>
            </div>
          </div>
        </>
      ) : (
        renderNonVehicleForm()
      )}
    </div>
  );
};

export default DescriptionStep;
