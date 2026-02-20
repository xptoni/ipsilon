import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Category, ListingFormData } from "../types";

interface DescriptionStepProps {
  category: Category;
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

const DescriptionStep = ({ category, formData, onUpdate }: DescriptionStepProps) => {
  const { t } = useTranslation();

  const isVehicle = ['cars', 'motorcycles', 'boats'].includes(category);
  const showPurchaseLink = ['furniture', 'appliances', 'machinery'].includes(category);

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

        {isVehicle && (
          <>
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
          </>
        )}

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
    </div>
  );
};

export default DescriptionStep;
