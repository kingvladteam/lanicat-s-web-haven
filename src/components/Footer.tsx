import { Link } from "react-router-dom";
import lanicatLogo from "@/assets/lanicat-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={lanicatLogo} alt="Lanicat" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold text-gradient">Lanicat</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Discord
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Підтримка
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Політика конфіденційності
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Умови користування
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Lanicat. Усі права захищено.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
