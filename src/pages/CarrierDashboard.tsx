import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Calendar,
  Package,
  ArrowRight,
  Search,
  Clock,
  Truck,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getActiveListings, mockQuotes, type Listing } from "@/lib/mockData";
import { useState } from "react";

const CarrierDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cargoFilter, setCargoFilter] = useState("all");

  const listings = getActiveListings();
  const myQuotes = mockQuotes.filter((q) => q.carrierId === "carrier-1");

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCargo =
      cargoFilter === "all" || listing.cargoType === cargoFilter;
    return matchesSearch && matchesCargo;
  });

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

  return (
    <Layout hideFooter>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Carrier Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse available listings and manage your quotes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {listings.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Available Listings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {myQuotes.length}
              </div>
              <p className="text-sm text-muted-foreground">My Quotes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {myQuotes.filter((q) => q.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {myQuotes.filter((q) => q.status === "accepted").length}
              </div>
              <p className="text-sm text-muted-foreground">Accepted</p>
            </CardContent>
          </Card>
        </div>

        {/* My Quotes Section */}
        {myQuotes.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              My Recent Quotes
            </h2>
            <div className="grid gap-3">
              {myQuotes.slice(0, 3).map((quote) => (
                <Card key={quote.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="outline"
                          className={getQuoteStatusColor(quote.status)}
                        >
                          {quote.status.charAt(0).toUpperCase() +
                            quote.status.slice(1)}
                        </Badge>
                        <div>
                          <p className="font-medium text-foreground">
                            €{quote.price}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {quote.notes.slice(0, 50)}...
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/listings/${quote.listingId}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Listings Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Available Listings
            </h2>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={cargoFilter} onValueChange={setCargoFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Cargo type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} formatDate={formatDate} />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No listings found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or check back later
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

const ListingCard = ({
  listing,
  formatDate,
}: {
  listing: Listing;
  formatDate: (date: string) => string;
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Listing Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary">
                {listing.cargoType.charAt(0).toUpperCase() +
                  listing.cargoType.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Posted by {listing.shipperName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium">{listing.origin}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{listing.destination}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(listing.pickupDate)}
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                {listing.dimensions}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {listing.quotesCount}/5 quotes
              </div>
            </div>

            {listing.notes && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {listing.notes}
              </p>
            )}
          </div>

          {/* Action */}
          <div className="flex items-center gap-3">
            {listing.quotesCount >= 5 ? (
              <Badge variant="outline" className="text-muted-foreground">
                Max quotes reached
              </Badge>
            ) : (
              <Button asChild>
                <Link to={`/listings/${listing.id}`}>
                  Submit Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarrierDashboard;
