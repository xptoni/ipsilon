import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Package, Calendar, FileText, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const CreateListing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(t('listingDetail.quoteSubmitted'));
    navigate("/dashboard");
    setIsLoading(false);
  };

  return (
    <Layout hideFooter>
      <div className="container max-w-2xl py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('createListing.backToDashboard')}
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">{t('createListing.title')}</CardTitle>
            <CardDescription>
              {t('createListing.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Route Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {t('createListing.route')}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">{t('createListing.originCity')}</Label>
                    <Input
                      id="origin"
                      placeholder={t('createListing.originPlaceholder')}
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">{t('createListing.destinationCity')}</Label>
                    <Input
                      id="destination"
                      placeholder={t('createListing.destinationPlaceholder')}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Cargo Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Package className="h-4 w-4" />
                  {t('createListing.cargoDetails')}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargoType">{t('carrierDashboard.cargoType')}</Label>
                  <Select value={cargoType} onValueChange={setCargoType} required>
                    <SelectTrigger>
                      <SelectValue placeholder={t('createListing.cargoTypePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">{t('cargo.car')}</SelectItem>
                      <SelectItem value="van">{t('cargo.van')}</SelectItem>
                      <SelectItem value="truck">{t('cargo.truck')}</SelectItem>
                      <SelectItem value="other">{t('cargo.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">{t('createListing.dimensions')}</Label>
                    <Input
                      id="dimensions"
                      placeholder={t('createListing.dimensionsPlaceholder')}
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">{t('createListing.weight')}</Label>
                    <Input
                      id="weight"
                      placeholder={t('createListing.weightPlaceholder')}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Timing Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {t('createListing.timing')}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">{t('createListing.pickupDate')}</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {t('createListing.additionalInfo')}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">{t('createListing.notesForCarriers')}</Label>
                  <Textarea
                    id="notes"
                    placeholder={t('createListing.notesPlaceholder')}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? t('createListing.creatingListing') : t('createListing.postListing')}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  {t('createListing.listingVisibility')}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateListing;
