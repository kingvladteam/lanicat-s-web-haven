import { Shield, Music, Smile, MessageSquare, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Модерація",
    description: "Автоматичний захист серверу від спаму, рейдів та порушників правил.",
  },
  {
    icon: Music,
    title: "Музика",
    description: "Слухайте улюблену музику з YouTube, Spotify та інших платформ.",
  },
  {
    icon: Smile,
    title: "Розваги",
    description: "Меми, міні-ігри, цікаві команди для веселощів на сервері.",
  },
  {
    icon: MessageSquare,
    title: "Привітання",
    description: "Красиві привітальні повідомлення для нових учасників серверу.",
  },
  {
    icon: Users,
    title: "Рівні",
    description: "Система рівнів та досвіду для заохочення активних учасників.",
  },
  {
    icon: Zap,
    title: "Швидкість",
    description: "Миттєва відповідь на команди без затримок та лагів.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Можливості</span> бота
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lanicat має все необхідне для вашого Discord серверу
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 bg-card rounded-xl border border-border 
                         hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]
                         hover:glow-soft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4
                              group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
