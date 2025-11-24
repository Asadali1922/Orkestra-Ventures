import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/partners", label: "Partners" },
    { href: "/mentors", label: "Mentors" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo-icon.png"
              alt="Orkestra Ventures"
              className="h-12 w-12 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-xl font-bold text-[oklch(0.2_0.05_240)]">
              Orkestra Ventures
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  location === link.href
                    ? "text-[oklch(0.55_0.18_260)]"
                    : "text-[oklch(0.2_0.05_240)] hover:text-[oklch(0.55_0.18_260)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/apply" className="btn-primary">
              Apply Now
            </Link>
            <Link href="/admin/login" className="btn-secondary">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[oklch(0.2_0.05_240)] hover:text-[oklch(0.55_0.18_260)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bg-white shadow-lg z-40 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 transition-colors duration-200 ${
                    location === link.href
                      ? "text-[oklch(0.55_0.18_260)]"
                      : "text-[oklch(0.2_0.05_240)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary inline-block text-center mt-2"
              >
                Apply Now
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-secondary inline-block text-center"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
