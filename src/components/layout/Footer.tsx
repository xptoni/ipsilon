import { Link } from "react-router-dom";
import { Truck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Truck className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Ipsilon
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The fastest way to transport vehicles and cargo across the Balkans.
            </p>
          </div>

          {/* For Shippers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Shippers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signup" className="text-sm text-muted-foreground hover:text-primary">
                  Post a Shipment
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* For Carriers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Carriers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signup?type=carrier" className="text-sm text-muted-foreground hover:text-primary">
                  Become a Carrier
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-sm text-muted-foreground hover:text-primary">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/carrier-faq" className="text-sm text-muted-foreground hover:text-primary">
                  Carrier FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ipsilon. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Serving: Serbia • Croatia • Bosnia • North Macedonia • Slovenia • Montenegro
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
