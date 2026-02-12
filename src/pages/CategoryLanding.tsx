import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Package, Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";

const VALID_CATEGORIES = [
  "cars", "motorcycles", "furniture", "appliances",
  "boxes", "pallets", "machinery", "boats", "other",
];

const CategoryLanding = () => {
  const { category: urlCategory } = useParams<{ category: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [quickCategory, setQuickCategory] = useState(urlCategory || "");
  const [quickPickup, setQuickPickup] = useState("");
  const [quickDelivery, setQuickDelivery] = useState("");

  const categories = [
    { value: "cars", label: t("wizard.categories.cars") },
    { value: "motorcycles", label: t("wizard.categories.motorcycles") },
    { value: "furniture", label: t("wizard.categories.furniture") },
    { value: "appliances", label: t("wizard.categories.appliances") },
    { value: "boxes", label: t("wizard.categories.boxes") },
    { value: "pallets", label: t("wizard.categories.pallets") },
    { value: "machinery", label: t("wizard.categories.machinery") },
    { value: "boats", label: t("wizard.categories.boats") },
    { value: "other", label: t("wizard.categories.other") },
  ];

  const isValid = urlCategory && VALID_CATEGORIES.includes(urlCategory);

  if (!isValid) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Category not found</h1>
        </div>
      </Layout>
    );
  }

  const heroText = t(`categoryLanding.${urlCategory}.hero`);
  const subtitleText = t(`categoryLanding.${urlCategory}.subtitle`);

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const prefillData = {
      category: quickCategory,
      pickupCity: quickPickup,
      deliveryCity: quickDelivery,
      prefilled: true,
    };
    localStorage.setItem("ipsilon_quick_quote", JSON.stringify(prefillData));
    navigate("/create-listing");
  };

  return (
    <Layout>
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
              {heroText}
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {subtitleText}
            </p>
          </div>

          {/* Same form as homepage, with category pre-selected */}
          <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleQuickQuote} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="grid sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    {t("home.quickCategory")}
                  </label>
                  <Select value={quickCategory} onValueChange={setQuickCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("home.selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
