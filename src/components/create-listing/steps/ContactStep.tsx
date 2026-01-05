import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Shield } from "lucide-react";
import { ListingFormData, PHONE_CODES } from "../types";

interface ContactStepProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

const ContactStep = ({ formData, onUpdate }: ContactStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {t('wizard.contactTitle')}
        </h2>
        <p className="text-muted-foreground">
          {t('wizard.contactSubtitle')}
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-0.5" />
          <p className="text-sm text-muted-foreground">
            {t('wizard.contactPrivacy')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {t('wizard.emailAddress')}
            </div>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t('wizard.emailPlaceholder')}
            value={formData.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {t('wizard.phoneNumber')}
            </div>
          </Label>
          <div className="flex gap-2">
            <Select
              value={formData.phoneCountryCode}
              onValueChange={(value) => onUpdate({ phoneCountryCode: value })}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PHONE_CODES.map((code) => (
                  <SelectItem key={code.code} value={code.code}>
                    {code.code} {code.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder={t('wizard.phonePlaceholder')}
              value={formData.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreedToTerms"
              checked={formData.agreedToTerms}
              onCheckedChange={(checked) => 
                onUpdate({ agreedToTerms: checked as boolean })
              }
            />
            <Label htmlFor="agreedToTerms" className="cursor-pointer leading-relaxed">
              {t('wizard.agreeToTerms')}{' '}
              <a href="/terms" className="text-primary hover:underline">
                {t('wizard.termsOfService')}
              </a>{' '}
              {t('wizard.and')}{' '}
              <a href="/privacy" className="text-primary hover:underline">
                {t('wizard.privacyPolicy')}
              </a>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStep;
