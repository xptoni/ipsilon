import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  MessageSquare,
  CheckCircle,
  Package,
  MapPin,
  Camera,
  Calendar,
  Send,
  Star,
  MessageCircle,
  BarChart3,
  CreditCard,
  Phone,
  Filter,
  Truck,
  Bell,
  Settings,
  ThumbsUp,
  BadgeCheck,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              How Ipsilon Works
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-primary mb-6">
              Simple. Transparent. Fair.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Post your shipment, receive multiple competitive quotes from verified carriers, and choose the best option — all in one place.
            </p>
            <p className="text-muted-foreground">
              We connect people who need to move goods with reliable carriers looking for loads.
              <br />
              Just better prices and more control.
            </p>
            <p className="text-muted-foreground mt-4">
              Browse carrier profiles, check real ratings & reviews, and pick the one that fits your needs — with full transparency every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Step 1 */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
                1
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Post Your Shipment
                </h2>
                <p className="text-muted-foreground">
                  Tell us what you need to move, where from, and where to. Takes less than 60 seconds.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 ml-16">
              {[
                { icon: Package, text: "Select category" },
                { icon: MapPin, text: "Add pickup & delivery location" },
                { icon: Camera, text: "Upload photos and add description" },
                { icon: Calendar, text: "Choose when you need it done (flexible dates or specific timeframe)" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="ml-16 mt-6 flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <Send className="h-5 w-5 text-primary shrink-0" />
              <span className="text-foreground font-medium text-sm">
                Click "Get Quotes" — your listing is live and carriers can see it.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
                2
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Receive & Compare Quotes
                </h2>
                <p className="text-muted-foreground">
                  Carriers who match your route and vehicle type will send you offers.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground ml-16 mb-6">
              Get multiple quotes directly in your dashboard. No need to keep checking the website — you'll receive email notifications as soon as a new quote arrives.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 ml-16">
              {[
                { icon: Star, text: "See carrier ratings, reviews, and details" },
                { icon: MessageCircle, text: "Chat directly with carriers to clarify details" },
                { icon: BarChart3, text: "Compare prices, timing, and conditions side-by-side" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3 p-5 rounded-xl bg-card border border-border">
                  <item.icon className="h-6 w-6 text-primary" />
                  <span className="text-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground ml-16 mt-6 text-sm italic">
              No spam, no endless calls — everything stays on the platform until you decide.
            </p>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
                3
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Accept & Secure the Job
                </h2>
                <p className="text-muted-foreground">
                  Choose the quote that suits you best.
                </p>
              </div>
            </div>

            <div className="space-y-3 ml-16">
              {[
                { icon: CheckCircle, text: "Accept the offer" },
                { icon: CreditCard, text: "Pay a small refundable deposit to reserve the transport and lock in the deal — instantly receive the carrier's contact details." },
                { icon: Phone, text: "Communicate directly to arrange pickup and delivery" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="ml-16 mt-6 p-4 rounded-xl bg-secondary border border-border">
              <p className="text-muted-foreground text-sm">
                The remaining balance is paid directly to the carrier (cash, transfer, etc.) after successful delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Carriers Love Ipsilon */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Why Carriers Love Ipsilon
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Filter, text: "Ultra-optimized filters — find jobs that perfectly match your route, vehicle, and schedule" },
                { icon: Truck, text: "Fill empty space — turn backloads and local runs into real earnings" },
                { icon: Bell, text: "Email alerts — get notified instantly when new matching loads appear" },
                { icon: Settings, text: "Full control — you decide which jobs to accept and at what price" },
                { icon: ThumbsUp, text: "Build reputation — positive reviews and ratings bring more work" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-center mt-8 font-semibold text-primary">
              No subscription fees. No obligations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <BadgeCheck className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Whether you're sending a car to Germany, moving house, or shipping pallets — Ipsilon makes it faster, safer, and more competitive.
            </p>
            <p className="text-primary-foreground/90 font-medium mb-8">
              Post your shipment — get your first quotes free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-8" asChild>
                <Link to="/create-listing">
                  Get Quotes Now
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
                  Become a Carrier
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
