import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Bot, Crown, HelpCircle, Plus } from "lucide-react";
import lanicatLogo from "@/assets/lanicat-logo.png";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Головна", icon: Home },
    { to: "/about", label: "Про бота", icon: Bot },
    { to: "/premium", label: "Premium", icon: Crown },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-border shadow-lg shadow-black/10"
          : "bg-background/60 backdrop-blur-md border-transparent"
      )}>
        <div className="container px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={lanicatLogo}
                alt="Lanicat"
                className="w-9 h-9 rounded-full transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-lg font-bold text-gradient transition-opacity group-hover:opacity-80">
                Lanicat
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn(
                      "w-4 h-4 transition-colors duration-300",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )} />
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/add"
                className="ml-3 px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                Додати бота
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-[60] p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={cn(
                  "absolute left-0 w-6 h-0.5 bg-current rounded transition-all duration-300",
                  isMenuOpen ? "top-3 rotate-45" : "top-1 rotate-0"
                )} />
                <span className={cn(
                  "absolute left-0 top-3 w-6 h-0.5 bg-current rounded transition-all duration-300",
                  isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                )} />
                <span className={cn(
                  "absolute left-0 w-6 h-0.5 bg-current rounded transition-all duration-300",
                  isMenuOpen ? "top-3 -rotate-45" : "top-5 rotate-0"
                )} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <div className={cn(
        "fixed inset-0 z-[55] md:hidden transition-all duration-500",
        isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
      )}>
        {/* Backdrop — click to close */}
        <div
          className={cn(
            "absolute inset-0 bg-background/95 backdrop-blur-xl transition-opacity duration-500",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Glow effects */}
        <div className={cn(
          "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] transition-opacity duration-700 pointer-events-none",
          isMenuOpen ? "opacity-100" : "opacity-0"
        )} />

        {/* Nav content */}
        <nav className="relative h-full flex flex-col items-center justify-center gap-2 px-8">
          {navLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "w-full max-w-xs flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-500",
                  "hover:bg-primary/10 hover:scale-105 active:scale-95",
                  isMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                  location.pathname === link.to
                    ? "text-primary bg-primary/5 border border-primary/20"
                    : "text-foreground/80"
                )}
                style={{ transitionDelay: isMenuOpen ? `${150 + i * 75}ms` : "0ms" }}
              >
                <Icon className={cn(
                  "w-5 h-5 shrink-0",
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                )} />
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/add"
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "w-full max-w-xs flex items-center justify-center gap-3 mt-4 px-6 py-4 rounded-xl text-lg font-semibold",
              "bg-primary text-primary-foreground glow-gold hover:scale-105 active:scale-95 transition-all duration-500",
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: isMenuOpen ? `${150 + navLinks.length * 75}ms` : "0ms" }}
          >
            <Plus className="w-5 h-5" />
            Додати бота
          </Link>

          {/* Bottom links */}
          <div className={cn(
            "flex items-center gap-6 mt-8 transition-all duration-500",
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: isMenuOpen ? "600ms" : "0ms" }}>
            <a href="https://discord.gg/aWPSsuEzr3" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Discord
            </a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <Link to="/terms" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Умови
            </Link>
            <span className="w-1 h-1 rounded-full bg-border" />
            <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Приватність
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
