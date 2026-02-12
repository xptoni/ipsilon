import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Package,
  ArrowLeft,
  ArrowRight,
  Star,
  HelpCircle,
  CreditCard,
  Truck,
  Scale,
  FileText,
  ImageIcon,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  getListingById,
  getQuotesForListing,
  getMessagesForListing,
  type Quote,
} from "@/lib/mockData";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// Mock usernames for carriers (anonymous)
const carrierUsernames: Record<string, string> = {
  "carrier-1": "matodostave55",
  "carrier-2": "brziprijevoz22",
  "carrier-3": "transportpro99",
  "carrier-4": "cargomajstor11",
};

const ListingDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = getListingById(id || "");
  const quotes = getQuotesForListing(id || "");
  const messages = getMessagesForListing(id || "");

  const isShipper = true;

  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  if (!listing) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t("listingDetail.listingNotFound")}
          </h1>
          <Button onClick={() => navigate("/shipper-dashboard")}>
            {t("listingDetail.backToDashboard")}
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAcceptQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setPaymentOpen(true);
  };

  const handlePayDeposit = () => {
    toast.success(t("listingDetail.paymentSuccess"));
    setPaymentOpen(false);
    navigate("/shipper-dashboard");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success(t("listingDetail.messageSent"));
    setNewMessage("");
  };

  return (
    <Layout hideFooter>
      <div className="container py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/shipper-dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("listingDetail.backToDashboard")}
        </Button>

        {/* Title & Status */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {listing.title}
            </h1>
            <Badge
              variant="outline"
              className="bg-success/10 text-success border-success/20"
            >
              {t(`status.${listing.status === "in_transit" ? "inTransit" : listing.status}`)}
            </Badge>
          </div>
        </div>

        {/* Placeholder Image */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-48 md:h-64 bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">{t("listingDetail.noPhotosYet", "No photos uploaded yet")}</p>
            </div>
          </div>
        </Card>

        {/* Route */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary mb-4">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span className="font-semibold text-foreground">{listing.origin}</span>
              <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="font-semibold text-foreground">{listing.destination}</span>
            </div>

            {/* Details Grid - dimensions, weight, cargo type */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("createListing.dimensions")}</p>
                  <p className="font-medium text-foreground">{listing.weight}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                <Scale className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("listingDetail.weight")}</p>
                  <p className="font-medium text-foreground">{listing.weight}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("listingDetail.cargoType")}</p>
                  <p className="font-medium text-foreground capitalize">
                    {t(`cargo.${listing.cargoType}`)}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {listing.notes && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {t("listingDetail.notes")}
                </div>
                <p className="text-foreground">{listing.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quotes Section */}
        {isShipper && quotes.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {t("listingDetail.quotesReceived")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quotes.map((quote) => {
                const username = carrierUsernames[quote.carrierId] || "user_unknown";
                return (
                  <div
                    key={quote.id}
                    className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/carrier/${username}`}
                            className="font-semibold text-primary hover:underline"
                          >
                            {username}
                          </Link>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium">
                              {quote.carrierRating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          €{quote.price}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          10% {t("listingDetail.deposit")}: €{Math.round(quote.price * 0.1)}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {quote.notes}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedQuote(quote)}
                          >
                            <HelpCircle className="h-4 w-4 mr-2" />
                            {t("listingDetail.askQuestion", "Ask a question")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {t("listingDetail.askQuestion", "Ask a question")} — {username}
                            </DialogTitle>
                            <DialogDescription>
                              {t("listingDetail.discussDetails")}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3 bg-muted/30">
                              {messages.length > 0 ? (
                                messages.map((msg) => (
                                  <div
                                    key={msg.id}
                                    className={`p-3 rounded-lg max-w-[80%] ${
                                      msg.senderId === "shipper-1"
                                        ? "bg-primary text-primary-foreground ml-auto"
                                        : "bg-card border"
                                    }`}
                                  >
                                    <p className="text-sm">{msg.content}</p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-center text-muted-foreground text-sm">
                                  {t("listingDetail.noMessagesYet")}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                placeholder={t("listingDetail.typeMessage")}
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                              />
                              <Button onClick={handleSendMessage}>{t("common.send")}</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button size="sm" onClick={() => handleAcceptQuote(quote)}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        {t("listingDetail.acceptAndPayDeposit")}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Payment Dialog */}
        <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("listingDetail.payDepositTitle")}</DialogTitle>
              <DialogDescription>
                {t("listingDetail.payDepositDescription")}{" "}
                {selectedQuote
                  ? carrierUsernames[selectedQuote.carrierId] || "user_unknown"
                  : ""}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">{t("listingDetail.quotePrice")}</span>
                  <span className="font-medium">€{selectedQuote?.price}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t("listingDetail.depositAmount")}</span>
                  <span className="text-primary">
                    €{selectedQuote ? Math.round(selectedQuote.price * 0.1) : 0}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-dashed border-border text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {t("listingDetail.stripeIntegration")}
                </p>
              </div>

              <Button onClick={handlePayDeposit} className="w-full">
                {t("listingDetail.payDeposit")} (€
                {selectedQuote ? Math.round(selectedQuote.price * 0.1) : 0})
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ListingDetail;
