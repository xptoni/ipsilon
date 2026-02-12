import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Package, 
  MapPin, 
  MessageSquare,
  ArrowRight
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getListingsForShipper, getQuotesForListing, type Listing } from "@/lib/mockData";
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {listing.title}
                        </h3>
                        <Badge variant="outline" className={getStatusColor(listing.status)}>
                          {getStatusLabel(listing.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <span>{listing.origin}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span>{listing.destination}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        {quotes.length} {quotes.length !== 1 ? t('shipperDashboard.quotes') : t('shipperDashboard.quote')}
                      </div>
                      <Button variant="outline" asChild>
                        <Link to={`/delivery-details/${listing.id}`}>
                          {t('shipperDashboard.viewDetails')}
                        </Link>
                      </Button>
                    </div>
                  </div>
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

export default ShipperDashboard;
