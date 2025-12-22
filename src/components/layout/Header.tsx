import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // For demo, we'll show different nav based on route
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboard = location.pathname.startsWith('/dashboard') || 
                      location.pathname.startsWith('/listings') ||
                      location.pathname.startsWith('/create-listing');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About' },
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
              Dashboard
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
              Browse Listings
            </Link>
          </nav>
        )}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthPage ? (
            <Button variant="ghost" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          ) : isDashboard ? (
            <>
              <span className="text-sm text-muted-foreground">Welcome, Marko</span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Logout</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
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
                  Sign In
                </Link>
                <Button asChild className="mt-2">
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
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
                  Dashboard
                </Link>
                <Link
                  to="/listings"
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Listings
                </Link>
                <hr className="border-border" />
                <Link
                  to="/"
                  className="py-2 text-sm font-medium text-destructive"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Logout
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
