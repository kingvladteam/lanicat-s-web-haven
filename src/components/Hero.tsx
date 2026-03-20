import { Link } from "react-router-dom";
import { Plus, Sparkles } from "lucide-react";
import lanicatLogo from "@/assets/lanicat-logo.png";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark pb-24">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gold-dark/20 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 pt-28 pb-20">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="relative mb-8 animate-float">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-110" />
            <img
              src={lanicatLogo}
              alt="Lanicat Logo"
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover glow-gold"
            />
          </div>

          <ScrollAnimation>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
              <span className="text-gradient">Lanicat</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Перший український бот-комбайн для вашого сервера!
              Безліч функцій: Верифікація користувачів, Штучний інтелект, Авто-ролі, Реакції та багато іншого!
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/add"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg 
                         hover:bg-gold-light transition-all duration-300 glow-gold hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Додати на сервер
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg 
                         border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 text-center"
              >
                <Sparkles className="w-5 h-5" />
                Можливості
              </a>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
              <a
                href="https://discord.gg/aWPSsuEzr3"
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-muted-foreground hover:text-primary 
                         border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-300
                         hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Сервер підтримки
              </a>
              <a
                href="https://disflip.com/bot/940627200208699452"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-muted-foreground hover:text-primary 
                         border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-300
                         hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Проголосувати
              </a>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">400+</div>
                <div className="text-muted-foreground text-sm">Серверів</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">40K+</div>
                <div className="text-muted-foreground text-sm">Користувачів</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">99.9%</div>
                <div className="text-muted-foreground text-sm">Uptime</div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById("features");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="absolute bottom-12 inset-x-0 mx-auto w-fit animate-bounce cursor-pointer group z-20"
        aria-label="Перейти до модулів"
      >
        <div className="w-10 h-14 rounded-full border-2 border-muted-foreground/50 flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors group-hover:bg-primary/10">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card/80 px-2 py-1 rounded">
          Переглянути модулі
        </span>
      </button>
    </section>
  );
};

export default Hero;
