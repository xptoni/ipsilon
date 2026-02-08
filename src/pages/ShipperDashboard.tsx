import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Package, 
  MapPin, 
  Calendar, 
  MessageSquare,
  Star,
  ArrowRight
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getListingsForShipper, getQuotesForListing, type Listing, type Quote } from "@/lib/mockData";
import { useTranslation } from "react-i18next";

const ShipperDashboard = () => {
  const { t } = useTranslation();
  const listings = getListingsForShipper('shipper-1');
  
  const getStatusColor = (status: Listing['status']) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'booked': return 'bg-primary/10 text-primary border-primary/20';
      case 'in_transit': return 'bg-warning/10 text-warning border-warning/20';
      case 'completed': return 'bg-muted text-muted-foreground border-muted';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: Listing['status']) => {
    switch (status) {
      case 'active': return t('status.active');
      case 'booked': return t('status.booked');
      case 'in_transit': return t('status.inTransit');
      case 'completed': return t('status.completed');
      default: return status;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Layout hideFooter>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {t('shipperDashboard.myShipments')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('shipperDashboard.manageListings')}
            </p>
          </div>
          <Button asChild>
            <Link to="/create-listing">
              <Plus className="h-4 w-4 mr-2" />
              {t('shipperDashboard.createNewListing')}
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {listings.filter(l => l.status === 'active').length}
              </div>
              <p className="text-sm text-muted-foreground">{t('shipperDashboard.activeListings')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {listings.reduce((acc, l) => acc + l.quotesCount, 0)}
              </div>
              <p className="text-sm text-muted-foreground">{t('shipperDashboard.totalQuotes')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {listings.filter(l => l.status === 'booked' || l.status === 'in_transit').length}
              </div>
              <p className="text-sm text-muted-foreground">{t('shipperDashboard.inProgress')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {listings.filter(l => l.status === 'completed').length}
              </div>
              <p className="text-sm text-muted-foreground">{t('shipperDashboard.completed')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {listings.map((listing) => {
            const quotes = getQuotesForListing(listing.id);
            
            return (
              <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Listing Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="outline" className={getStatusColor(listing.status)}>
                          {getStatusLabel(listing.status)}
                        </Badge>
                        <Badge variant="secondary">
                          {t(`cargo.${listing.cargoType}`)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <span className="font-medium">{listing.origin}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{listing.destination}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(listing.pickupDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {listing.dimensions}
                        </div>
                      </div>
                    </div>

                    {/* Quotes Summary */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          {quotes.length} {quotes.length !== 1 ? t('shipperDashboard.quotes') : t('shipperDashboard.quote')}
                        </div>
                        {quotes.length > 0 && (
                          <div className="text-sm">
                            {t('shipperDashboard.from')} <span className="font-semibold text-primary">€{Math.min(...quotes.map(q => q.price))}</span>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" asChild>
                        <Link to={`/delivery-details/${listing.id}`}>
                          {t('shipperDashboard.viewDetails')}
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Quotes Preview */}
                  {listing.status === 'active' && quotes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        {t('shipperDashboard.recentQuotes')}
                      </p>
                      <div className="grid gap-2">
                        {quotes.slice(0, 3).map((quote) => (
                          <QuotePreviewCard key={quote.id} quote={quote} listingId={listing.id} t={t} />
                        ))}
                        {quotes.length > 3 && (
                          <Link 
                            to={`/delivery-details/${listing.id}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {t('shipperDashboard.viewAllQuotes').replace('{count}', String(quotes.length))}
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {listings.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {t('shipperDashboard.noListingsYet')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('shipperDashboard.createFirstListing')}
              </p>
              <Button asChild>
                <Link to="/create-listing">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('shipperDashboard.createListing')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

const QuotePreviewCard = ({ quote, listingId, t }: { quote: Quote; listingId: string; t: any }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">
            {quote.carrierName.charAt(0)}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{quote.carrierName}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3 w-3 fill-warning text-warning" />
              {quote.carrierRating}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{quote.vehicleType}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-foreground">€{quote.price}</div>
        <Button size="sm" variant="ghost" className="h-7 text-xs" asChild>
          <Link to={`/delivery-details/${listingId}?quote=${quote.id}`}>
            {t('common.view')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ShipperDashboard;
