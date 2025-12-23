import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Package, User } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") === "carrier" ? "carrier" : "shipper";

  const [userType, setUserType] = useState<"shipper" | "carrier">(initialType);
  const [isLoading, setIsLoading] = useState(false);

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  // Carrier-specific fields
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleRegistration, setVehicleRegistration] = useState("");
  const [routes, setRoutes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(t('common.welcome') + "!");
    navigate("/dashboard");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Ipsilon
            </span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            {t('signup.createAccount')}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t('signup.joinMarketplace')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <Label>{t('signup.iWantTo')}</Label>
              <RadioGroup
                value={userType}
                onValueChange={(value) => setUserType(value as "shipper" | "carrier")}
                className="grid grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="shipper"
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    userType === "shipper"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <RadioGroupItem value="shipper" id="shipper" className="sr-only" />
                  <Package className={`h-8 w-8 ${userType === "shipper" ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-center">
                    <div className="font-medium text-foreground">{t('signup.shipCargo')}</div>
                    <div className="text-xs text-muted-foreground">{t('signup.shipCargoDescription')}</div>
                  </div>
                </Label>

                <Label
                  htmlFor="carrier"
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    userType === "carrier"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <RadioGroupItem value="carrier" id="carrier" className="sr-only" />
                  <Truck className={`h-8 w-8 ${userType === "carrier" ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-center">
                    <div className="font-medium text-foreground">{t('signup.transportCargo')}</div>
                    <div className="text-xs text-muted-foreground">{t('signup.transportCargoDescription')}</div>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('signup.firstName')}</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('signup.lastName')}</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('signup.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('signup.phone')}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t('signup.phonePlaceholder')}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('signup.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="text-xs text-muted-foreground">
                {t('signup.passwordHint')}
              </p>
            </div>

            {/* Carrier-specific Fields */}
            {userType === "carrier" && (
              <>
                <hr className="border-border" />
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  {t('signup.vehicleInfo')}
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType">{t('signup.vehicleType')}</Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('signup.selectVehicleType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car_transporter">{t('signup.carTransporter')}</SelectItem>
                      <SelectItem value="enclosed">{t('signup.enclosedTrailer')}</SelectItem>
                      <SelectItem value="flatbed">{t('signup.flatbedTruck')}</SelectItem>
                      <SelectItem value="van">{t('signup.van')}</SelectItem>
                      <SelectItem value="truck">{t('signup.truck')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleRegistration">{t('signup.vehicleRegistration')}</Label>
                  <Input
                    id="vehicleRegistration"
                    placeholder={t('signup.vehicleRegPlaceholder')}
                    value={vehicleRegistration}
                    onChange={(e) => setVehicleRegistration(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="routes">{t('signup.usualRoutes')}</Label>
                  <Input
                    id="routes"
                    placeholder={t('signup.usualRoutesPlaceholder')}
                    value={routes}
                    onChange={(e) => setRoutes(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('signup.routesSeparator')}
                  </p>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('signup.creatingAccount') : t('signup.createAccount')}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              {t('signup.termsAgreement')}{" "}
              <Link to="/terms" className="text-primary hover:underline">
                {t('signup.termsOfService')}
              </Link>{" "}
              {t('signup.and')}{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                {t('signup.privacyPolicy')}
              </Link>
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('signup.alreadyHaveAccount')}{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              {t('common.signIn')}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex lg:flex-1 bg-primary items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            {userType === "shipper" 
              ? t('signup.shipWithConfidence')
              : t('signup.growBusiness')
            }
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {userType === "shipper"
              ? t('signup.shipperDescription')
              : t('signup.carrierDescription')
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
