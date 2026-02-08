import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
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

  const myQuotes = mockQuotes.filter((q) => q.carrierId === "carrier-1");
  const pendingQuotes = myQuotes.filter((q) => q.status === "pending");
  const acceptedQuotes = myQuotes.filter((q) => q.status === "accepted");

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
      case "accepted":
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
      case "accepted":
        return t("status.accepted");
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {myQuotes.length}
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
              <div className="text-2xl font-bold text-success">
                {acceptedQuotes.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("carrierDashboard.accepted")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                €{myQuotes.reduce((sum, q) => sum + q.price, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("carrierDashboard.totalValue")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quotes Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              {t("carrierDashboard.pendingQuotes")} ({pendingQuotes.length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              {t("carrierDashboard.acceptedQuotes")} ({acceptedQuotes.length})
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

          <TabsContent value="accepted">
            <div className="grid gap-4">
              {acceptedQuotes.length > 0 ? (
                acceptedQuotes.map((quote) => (
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
                  title={t("carrierDashboard.noAcceptedQuotes")}
                  description={t("carrierDashboard.noAcceptedQuotesDesc")}
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
  t: any;
}

const QuoteCard = ({
  quote,
  listing,
  formatDate,
  getQuoteStatusColor,
  getQuoteStatusLabel,
  t,
}: QuoteCardProps) => {
  if (!listing) return null;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className={getQuoteStatusColor(quote.status)}>
                {getQuoteStatusLabel(quote.status)}
              </Badge>
              <span className="text-lg font-bold text-primary">€{quote.price}</span>
              <Badge variant="secondary">{t(`cargo.${listing.cargoType}`)}</Badge>
            </div>

            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium">{listing.origin}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{listing.destination}</span>
            </div>

            <p className="text-sm text-muted-foreground">
              {t("carrierDashboard.submittedOn")} {formatDate(quote.createdAt)}
            </p>

            {quote.notes && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {quote.notes}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to={`/listings/${listing.id}`}>{t("common.viewDetails")}</Link>
            </Button>
          </div>
        </div>
      </CardContent>
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
