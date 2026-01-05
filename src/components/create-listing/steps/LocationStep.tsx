import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { COUNTRIES } from "../types";

interface LocationStepProps {
  type: 'pickup' | 'delivery';
  country: string;
  city: string;
  onUpdate: (data: { country: string; city: string }) => void;
}

const LocationStep = ({ type, country, city, onUpdate }: LocationStepProps) => {
  const { t } = useTranslation();

  const isPickup = type === 'pickup';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {isPickup ? t('wizard.pickupTitle') : t('wizard.deliveryTitle')}
        </h2>
        <p className="text-muted-foreground">
          {isPickup ? t('wizard.pickupSubtitle') : t('wizard.deliverySubtitle')}
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <p className="text-sm text-muted-foreground">
            {t('wizard.locationNote')}
          </p>
        </div>

        <div className="space-y-2">
          <Label>{t('wizard.country')}</Label>
          <Select
            value={country}
            onValueChange={(value) => onUpdate({ country: value, city })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('wizard.selectCountry')} />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">{t('wizard.cityPostcode')}</Label>
          <Input
            id="city"
            placeholder={t('wizard.cityPostcodePlaceholder')}
            value={city}
            onChange={(e) => onUpdate({ country, city: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
