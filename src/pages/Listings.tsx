import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  MapPin,
  Route,
  Globe,
  Search,
  RotateCcw,
  Bell,
  Save,
  ArrowRight,
  MessageSquare,
  Info,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getActiveListings, type Listing } from "@/lib/mockData";
import { useTranslation } from "react-i18next";

const CATEGORIES = [
  { id: "vehicles", labelKey: "listings.categories.vehicles" },
  { id: "furniture", labelKey: "listings.categories.furniture" },
  { id: "packages", labelKey: "listings.categories.packages" },
  { id: "pallets", labelKey: "listings.categories.pallets" },
  { id: "moving", labelKey: "listings.categories.moving" },
  { id: "pets", labelKey: "listings.categories.pets" },
  { id: "passengers", labelKey: "listings.categories.passengers" },
  { id: "construction", labelKey: "listings.categories.construction" },
  { id: "other", labelKey: "listings.categories.other" },
];

const RADIUS_OPTIONS = ["10", "30", "50", "100", "200"];

const COUNTRIES = [
  "Croatia",
  "Slovenia",
  "Germany",
  "Austria",
  "Serbia",
  "Hungary",
  "Italy",
  "Czech Republic",
  "Poland",
  "Netherlands",
];

const Listings = () => {
  const { t } = useTranslation();
  const allListings = getActiveListings();

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTab, setSearchTab] = useState("local");
  
  // Local search
  const [localLocation, setLocalLocation] = useState("");
  const [localRadius, setLocalRadius] = useState("50");
  const [originInRadius, setOriginInRadius] = useState(true);
  const [destinationInRadius, setDestinationInRadius] = useState(false);

  // Country search
  const [selectedCountry, setSelectedCountry] = useState("");

  // Route search
  const [routeOrigin, setRouteOrigin] = useState("");
  const [routeDestination, setRouteDestination] = useState("");
  const [maxDeviation, setMaxDeviation] = useState("30");
  const [searchBackloads, setSearchBackloads] = useState(false);

  // Email notifications
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Simple filter - just filter by category for now (mock)
  const filteredListings = selectedCategories.length > 0
    ? allListings.filter((listing) => {
        // Map cargo types to categories for demo
        if (selectedCategories.includes("vehicles") && ["car", "van", "truck"].includes(listing.cargoType)) {
          return true;
        }
        if (selectedCategories.includes("other") && listing.cargoType === "other") {
          return true;
        }
        return false;
      })
    : allListings;

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setLocalLocation("");
    setLocalRadius("50");
    setOriginInRadius(true);
    setDestinationInRadius(false);
    setSelectedCountry("");
    setRouteOrigin("");
    setRouteDestination("");
    setMaxDeviation("30");
    setSearchBackloads(false);
  };

  const handleSaveSearch = () => {
    // TODO: Implement save search functionality
    console.log("Search saved with email notifications:", emailNotifications);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout hideFooter>
      <div className="container py-8">
        {/* Header */}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
          {t("listings.title")}
        </h1>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <InfoCard
            icon={<Package className="h-5 w-5 text-primary" />}
            text={t("listings.infoCards.browseShipments")}
          />
          <InfoCard
            icon={<Search className="h-5 w-5 text-primary" />}
            text={t("listings.infoCards.useFilters")}
          />
          <InfoCard
            icon={<Route className="h-5 w-5 text-primary" />}
            text={t("listings.infoCards.routeSearch")}
          />
          <InfoCard
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            text={t("listings.infoCards.sendQuote")}
          />
        </div>

        {/* Search Tabs */}
        <Tabs value={searchTab} onValueChange={setSearchTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="local" className="flex items-center gap-2 py-3">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">{t("listings.tabs.local")}</span>
            </TabsTrigger>
            <TabsTrigger value="country" className="flex items-center gap-2 py-3">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t("listings.tabs.country")}</span>
            </TabsTrigger>
            <TabsTrigger value="route" className="flex items-center gap-2 py-3">
              <Route className="h-4 w-4" />
              <span className="hidden sm:inline">{t("listings.tabs.route")}</span>
            </TabsTrigger>
          </TabsList>

          {/* Local Search Tab */}
          <TabsContent value="local" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>{t("listings.localSearch.location")}</Label>
                    <Input
                      placeholder={t("listings.localSearch.locationPlaceholder")}
                      value={localLocation}
                      onChange={(e) => setLocalLocation(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("listings.localSearch.radius")}</Label>
                    <Select value={localRadius} onValueChange={setLocalRadius}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {RADIUS_OPTIONS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r} km
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-4 sm:col-span-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="originInRadius"
                        checked={originInRadius}
                        onCheckedChange={(checked) => setOriginInRadius(!!checked)}
                      />
                      <Label htmlFor="originInRadius" className="text-sm">
                        {t("listings.localSearch.originInRadius")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="destinationInRadius"
                        checked={destinationInRadius}
                        onCheckedChange={(checked) => setDestinationInRadius(!!checked)}
                      />
                      <Label htmlFor="destinationInRadius" className="text-sm">
                        {t("listings.localSearch.destinationInRadius")}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Country Search Tab */}
          <TabsContent value="country" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="max-w-sm space-y-2">
                  <Label>{t("listings.countrySearch.country")}</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("listings.countrySearch.selectCountry")} />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Route Search Tab */}
          <TabsContent value="route" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>{t("listings.routeSearch.origin")}</Label>
                    <Input
                      placeholder={t("listings.routeSearch.originPlaceholder")}
                      value={routeOrigin}
                      onChange={(e) => setRouteOrigin(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("listings.routeSearch.destination")}</Label>
                    <Input
                      placeholder={t("listings.routeSearch.destinationPlaceholder")}
                      value={routeDestination}
                      onChange={(e) => setRouteDestination(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("listings.routeSearch.maxDeviation")}</Label>
                    <Select value={maxDeviation} onValueChange={setMaxDeviation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {RADIUS_OPTIONS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r} km
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="searchBackloads"
                        checked={searchBackloads}
                        onCheckedChange={(checked) => setSearchBackloads(!!checked)}
                      />
                      <Label htmlFor="searchBackloads" className="text-sm">
                        {t("listings.routeSearch.searchBackloads")}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Category Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Label className="mb-3 block">{t("listings.filters.categories")}</Label>
            <div className="flex flex-wrap gap-3 mb-4">
              {CATEGORIES.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                    {t(category.labelKey)}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={resetFilters} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                {t("listings.filters.reset")}
              </Button>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                {t("listings.filters.search")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Search Section */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">
                    {t("listings.saveSearch.title")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("listings.saveSearch.description")}
                </p>
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={(checked) => setEmailNotifications(!!checked)}
                  />
                  <Label
                    htmlFor="emailNotifications"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    {t("listings.saveSearch.emailNotifications")}
                  </Label>
                </div>
              </div>
              <Button onClick={handleSaveSearch} className="gap-2 shrink-0">
                <Save className="h-4 w-4" />
                {t("listings.saveSearch.saveButton")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {t("listings.results.title")} ({filteredListings.length})
          </h2>

          {filteredListings.length > 0 ? (
            <div className="grid gap-4">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} formatDate={formatDate} t={t} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {t("listings.results.noResults")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("listings.results.noResultsDesc")}
                </p>
                <Button variant="outline" onClick={resetFilters} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  {t("listings.filters.reset")}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

const InfoCard = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <Card className="bg-muted/50">
    <CardContent className="p-4 flex items-start gap-3">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </CardContent>
  </Card>
);

const ListingCard = ({
  listing,
  formatDate,
  t,
}: {
  listing: Listing;
  formatDate: (date: string) => string;
  t: any;
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          {/* Thumbnail */}
          <div className="w-24 sm:w-32 shrink-0 bg-muted flex items-center justify-center">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{t(`cargo.${listing.cargoType}`)}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(listing.pickupDate)}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground">
                  {listing.notes.split(",")[0].slice(0, 30)}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 text-primary shrink-0" />
                  <span>{listing.origin}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span>{listing.destination}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>
                    {listing.quotesCount} {t("listings.results.quotes")}
                  </span>
                </div>
              </div>

              <Button asChild className="shrink-0">
                <Link to={`/listings/${listing.id}`}>
                  {t("listings.results.viewDetails")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Listings;
