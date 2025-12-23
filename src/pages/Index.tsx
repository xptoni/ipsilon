import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Clock,
  Star
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: FileText,
      title: t('home.step1Title'),
      description: t('home.step1Description'),
    },
    {
      icon: MessageSquare,
      title: t('home.step2Title'),
      description: t('home.step2Description'),
    },
    {
      icon: CheckCircle,
      title: t('home.step3Title'),
      description: t('home.step3Description'),
    },
  ];

  const features = [
    {
      icon: Shield,
      title: t('home.feature1Title'),
      description: t('home.feature1Description'),
    },
    {
      icon: Clock,
      title: t('home.feature2Title'),
      description: t('home.feature2Description'),
    },
    {
      icon: Star,
      title: t('home.feature3Title'),
      description: t('home.feature3Description'),
    },
  ];

  const routes = [
    "Belgrade → Munich",
    "Zagreb → Stuttgart",
    "Skopje → Vienna",
    "Sarajevo → Frankfurt",
    "Ljubljana → Milan",
    "Podgorica → Zurich",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
              <Truck className="h-4 w-4" />
              {t('home.heroTrust')}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('home.heroTitle')}{" "}
              <span className="text-primary">{t('home.heroBalkans')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('home.heroDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="text-base px-8" asChild>
                <Link to="/signup">
                  {t('home.shipNow')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <Link to="/signup?type=carrier">
                  {t('home.becomeCarrier')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.howItWorksTitle')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('home.howItWorksDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <div className="mt-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.popularRoutesTitle')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('home.popularRoutesDescription')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {routes.map((route, index) => (
              <div
                key={index}
                className="px-5 py-3 rounded-full bg-card border border-border text-foreground font-medium hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                {route}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.whyChooseTitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              {t('home.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-8" asChild>
                <Link to="/signup">
                  {t('home.postFirstListing')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" 
                asChild
              >
                <Link to="/signup?type=carrier">
                  {t('home.registerAsCarrier')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
