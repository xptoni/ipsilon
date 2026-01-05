import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardStepperProps {
  currentStep: number;
  totalSteps: number;
}

const WizardStepper = ({ currentStep, totalSteps }: WizardStepperProps) => {
  const { t } = useTranslation();

  const steps = [
    { number: 1, title: t('wizard.steps.category') },
    { number: 2, title: t('wizard.steps.description') },
    { number: 3, title: t('wizard.steps.photos') },
    { number: 4, title: t('wizard.steps.pickup') },
    { number: 5, title: t('wizard.steps.delivery') },
    { number: 6, title: t('wizard.steps.timeframe') },
    { number: 7, title: t('wizard.steps.contact') },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                  currentStep > step.number
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.number
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center hidden sm:block max-w-[80px]",
                  currentStep >= step.number
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 rounded-full transition-all",
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WizardStepper;
