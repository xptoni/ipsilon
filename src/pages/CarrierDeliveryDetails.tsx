import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  ChevronDown,
  Send,
  MessageSquare,
  Car,
  Gauge,
  Truck,
  User,
  Route,
  HelpCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  getListingById,
  getQuotesForListing,
  getMessagesForListing,
  type Quote,
  type Message,
} from "@/lib/mockData";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// Extended mock data for carrier view
const mockVehicleDetails = {
  make: "Ford",
  model: "Fusion",
  operable: true,
};

const carrierUsernames: Record<string, string> = {
  "carrier-1": "matodostave55",
  "carrier-2": "brziprijevoz22",
  "carrier-3": "transportpro99",
  "carrier-4": "cargomajstor11",
};

const mockRouteDetails = {
  distance: "1,267 mi",
  duration: "19 hours 25 mins",
  earliestDelivery: "27/02/2026",
};

const mockQuoteConversations: Record<string, Message[]> = {
  "quote-1": [
    {
      id: "conv-1",
      senderId: "shipper-1",
      senderName: "Marko P.",
      receiverId: "carrier-1",
      listingId: "listing-1",
      content: "Hi, is your trailer fully enclosed? I need maximum protection.",
      createdAt: "2024-12-20T10:30:00",
    },
    {
      id: "conv-2",
      senderId: "carrier-1",
      senderName: "Nikola J.",
      receiverId: "shipper-1",
      listingId: "listing-1",
      content: "Yes, fully enclosed with climate control. I transport luxury cars regularly.",
      createdAt: "2024-12-20T10:45:00",
    },
  ],
  "quote-2": [
    {
      id: "conv-3",
      senderId: "carrier-2",
      senderName: "Stefan K.",
      receiverId: "shipper-1",
      listingId: "listing-1",
      content: "I can offer protective cover for additional safety.",
      createdAt: "2024-12-20T14:00:00",
    },
  ],
  "quote-3": [],
};

const CarrierDeliveryDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = getListingById(id || "");
  const quotes = getQuotesForListing(id || "");

  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({});
  const [question, setQuestion] = useState("");
  const [quotePrice, setQuotePrice] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");

  if (!listing) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t("listingDetail.listingNotFound")}
          </h1>
          <Button onClick={() => navigate("/carrier-dashboard")}>
            {t("listingDetail.backToDashboard")}
          </Button>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleQuoteExpanded = (quoteId: string) => {
    setExpandedQuotes((prev) => ({
      ...prev,
      [quoteId]: !prev[quoteId],
    }));
  };

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    toast.success(t("carrierDeliveryDetails.questionSent"));
    setQuestion("");
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("listingDetail.quoteSubmitted"));
    navigate("/carrier-dashboard");
  };

  return (
    <Layout hideFooter>
      <div className="container py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/carrier-dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("listingDetail.backToDashboard")}
        </Button>

        {/* Delivery Title */}
        <div className="mb-6">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {mockVehicleDetails.make} {mockVehicleDetails.model}
          </h1>
        </div>

        {/* Delivery Details Card */}
        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
            {/* Origin */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("carrierDeliveryDetails.origin")}</p>
                <p className="font-medium text-foreground">
                  New Bern, North Carolina, 28562-5304, United States
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("carrierDeliveryDetails.destination")}</p>
                <p className="font-medium text-foreground">
                  Commerce, Texas, 75428-3354, United States
                </p>
              </div>
            </div>

            {/* Route Info */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {t("carrierDeliveryDetails.earliestDelivery")}:
                </span>
                <span className="text-sm font-medium">{mockRouteDetails.earliestDelivery}</span>
              </div>
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{mockRouteDetails.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{mockRouteDetails.duration}</span>
              </div>
            </div>

            {/* Shipper Info */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t("carrierDeliveryDetails.user")}:</span>
              <span className="text-sm font-medium">vone35</span>
              <span className="text-sm text-muted-foreground">(0)</span>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("carrierDeliveryDetails.make")}:</span>
                <span className="text-sm font-medium">{mockVehicleDetails.make}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("carrierDeliveryDetails.model")}:</span>
                <span className="text-sm font-medium">{mockVehicleDetails.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("carrierDeliveryDetails.operable")}:</span>
                <span className="text-sm font-medium">
                  {mockVehicleDetails.operable ? t("common.yes") : t("common.no")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ask Question Section */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              {t("carrierDeliveryDetails.haveQuestion")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Textarea
                placeholder={t("carrierDeliveryDetails.questionPlaceholder")}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={2}
              />
              <Button onClick={handleSendQuestion} className="gap-2">
                <Send className="h-4 w-4" />
                {t("common.send")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quotes Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {t("carrierDeliveryDetails.quotes")} ({quotes.length}/5)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <QuoteItem
                  key={quote.id}
                  quote={quote}
                  isExpanded={expandedQuotes[quote.id] || false}
                  onToggle={() => toggleQuoteExpanded(quote.id)}
                  conversations={mockQuoteConversations[quote.id] || []}
                  formatDateTime={formatDateTime}
                  t={t}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-6">
                {t("carrierDeliveryDetails.noQuotesYet")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Submit Quote Section */}
        {quotes.length < 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("listingDetail.submitYourQuote")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">{t("listingDetail.yourPrice")}</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder={t("listingDetail.pricePlaceholder")}
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quoteNotes">{t("listingDetail.quoteNotes")}</Label>
                  <Textarea
                    id="quoteNotes"
                    placeholder={t("listingDetail.quoteNotesPlaceholder")}
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t("listingDetail.submitYourQuote")}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

interface QuoteItemProps {
  quote: Quote;
  isExpanded: boolean;
  onToggle: () => void;
  conversations: Message[];
  formatDateTime: (date: string) => string;
  t: any;
}

const QuoteItem = ({
  quote,
  isExpanded,
  onToggle,
  conversations,
  formatDateTime,
  t,
}: QuoteItemProps) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Quote Header - Always Visible */}
      <div className="p-4 bg-card">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            {/* Price */}
            <div className="text-xl font-bold text-primary">€{quote.price}</div>
            
            {/* Provider Info */}
            <div>
              <div>
                <Link
                  to={`/carrier/${carrierUsernames[quote.carrierId] || quote.carrierId}`}
                  className="font-medium text-primary text-sm hover:underline"
                >
                  {carrierUsernames[quote.carrierId] || quote.carrierName}
                </Link>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span className="text-xs text-muted-foreground">{quote.carrierRating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Info Button */}
          <Collapsible open={isExpanded} onOpenChange={onToggle}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {t("carrierDeliveryDetails.quoteInfo")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      {/* Expanded Content */}
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleContent>
          <div className="p-4 border-t border-border bg-muted/30 space-y-4">
            {/* Quote Notes */}
            {quote.notes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("carrierDeliveryDetails.providerNotes")}
                </p>
                <p className="text-sm text-foreground">{quote.notes}</p>
              </div>
            )}

            {/* Quote Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {t("carrierDeliveryDetails.quotedOn")}: {formatDateTime(quote.createdAt)}
            </div>

            {/* Conversation */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {t("carrierDeliveryDetails.conversation")}
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {conversations.length > 0 ? (
                  conversations.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 rounded-lg bg-card border border-border"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-primary">
                          {msg.senderName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(msg.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{msg.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    {t("carrierDeliveryDetails.noConversation")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CarrierDeliveryDetails;
