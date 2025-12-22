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

const Signup = () => {
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

    toast.success("Account created successfully!");
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
            Create your account
          </h1>
          <p className="text-muted-foreground mb-8">
            Join the Balkans' largest transport marketplace
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <Label>I want to</Label>
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
                    <div className="font-medium text-foreground">Ship cargo</div>
                    <div className="text-xs text-muted-foreground">Post listings & receive quotes</div>
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
                    <div className="font-medium text-foreground">Transport cargo</div>
                    <div className="text-xs text-muted-foreground">Browse listings & submit quotes</div>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+381 64 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                At least 8 characters
              </p>
            </div>

            {/* Carrier-specific Fields */}
            {userType === "carrier" && (
              <>
                <hr className="border-border" />
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Vehicle Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle type</Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car_transporter">Car Transporter</SelectItem>
                      <SelectItem value="enclosed">Enclosed Trailer</SelectItem>
                      <SelectItem value="flatbed">Flatbed Truck</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleRegistration">Vehicle registration</Label>
                  <Input
                    id="vehicleRegistration"
                    placeholder="BG 123-AB"
                    value={vehicleRegistration}
                    onChange={(e) => setVehicleRegistration(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="routes">Usual routes</Label>
                  <Input
                    id="routes"
                    placeholder="e.g., Belgrade - Munich, Zagreb - Stuttgart"
                    value={routes}
                    onChange={(e) => setRoutes(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate multiple routes with commas
                  </p>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
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
              ? "Ship with confidence"
              : "Grow your transport business"
            }
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {userType === "shipper"
              ? "Post your transport needs and receive competitive quotes from verified carriers across the Balkans."
              : "Access thousands of transport listings and grow your business with our trusted marketplace."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
