import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Menu, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LoginModal from "@/components/auth/LoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isShipperDashboard = location.pathname.startsWith('/shipper-dashboard') ||
                             location.pathname.startsWith('/delivery-details');
  const isDashboard = isShipperDashboard || 
                      location.pathname.startsWith('/search-deliveries') ||
                      location.pathname.startsWith('/carrier-dashboard');

  const navLinks = [
    { href: '/', label: t('common.home') },
    { href: '/how-it-works', label: t('common.howItWorks') },
    { href: '/about', label: t('common.about') },
  ];

  const serviceCategories = [
    { value: 'cars', label: t('wizard.categories.cars') },
    { value: 'motorcycles', label: t('wizard.categories.motorcycles') },
    { value: 'furniture', label: t('wizard.categories.furniture') },
    { value: 'appliances', label: t('wizard.categories.appliances') },
    { value: 'boxes', label: t('wizard.categories.boxes') },
    { value: 'pallets', label: t('wizard.categories.pallets') },
    { value: 'machinery', label: t('wizard.categories.machinery') },
    { value: 'boats', label: t('wizard.categories.boats') },
  ];

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Truck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Ipsilon
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary outline-none">
                {t('header.services')}
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {serviceCategories.map((cat) => (
                  <DropdownMenuItem key={cat.value} asChild>
                    <Link
                      to={`/create-listing?category=${cat.value}`}
                      className="cursor-pointer"
                    >
                      {cat.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        )}

        {/* Dashboard Navigation */}
        {isDashboard && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/shipper-dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === '/shipper-dashboard'
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {t('common.dashboard')}
            </Link>
            {!isShipperDashboard && (
              <Link
                to="/search-deliveries"
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full font-medium transition-colors",
                  location.pathname === '/search-deliveries'
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <Search className="h-4 w-4" />
                {t('common.browseListings')}
              </Link>
            )}
          </nav>
        )}

        {/* Auth Buttons + Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          {isAuthPage ? (
            <Button variant="ghost" asChild>
              <Link to="/">{t('common.backToHome')}</Link>
            </Button>
          ) : isDashboard ? (
            <Button variant="outline" size="sm" asChild>
              <Link to="/">{t('common.logout')}</Link>
            </Button>
          ) : (
          <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/search-deliveries" className="flex items-center gap-1.5">
                  <Search className="h-4 w-4" />
                  {t('common.browseListings')}
                </Link>
              </Button>
              <Button variant="ghost" onClick={() => setLoginModalOpen(true)}>
                {t('common.login')}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/become-carrier">{t('header.becomeCarrier')}</Link>
              </Button>
              <Button asChild>
                <Link to="/create-listing">{t('header.getQuotes')}</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-3">
            {!isDashboard ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-border" />
                <button
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-primary text-left"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                >
                  {t('common.login')}
                </button>
                <Button variant="outline" asChild className="mt-2">
                  <Link to="/become-carrier" onClick={() => setMobileMenuOpen(false)}>
                    {t('header.becomeCarrier')}
                  </Link>
                </Button>
                <Button asChild className="mt-2">
                  <Link to="/create-listing" onClick={() => setMobileMenuOpen(false)}>
                    {t('header.getQuotes')}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/shipper-dashboard"
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.dashboard')}
                </Link>
                {!isShipperDashboard && (
                  <Link
                    to="/search-deliveries"
                    className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('common.browseListings')}
                  </Link>
                )}
                <hr className="border-border" />
                <Link
                  to="/"
                  className="py-2 text-sm font-medium text-destructive"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.logout')}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
    
    <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
};

export default Header;
