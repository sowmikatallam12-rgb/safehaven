import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Phone, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const quickExit = () => {
    window.location.replace("https://www.google.com");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/victim", label: "Get Help" },
    { to: "/counsellor", label: "Counsellor" },
    { to: "/legal", label: "Legal Resources" },
    { to: "/admin", label: "Admin" },
    { to: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Quick Exit Button - Always Visible */}
      <Button
        onClick={quickExit}
        variant="destructive"
        size="sm"
        className="fixed top-4 right-4 z-50 shadow-lg"
      >
        <Phone className="h-4 w-4 mr-2" />
        Quick Exit
      </Button>

      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Shield className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SafeHaven
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  <Button
                    variant={location.pathname === link.to ? "default" : "ghost"}
                    size="sm"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 animate-in slide-in-from-top">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={location.pathname === link.to ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full justify-start"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">SafeHaven</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A safe space for survivors of domestic violence. Confidential support, legal guidance, and counselling services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency Contacts</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>National Helpline: 1800-XXX-XXXX</li>
                <li>Police Emergency: 100</li>
                <li>Women's Helpline: 181</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Important</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Your safety is our priority. All data is stored locally and confidentially.
              </p>
              <Button onClick={quickExit} variant="outline" size="sm">
                Quick Exit to Google
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 SafeHaven. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
