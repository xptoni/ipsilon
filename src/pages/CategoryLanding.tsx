import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Package, Truck } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";

const CATEGORY_CONTENT: Record<string, { heroKey: string; subtitleKey: string }> = {
  cars: {
    heroKey: "categoryLanding.cars.hero",
    subtitleKey: "categoryLanding.cars.subtitle",
  },
  motorcycles: {
    heroKey: "categoryLanding.motorcycles.hero",
    subtitleKey: "categoryLanding.motorcycles.subtitle",
  },
  furniture: {
    heroKey: "categoryLanding.furniture.hero",
    subtitleKey: "categoryLanding.furniture.subtitle",
  },
  appliances: {
    heroKey: "categoryLanding.appliances.hero",
    subtitleKey: "categoryLanding.appliances.subtitle",
  },
  boxes: {
    heroKey: "categoryLanding.boxes.hero",
    subtitleKey: "categoryLanding.boxes.subtitle",
  },
  pallets: {
    heroKey: "categoryLanding.pallets.hero",
    subtitleKey: "categoryLanding.pallets.subtitle",
  },
  machinery: {
    heroKey: "categoryLanding.machinery.hero",
    subtitleKey: "categoryLanding.machinery.subtitle",
  },
  boats: {
    heroKey: "categoryLanding.boats.hero",
    subtitleKey: "categoryLanding.boats.subtitle",
  },
};

const CATEGORY_TO_FORM_VALUE: Record<string, string> = {
  cars: "cars",
  motorcycles: "motorcycles",
  furniture: "furniture",
  appliances: "appliances",
  boxes: "boxes",
  pallets: "pallets",
  machinery: "machinery",
  boats: "boats",
};

const CategoryLanding = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [quickPickup, setQuickPickup] = useState("");
  const [quickDelivery, setQuickDelivery] = useState("");

  const content = category ? CATEGORY_CONTENT[category] : null;
  const categoryLabel = category ? t(`wizard.categories.${category}`) : "";

  if (!content) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Category not found</h1>
        </div>
      </Layout>
    );
  }

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const prefillData = {
      category: CATEGORY_TO_FORM_VALUE[category!],
      pickupCity: quickPickup,
      deliveryCity: quickDelivery,
      prefilled: true,
    };
    localStorage.setItem("ipsilon_quick_quote", JSON.stringify(prefillData));
    navigate("/create-listing");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
              <Truck className="h-4 w-4" />
              {t("home.heroTrust")}
            </div>

            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {t(content.heroKey)}
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {t(content.subtitleKey)}
            </p>
          </div>

          {/* Quick Quote Form - category pre-selected */}
          <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleQuickQuote} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              {/* Category pre-selected badge */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{t("home.quickCategory")}:</span>
                <span className="font-semibold text-foreground bg-primary/10 px-3 py-1 rounded-full">
                  {categoryLabel}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {t("home.quickPickup")}
                  </label>
                  <Input
                    placeholder={t("home.pickupPlaceholder")}
                    value={quickPickup}
                    onChange={(e) => setQuickPickup(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {t("home.quickDelivery")}
                  </label>
                  <Input
                    placeholder={t("home.deliveryPlaceholder")}
                    value={quickDelivery}
                    onChange={(e) => setQuickDelivery(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full" size="lg">
                    {t("home.getFreeQuotes")}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryLanding;
