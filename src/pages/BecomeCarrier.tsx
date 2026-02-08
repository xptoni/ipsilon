import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Truck, 
  Bell, 
  Filter, 
  Users, 
  Shield, 
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const BecomeCarrier = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Users,
      title: t("becomeCarrier.benefit1Title"),
      description: t("becomeCarrier.benefit1Desc"),
    },
    {
      icon: Filter,
      title: t("becomeCarrier.benefit2Title"),
      description: t("becomeCarrier.benefit2Desc"),
    },
    {
      icon: Bell,
      title: t("becomeCarrier.benefit3Title"),
      description: t("becomeCarrier.benefit3Desc"),
    },
    {
      icon: Shield,
      title: t("becomeCarrier.benefit4Title"),
      description: t("becomeCarrier.benefit4Desc"),
    },
    {
      icon: TrendingUp,
      title: t("becomeCarrier.benefit5Title"),
      description: t("becomeCarrier.benefit5Desc"),
    },
    {
      icon: Truck,
      title: t("becomeCarrier.benefit6Title"),
      description: t("becomeCarrier.benefit6Desc"),
    },
  ];

  const categories = [
    t("becomeCarrier.categoryCars"),
    t("becomeCarrier.categoryMotorcycles"),
    t("becomeCarrier.categoryCommercial"),
    t("becomeCarrier.categoryMachinery"),
    t("becomeCarrier.categoryFurniture"),
    t("becomeCarrier.categoryBoxes"),
    t("becomeCarrier.categoryPallets"),
    t("becomeCarrier.categoryMoves"),
    t("becomeCarrier.categoryPets"),
    t("becomeCarrier.categoryDebris"),
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Truck className="h-4 w-4" />
              {t("becomeCarrier.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("becomeCarrier.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("becomeCarrier.heroDescription")}
            </p>
            <Link to="/carrier-registration">
              <Button size="lg" className="text-lg px-8 py-6">
                {t("becomeCarrier.ctaButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">{t("becomeCarrier.statShippers")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">{t("becomeCarrier.statListings")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">{t("becomeCarrier.statCountries")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-muted-foreground">{t("becomeCarrier.statRating")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("becomeCarrier.benefitsTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("becomeCarrier.benefitsSubtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("becomeCarrier.categoriesTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("becomeCarrier.categoriesSubtitle")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2 text-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("becomeCarrier.howItWorksTitle")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("becomeCarrier.step1Title")}</h3>
              <p className="text-muted-foreground">{t("becomeCarrier.step1Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("becomeCarrier.step2Title")}</h3>
              <p className="text-muted-foreground">{t("becomeCarrier.step2Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("becomeCarrier.step3Title")}</h3>
              <p className="text-muted-foreground">{t("becomeCarrier.step3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t("becomeCarrier.ctaTitle")}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t("becomeCarrier.ctaDescription")}
          </p>
          <Link to="/carrier-registration">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              {t("becomeCarrier.ctaButton")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default BecomeCarrier;
