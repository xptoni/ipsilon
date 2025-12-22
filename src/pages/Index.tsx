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

const Index = () => {
  const steps = [
    {
      icon: FileText,
      title: "Post Your Transport",
      description: "Describe what you need to ship, set your pickup date, and post your listing in minutes.",
    },
    {
      icon: MessageSquare,
      title: "Receive & Compare Quotes",
      description: "Get up to 5 competitive quotes from verified carriers. Chat and call to discuss details.",
    },
    {
      icon: CheckCircle,
      title: "Book & Track",
      description: "Choose your carrier, pay a small deposit, and track your shipment until delivery.",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Carriers",
      description: "All carriers are verified with valid licenses and insurance.",
    },
    {
      icon: Clock,
      title: "Fast Quotes",
      description: "Receive quotes within hours, not days.",
    },
    {
      icon: Star,
      title: "Rated & Reviewed",
      description: "Choose based on real reviews from other shippers.",
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
              Trusted by 5,000+ shippers across the Balkans
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              The fastest way to transport vehicles and cargo in the{" "}
              <span className="text-primary">Balkans</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Connect with verified carriers, compare quotes, and ship your vehicles 
              across borders with confidence. Simple, secure, and affordable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="text-base px-8" asChild>
                <Link to="/signup">
                  Ship Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <Link to="/signup?type=carrier">
                  Become a Carrier
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
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get your vehicle or cargo transported in three simple steps
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
              Popular Routes
            </h2>
            <p className="text-muted-foreground text-lg">
              We cover all major routes across the Balkans and Central Europe
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
              Why Choose Ipsilon?
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
              Ready to ship?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join thousands of satisfied shippers and carriers across the Balkans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-8" asChild>
                <Link to="/signup">
                  Post Your First Listing
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
                  Register as Carrier
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
