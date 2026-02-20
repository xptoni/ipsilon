import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Plus, 
  Package, 
  MessageSquare,
  ArrowRight,
  Pencil
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

  const activeListings = listings.filter(l => l.status === 'active');
  const inProgressListings = listings.filter(l => l.status === 'booked' || l.status === 'in_transit');
  const completedListings = listings.filter(l => l.status === 'completed');

  const renderListingCard = (listing: Listing, showEdit = false) => {
    const quotes = getQuotesForListing(listing.id);
    return (
      <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                <Badge variant="outline" className={`shrink-0 ${getStatusColor(listing.status)}`}>
                  {getStatusLabel(listing.status)}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{listing.origin}</span>
                <ArrowRight className="h-3 w-3 shrink-0" />
                <span>{listing.destination}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                {quotes.length} {quotes.length !== 1 ? t('shipperDashboard.quotes') : t('shipperDashboard.quote')}
              </div>
              {showEdit && (
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/delivery-details/${listing.id}?edit=true`}>
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    {t('common.edit', 'Edit')}
                  </Link>
                </Button>
              )}
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
  };

  const renderEmptyState = (message: string) => (
    <Card className="text-center py-12">
      <CardContent>
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );

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
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {activeListings.length}
              </div>
              <p className="text-sm text-muted-foreground">{t('shipperDashboard.activeListings')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {inProgressListings.length}
              </div>
              <p className="text-sm text-muted-foreground">{t('shipperDashboard.inProgress')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {completedListings.length}
              </div>
              <p className="text-sm text-muted-foreground">{t('shipperDashboard.completed')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">
              {t('shipperDashboard.activeListings')} ({activeListings.length})
            </TabsTrigger>
            <TabsTrigger value="in_progress">
              {t('shipperDashboard.inProgress')} ({inProgressListings.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              {t('shipperDashboard.completed')} ({completedListings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeListings.length > 0
              ? activeListings.map(l => renderListingCard(l, true))
              : renderEmptyState(t('shipperDashboard.noListingsYet'))
            }
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            {inProgressListings.length > 0
              ? inProgressListings.map(l => renderListingCard(l))
              : renderEmptyState(t('shipperDashboard.noInProgress', 'No shipments in progress'))
            }
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedListings.length > 0
              ? completedListings.map(l => renderListingCard(l))
              : renderEmptyState(t('shipperDashboard.noCompleted', 'No completed shipments yet'))
            }
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ShipperDashboard;
