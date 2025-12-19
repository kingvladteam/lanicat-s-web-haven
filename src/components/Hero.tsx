import lanicatLogo from "@/assets/lanicat-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gold-dark/20 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 py-20">
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

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-slide-up">
            <span className="text-gradient">Lanicat</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Перший український бот-комбайн для вашого сервера! 
            Безліч функцій: Верифікація користувачів, Штучний інтелект, Авто-ролі, Реакції та багато іншого!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a
              href="#"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg 
                         hover:bg-gold-light transition-all duration-300 glow-gold hover:scale-105"
            >
              Додати на сервер
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg 
                         border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              Можливості
            </a>
            <a
              href="https://discord.gg/aWPSsuEzr3"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg 
                         hover:bg-gold-light transition-all duration-300 glow-gold hover:scale-105"
            >
              Сервер підтримки
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
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
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
