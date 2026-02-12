import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Truck, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Clock,
  Star,
  MapPin,
  Users,
  Package,
  ListChecks,
  Sparkles,
  UserCheck
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [quickCategory, setQuickCategory] = useState("");
  const [quickPickup, setQuickPickup] = useState("");
  const [quickDelivery, setQuickDelivery] = useState("");

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    // Save prefill data to localStorage
    const prefillData = {
      category: quickCategory,
      pickupCity: quickPickup,
      deliveryCity: quickDelivery,
      prefilled: true
    };
    localStorage.setItem('ipsilon_quick_quote', JSON.stringify(prefillData));
    navigate('/create-listing');
  };

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

  const benefits = [
    { 
      icon: ListChecks, 
      title: t('home.benefit1Title'), 
      description: t('home.benefit1Desc') 
    },
    { 
      icon: Sparkles, 
      title: t('home.benefit2Title'), 
      description: t('home.benefit2Desc') 
    },
    { 
      icon: UserCheck, 
      title: t('home.benefit3Title'), 
      description: t('home.benefit3Desc') 
    },
  ];

  const categories = [
    { value: 'cars', label: t('wizard.categories.cars') },
    { value: 'motorcycles', label: t('wizard.categories.motorcycles') },
    { value: 'furniture', label: t('wizard.categories.furniture') },
    { value: 'appliances', label: t('wizard.categories.appliances') },
    { value: 'boxes', label: t('wizard.categories.boxes') },
    { value: 'pallets', label: t('wizard.categories.pallets') },
    { value: 'machinery', label: t('wizard.categories.machinery') },
    { value: 'boats', label: t('wizard.categories.boats') },
    { value: 'other', label: t('wizard.categories.other') },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
              <Truck className="h-4 w-4" />
              {t('home.heroTrust')}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('home.heroTitleNew')}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('home.heroDescriptionNew')}
            </p>
          </div>

          {/* Quick Quote Form */}
          <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <form onSubmit={handleQuickQuote} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="grid sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    {t('home.quickCategory')}
                  </label>
                  <Select value={quickCategory} onValueChange={setQuickCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('home.selectCategory')} />
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
                    {t('home.quickPickup')}
                  </label>
                  <Input
                    placeholder={t('home.pickupPlaceholder')}
                    value={quickPickup}
                    onChange={(e) => setQuickPickup(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {t('home.quickDelivery')}
                  </label>
                  <Input
                    placeholder={t('home.deliveryPlaceholder')}
                    value={quickDelivery}
                    onChange={(e) => setQuickDelivery(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full" size="lg">
                    {t('home.getFreeQuotes')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-primary-foreground/80 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrier CTA Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-4">
              <Truck className="h-7 w-7 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t('home.carrierCtaTitle')}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {t('home.carrierCtaDescription')}
            </p>
            <Button size="lg" asChild>
              <Link to="/become-carrier">
                {t('home.becomeCarrierButton')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
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

      {/* Features */}
      <section className="py-20 bg-secondary/50">
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

      {/* Trusted By */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              {t('home.trustedByTitle')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {/* Placeholder for partner logos */}
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="h-8 w-28 bg-muted rounded" />
            <div className="h-8 w-36 bg-muted rounded" />
            <div className="h-8 w-24 bg-muted rounded" />
            <div className="h-8 w-32 bg-muted rounded" />
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.popularRoutesTitle')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('home.popularRoutesDescription')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { from: "Genève", to: "Zagreb" },
              { from: "Split", to: "Zagreb" },
              { from: "München", to: "Split" },
              { from: "Frankfurt", to: "Beograd" },
              { from: "Zadar", to: "Osijek" },
              { from: "Milano", to: "Zagreb" },
            ].map((route, index) => (
              <Link
                key={index}
                to="#"
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
              >
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-foreground">
                  {route.from}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium text-foreground">
                  {route.to}
                </span>
              </Link>
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
                <Link to="/create-listing">
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
                <Link to="/become-carrier">
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
