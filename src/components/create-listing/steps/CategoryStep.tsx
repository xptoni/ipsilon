import { useTranslation } from "react-i18next";
import { 
  Armchair, 
  Package, 
  Car, 
  Bike, 
  Ship, 
  Cog, 
  MoreHorizontal,
  Refrigerator,
  Container,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Category, CATEGORIES } from "../types";

interface CategoryStepProps {
  selectedCategory: Category | null;
  onSelect: (category: Category) => void;
}

const iconMap = {
  Armchair,
  Package,
  Car,
  Bike,
  Ship,
  Cog,
  MoreHorizontal,
  Refrigerator,
  Container,
};

const CategoryStep = ({ selectedCategory, onSelect }: CategoryStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {t('wizard.categoryTitle')}
        </h2>
        <p className="text-muted-foreground">
          {t('wizard.categorySubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all hover:border-primary hover:bg-primary/5",
                isSelected 
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                  : "border-border bg-card",
                category.id === 'other' && "sm:col-start-2 lg:col-start-2"
              )}
            >
              <Icon className={cn(
                "h-10 w-10 mb-3 transition-colors",
                isSelected ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "font-medium text-sm text-center",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {t(category.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryStep;
