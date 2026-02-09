import { useTranslation } from "react-i18next";
import { Rocket, Search, ShieldCheck, Star, TrendingUp } from "lucide-react";

const infoCardIcons = [Rocket, Search, ShieldCheck, Star, TrendingUp];

interface InfoCardsProps {
  step: number; // 1-5
}

const InfoCards = ({ step }: InfoCardsProps) => {
  const { t } = useTranslation();

  const cardIndex = step - 1;
  const Icon = infoCardIcons[cardIndex];

  const bullets = t(`carrierIntro.card${step}Bullets`, { returnObjects: true }) as string[];

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          {t(`carrierIntro.card${step}Title`)}
        </h3>
        <p className="text-muted-foreground text-sm">
          {t(`carrierIntro.card${step}Subtitle`)}
        </p>
      </div>
      <ul className="space-y-3">
        {Array.isArray(bullets) &&
          bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-foreground/80"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              {bullet}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default InfoCards;
