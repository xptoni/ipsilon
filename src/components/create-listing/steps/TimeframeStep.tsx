import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TimeframeType, ListingFormData } from "../types";

interface TimeframeStepProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

const TimeframeStep = ({ formData, onUpdate }: TimeframeStepProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const timeframeOptions: { id: TimeframeType; labelKey: string }[] = [
    { id: 'within-week', labelKey: 'wizard.timeframeWithinWeek' },
    { id: 'within-2-weeks', labelKey: 'wizard.timeframeWithin2Weeks' },
    { id: 'specific-date', labelKey: 'wizard.timeframeSpecificDate' },
    { id: 'between-dates', labelKey: 'wizard.timeframeBetweenDates' },
    { id: 'flexible', labelKey: 'wizard.timeframeFlexible' },
    { id: 'no-date', labelKey: 'wizard.timeframeNoDate' },
  ];

  const handleSelect = (timeframe: TimeframeType) => {
    onUpdate({ 
      timeframe,
      specificDate: undefined,
      dateRangeStart: undefined,
      dateRangeEnd: undefined,
    });
    if (timeframe !== 'specific-date' && timeframe !== 'between-dates') {
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (!formData.timeframe) return t('wizard.selectTimeframe');
    
    const option = timeframeOptions.find(o => o.id === formData.timeframe);
    let label = option ? t(option.labelKey) : '';
    
    if (formData.timeframe === 'specific-date' && formData.specificDate) {
      label += `: ${formData.specificDate}`;
    } else if (formData.timeframe === 'between-dates' && formData.dateRangeStart && formData.dateRangeEnd) {
      label += `: ${formData.dateRangeStart} - ${formData.dateRangeEnd}`;
    }
    
    return label;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {t('wizard.timeframeTitle')}
        </h2>
        <p className="text-muted-foreground">
          {t('wizard.timeframeSubtitle')}
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between h-auto py-4 px-4",
                formData.timeframe && "border-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className={formData.timeframe ? "text-foreground" : "text-muted-foreground"}>
                  {getDisplayValue()}
                </span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t('wizard.selectTimeframe')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 mt-4">
              {timeframeOptions.map((option) => (
                <div key={option.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg border transition-all",
                      formData.timeframe === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {t(option.labelKey)}
                  </button>
                  
                  {formData.timeframe === 'specific-date' && option.id === 'specific-date' && (
                    <div className="mt-3 px-4">
                      <Label>{t('wizard.selectDate')}</Label>
                      <Input
                        type="date"
                        value={formData.specificDate || ''}
                        onChange={(e) => onUpdate({ specificDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-2"
                      />
                      <Button 
                        size="sm" 
                        className="mt-3"
                        onClick={() => setIsOpen(false)}
                        disabled={!formData.specificDate}
                      >
                        {t('wizard.confirm')}
                      </Button>
                    </div>
                  )}
                  
                  {formData.timeframe === 'between-dates' && option.id === 'between-dates' && (
                    <div className="mt-3 px-4 space-y-3">
                      <div>
                        <Label>{t('wizard.startDate')}</Label>
                        <Input
                          type="date"
                          value={formData.dateRangeStart || ''}
                          onChange={(e) => onUpdate({ dateRangeStart: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>{t('wizard.endDate')}</Label>
                        <Input
                          type="date"
                          value={formData.dateRangeEnd || ''}
                          onChange={(e) => onUpdate({ dateRangeEnd: e.target.value })}
                          min={formData.dateRangeStart || new Date().toISOString().split('T')[0]}
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        disabled={!formData.dateRangeStart || !formData.dateRangeEnd}
                      >
                        {t('wizard.confirm')}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TimeframeStep;
