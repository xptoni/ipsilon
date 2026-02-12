import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Clock,
  Search,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { mockQuotes, mockListings, type Quote } from "@/lib/mockData";
import { useTranslation } from "react-i18next";

const CarrierDashboard = () => {
  const { t } = useTranslation();

  const [quotes, setQuotes] = useState(() =>
    mockQuotes.filter((q) => q.carrierId === "carrier-1")
  );

  const pendingQuotes = quotes.filter((q) => q.status === "pending");
  const bookedQuotes = quotes.filter((q) => q.status === "booked");
  const completedQuotes = quotes.filter((q) => q.status === "completed");

  const handleCompleteDelivery = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: "completed" as const } : q))
    );
  };

  const getListingForQuote = (listingId: string) => {
    return mockListings.find((l) => l.id === listingId);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getQuoteStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "booked":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getQuoteStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return t("status.pending");
      case "booked":
        return t("status.booked");
      case "completed":
        return t("status.completed");
      case "rejected":
        return t("status.rejected");
      default:
        return status;
    }
  };

  return (
    <Layout hideFooter>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {t("carrierDashboard.title")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("carrierDashboard.description")}
            </p>
          </div>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/listings">
              <Search className="h-5 w-5" />
              {t("carrierDashboard.browseListings")}
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {quotes.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("carrierDashboard.totalQuotes")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">
                {pendingQuotes.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("carrierDashboard.pending")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {bookedQuotes.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("carrierDashboard.booked")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">
                {completedQuotes.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("carrierDashboard.completed")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                €{completedQuotes.reduce((sum, q) => sum + q.price, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("carrierDashboard.totalValue")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quotes Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              {t("carrierDashboard.pendingQuotes")} ({pendingQuotes.length})
            </TabsTrigger>
            <TabsTrigger value="booked" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              {t("carrierDashboard.bookedQuotes")} ({bookedQuotes.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              {t("carrierDashboard.completedQuotes")} ({completedQuotes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="grid gap-4">
              {pendingQuotes.length > 0 ? (
                pendingQuotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    listing={getListingForQuote(quote.listingId)}
                    formatDate={formatDate}
                    getQuoteStatusColor={getQuoteStatusColor}
                    getQuoteStatusLabel={getQuoteStatusLabel}
                    t={t}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Clock className="h-12 w-12 text-muted-foreground" />}
                  title={t("carrierDashboard.noPendingQuotes")}
                  description={t("carrierDashboard.noPendingQuotesDesc")}
                  t={t}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="booked">
            <div className="grid gap-4">
              {bookedQuotes.length > 0 ? (
                bookedQuotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    listing={getListingForQuote(quote.listingId)}
                    formatDate={formatDate}
                    getQuoteStatusColor={getQuoteStatusColor}
                    getQuoteStatusLabel={getQuoteStatusLabel}
                    onComplete={() => handleCompleteDelivery(quote.id)}
                    t={t}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<AlertCircle className="h-12 w-12 text-muted-foreground" />}
                  title={t("carrierDashboard.noBookedQuotes")}
                  description={t("carrierDashboard.noBookedQuotesDesc")}
                  t={t}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid gap-4">
              {completedQuotes.length > 0 ? (
                completedQuotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    listing={getListingForQuote(quote.listingId)}
                    formatDate={formatDate}
                    getQuoteStatusColor={getQuoteStatusColor}
                    getQuoteStatusLabel={getQuoteStatusLabel}
                    t={t}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<CheckCircle className="h-12 w-12 text-muted-foreground" />}
                  title={t("carrierDashboard.noCompletedQuotes")}
                  description={t("carrierDashboard.noCompletedQuotesDesc")}
                  t={t}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface QuoteCardProps {
  quote: Quote;
  listing: ReturnType<typeof mockListings.find>;
  formatDate: (date: string) => string;
  getQuoteStatusColor: (status: string) => string;
  getQuoteStatusLabel: (status: string) => string;
  onComplete?: () => void;
  t: any;
}

const QuoteCard = ({
  quote,
  listing,
  formatDate,
  getQuoteStatusColor,
  getQuoteStatusLabel,
  onComplete,
  t,
}: QuoteCardProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [deliveryOk, setDeliveryOk] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");

  if (!listing) return null;

  const handleConfirm = () => {
    onComplete?.();
    setShowDialog(false);
    setDeliveryOk(null);
    setComment("");
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
            <img 
              src="/placeholder.svg" 
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-display text-lg font-semibold text-foreground truncate">
                {listing.title}
              </h3>
              <Badge variant="outline" className={`shrink-0 ${getQuoteStatusColor(quote.status)}`}>
                {getQuoteStatusLabel(quote.status)}
              </Badge>
              <span className="text-lg font-bold text-primary shrink-0">€{quote.price}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{listing.origin}</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
              <span>{listing.destination}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-3">
              {onComplete && (
                <Button
                  variant="outline"
                  className="border-success/40 text-success hover:bg-success/10"
                  onClick={() => setShowDialog(true)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Delivered
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link to={`/carrier/delivery-details/${listing.id}`}>{t("common.viewDetails")}</Link>
              </Button>
            </div>
            {onComplete && (
              <p className="text-xs text-muted-foreground italic">
                Click when the delivery is successfully completed
              </p>
            )}
          </div>
        </div>
      </CardContent>

      {/* Completion confirmation dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delivery Completion</DialogTitle>
            <DialogDescription>
              You're about to mark <span className="font-medium text-foreground">{listing.title}</span> ({listing.origin} → {listing.destination}) as delivered.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Did everything go well?</p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={deliveryOk === true ? "default" : "outline"}
                  className={deliveryOk === true ? "bg-success hover:bg-success/90" : ""}
                  onClick={() => setDeliveryOk(true)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Yes, all good
                </Button>
                <Button
                  type="button"
                  variant={deliveryOk === false ? "default" : "outline"}
                  className={deliveryOk === false ? "bg-destructive hover:bg-destructive/90" : ""}
                  onClick={() => setDeliveryOk(false)}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  There was an issue
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Comments <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Textarea
                placeholder="Any notes about the delivery..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1.5"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={deliveryOk === null}
              className={deliveryOk === true ? "bg-success hover:bg-success/90" : ""}
            >
              Confirm Delivery
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  t: any;
}

const EmptyState = ({ icon, title, description, t }: EmptyStateProps) => (
  <Card className="text-center py-12">
    <CardContent>
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button asChild>
        <Link to="/listings">
          <Search className="h-4 w-4 mr-2" />
          {t("carrierDashboard.browseListings")}
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default CarrierDashboard;
