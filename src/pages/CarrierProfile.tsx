import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Truck,
  ShieldCheck,
  Briefcase,
  User,
} from "lucide-react";

// Mock carrier profile data
const mockCarrierProfile = {
  id: "carrier-1",
  username: "mlado55",
  userType: "company" as "company" | "individual",
  insurance: ["CMR", "GIT"],
  vehicleCount: "2-3",
  completedJobs: 156,
  rating: 4.8,
  bio: "Experienced vehicle transporter with over 8 years in the industry. Specializing in enclosed car transport across the Balkans and Central Europe. Every vehicle is treated as if it were my own — careful handling, GPS tracking, and full insurance coverage on every trip.",
  memberSince: "2024-01-10",
  reviews: [
    {
      id: "r1",
      shipperName: "user_mk291",
      rating: 5,
      comment:
        "Excellent service! My BMW arrived in perfect condition. Very communicative throughout the entire transport.",
      date: "2025-01-15",
    },
    {
      id: "r2",
      shipperName: "user_ana84",
      rating: 5,
      comment:
        "Very professional. Picked up on time and delivered a day early. Highly recommended!",
      date: "2025-01-02",
    },
    {
      id: "r3",
      shipperName: "user_kvx02",
      rating: 4,
      comment:
        "Good transport, car arrived safely. Communication could have been slightly better during transit but overall a positive experience.",
      date: "2024-12-20",
    },
    {
      id: "r4",
      shipperName: "user_stf77",
      rating: 5,
      comment:
        "Third time using this carrier. Consistently reliable and careful with vehicles. Fair pricing too.",
      date: "2024-12-05",
    },
    {
      id: "r5",
      shipperName: "user_jidf66",
      rating: 5,
      comment:
        "Transported my classic car internationally. Was worried but extra care was taken. Perfect!",
      date: "2024-11-18",
    },
  ],
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? "fill-warning text-warning"
              : star - 0.5 <= rating
              ? "fill-warning/50 text-warning"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
};

const CarrierProfile = () => {
  const { username } = useParams();
  const carrier = mockCarrierProfile;

  const averageRating =
    carrier.reviews.reduce((sum, r) => sum + r.rating, 0) /
    carrier.reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: carrier.reviews.filter((r) => r.rating === star).length,
    percentage:
      (carrier.reviews.filter((r) => r.rating === star).length /
        carrier.reviews.length) *
      100,
  }));

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-xl md:text-2xl font-semibold text-foreground">
                  <span className="text-muted-foreground font-normal">Username:</span> {carrier.username}
                </h1>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex items-center gap-2">
                    <StarRating rating={Math.round(averageRating)} />
                    <span className="font-semibold text-foreground">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      ({carrier.reviews.length} reviews)
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-5" />
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span className="font-medium text-foreground">
                      {carrier.completedJobs}
                    </span>{" "}
                    completed jobs
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <User className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">User type</p>
                    <p className="font-semibold text-foreground">
                      {carrier.userType === "individual" ? "Sole Trader" : "Company"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Insurance</p>
                    <p className="font-semibold text-foreground">
                      {carrier.insurance.join(" + ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About / Bio */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {carrier.bio}
            </p>
          </CardContent>
        </Card>

        {/* Fleet Size */}
        <Card>
          <CardContent className="p-5 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fleet Size</p>
              <p className="font-medium text-foreground text-sm mt-1">
                {carrier.vehicleCount} vehicles
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating Summary */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">
                  {averageRating.toFixed(1)}
                </p>
                <StarRating rating={Math.round(averageRating)} />
                <p className="text-sm text-muted-foreground mt-1">
                  {carrier.reviews.length} reviews
                </p>
              </div>

              <div className="flex-1 space-y-1.5 w-full">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-muted-foreground">{star}</span>
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warning rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-6 text-muted-foreground text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Individual Reviews */}
            <div className="space-y-5">
              {carrier.reviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                          {review.shipperName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {review.shipperName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-11">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CarrierProfile;
