import { Link, useLocation } from "react-router-dom";
import lanicatLogo from "@/assets/lanicat-logo.png";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  
  const navLinks = [
    { to: "/", label: "Головна" },
    { to: "/about", label: "Про бота" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={lanicatLogo} alt="Lanicat" className="w-9 h-9 rounded-full" />
            <span className="text-lg font-bold text-gradient">Lanicat</span>
          </Link>

          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://discord.com/oauth2/authorize?client_id=1115204425133416499&permissions=1634235779318&integration_type=0&scope=bot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Додати бота
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
