import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Calendar,
  Package,
  ArrowLeft,
  ArrowRight,
  Star,
  Phone,
  MessageSquare,
  CreditCard,
  Truck,
  Scale,
  FileText,
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

const ListingDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = getListingById(id || "");
  const quotes = getQuotesForListing(id || "");
  const messages = getMessagesForListing(id || "");

  // For demo, assume user is shipper
  const isShipper = true;

  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [quotePrice, setQuotePrice] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");

  if (!listing) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t('listingDetail.listingNotFound')}
          </h1>
          <Button onClick={() => navigate("/dashboard")}>{t('listingDetail.backToDashboard')}</Button>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleMaskedCall = (quote: Quote) => {
    toast.info(t('listingDetail.maskedCallInfo'));
  };

  const handleAcceptQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setPaymentOpen(true);
  };

  const handlePayDeposit = () => {
    toast.success(t('listingDetail.paymentSuccess'));
    setPaymentOpen(false);
    navigate("/dashboard");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success(t('listingDetail.messageSent'));
    setNewMessage("");
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('listingDetail.quoteSubmitted'));
    navigate("/carrier-dashboard");
  };

  return (
    <Layout hideFooter>
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(isShipper ? "/dashboard" : "/carrier-dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('listingDetail.backToDashboard')}
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Listing Details Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="bg-success/10 text-success border-success/20"
                    >
                      {t(`status.${listing.status === 'in_transit' ? 'inTransit' : listing.status}`)}
                    </Badge>
                    <Badge variant="secondary">
                      {t(`cargo.${listing.cargoType}`)}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t('listingDetail.posted')} {formatDate(listing.createdAt)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Route */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">{listing.origin}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">
                    {listing.destination}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('listingDetail.pickupDate')}</p>
                      <p className="font-medium text-foreground">
                        {formatDate(listing.pickupDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('createListing.dimensions')}</p>
                      <p className="font-medium text-foreground">{listing.dimensions}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                    <Scale className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('listingDetail.weight')}</p>
                      <p className="font-medium text-foreground">{listing.weight}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('listingDetail.cargoType')}</p>
                      <p className="font-medium text-foreground capitalize">
                        {t(`cargo.${listing.cargoType}`)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {listing.notes && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {t('listingDetail.notes')}
                    </div>
                    <p className="text-foreground">{listing.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quotes Section (for Shipper) */}
            {isShipper && quotes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t('listingDetail.quotesReceived')} ({quotes.length}/5)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-semibold text-primary">
                              {quote.carrierName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">
                                {quote.carrierName}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-warning text-warning" />
                                <span className="text-sm font-medium">
                                  {quote.carrierRating}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {quote.vehicleType}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            €{quote.price}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            10% {t('listingDetail.deposit')}: €{Math.round(quote.price * 0.1)}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {quote.notes}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMaskedCall(quote)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {t('listingDetail.maskedCall')}
                        </Button>

                        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedQuote(quote)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              {t('listingDetail.message')}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{t('listingDetail.chatWith')} {quote.carrierName}</DialogTitle>
                              <DialogDescription>
                                {t('listingDetail.discussDetails')}
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
                                    {t('listingDetail.noMessagesYet')}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  placeholder={t('listingDetail.typeMessage')}
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <Button onClick={handleSendMessage}>{t('common.send')}</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button size="sm" onClick={() => handleAcceptQuote(quote)}>
                          <CreditCard className="h-4 w-4 mr-2" />
                          {t('listingDetail.acceptAndPayDeposit')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Quote Submission (for Carrier) */}
            {!isShipper && listing.quotesCount < 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('listingDetail.submitYourQuote')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitQuote} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">{t('listingDetail.yourPrice')}</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder={t('listingDetail.pricePlaceholder')}
                        value={quotePrice}
                        onChange={(e) => setQuotePrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quoteNotes">{t('listingDetail.quoteNotes')}</Label>
                      <Textarea
                        id="quoteNotes"
                        placeholder={t('listingDetail.quoteNotesPlaceholder')}
                        value={quoteNotes}
                        onChange={(e) => setQuoteNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {t('carrierDashboard.submitQuote')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-primary">
                      {listing.shipperName.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {listing.shipperName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t('listingDetail.shipper')}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('listingDetail.quotesReceivedCount')}</span>
                  <span className="font-medium text-foreground">
                    {quotes.length}/5
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('listingDetail.status')}</span>
                  <Badge
                    variant="outline"
                    className="bg-success/10 text-success border-success/20"
                  >
                    {t(`status.${listing.status === 'in_transit' ? 'inTransit' : listing.status}`)}
                  </Badge>
                </div>
                {quotes.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('listingDetail.priceRange')}</span>
                    <span className="font-medium text-foreground">
                      €{Math.min(...quotes.map((q) => q.price))} - €
                      {Math.max(...quotes.map((q) => q.price))}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Dialog */}
        <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('listingDetail.payDepositTitle')}</DialogTitle>
              <DialogDescription>
                {t('listingDetail.payDepositDescription')}{" "}
                {selectedQuote?.carrierName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">{t('listingDetail.quotePrice')}</span>
                  <span className="font-medium">€{selectedQuote?.price}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t('listingDetail.depositAmount')}</span>
                  <span className="text-primary">
                    €{selectedQuote ? Math.round(selectedQuote.price * 0.1) : 0}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-dashed border-border text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {t('listingDetail.stripeIntegration')}
                </p>
              </div>

              <Button onClick={handlePayDeposit} className="w-full">
                {t('listingDetail.payDeposit')} (€{selectedQuote ? Math.round(selectedQuote.price * 0.1) : 0})
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ListingDetail;
