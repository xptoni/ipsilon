import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboard = location.pathname.startsWith('/dashboard') || 
                      location.pathname.startsWith('/listings') ||
                      location.pathname.startsWith('/create-listing') ||
                      location.pathname.startsWith('/carrier-dashboard');

  const navLinks = [
    { href: '/', label: t('common.home') },
    { href: '/how-it-works', label: t('common.howItWorks') },
    { href: '/about', label: t('common.about') },
  ];

  return (
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
          </nav>
        )}

        {/* Dashboard Navigation */}
        {isDashboard && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === '/dashboard'
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {t('common.dashboard')}
            </Link>
            <Link
              to="/listings"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname.startsWith('/listings')
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {t('common.browseListings')}
            </Link>
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
            <>
              <span className="text-sm text-muted-foreground">{t('common.welcome')}, Marko</span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">{t('common.logout')}</Link>
              </Button>
            </>
          ) : (
          <>
              <Button variant="ghost" asChild>
                <Link to="/login">{t('common.signIn')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signup?type=carrier">{t('header.becomeCarrier')}</Link>
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
                <Link
                  to="/login"
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.signIn')}
                </Link>
                <Button variant="outline" asChild className="mt-2">
                  <Link to="/signup?type=carrier" onClick={() => setMobileMenuOpen(false)}>
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
                  to="/dashboard"
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.dashboard')}
                </Link>
                <Link
                  to="/listings"
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.browseListings')}
                </Link>
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
  );
};

export default Header;
