import { Link } from "react-router-dom";
import { Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

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
              {t('footer.tagline')}
            </p>
          </div>

          {/* For Shippers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.forShippers')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signup" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.postShipment')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Carriers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.forCarriers')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signup?type=carrier" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.becomeCarrier')}
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.browseListings')}
                </Link>
              </li>
              <li>
                <Link to="/carrier-faq" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.carrierFaq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ipsilon. {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {t('footer.serving')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
