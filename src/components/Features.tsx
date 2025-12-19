import { 
  Bot,
  Hammer,
  Wrench,
  Heart,
  CheckCircle,
  UserPlus,
  Lock,
  Sparkles
} from "lucide-react";

const modules = [
  {
    icon: Bot,
    title: "Основні команди",
    description: "Розваги та корисна інформація",
    commands: [
      "/anime - Пошук аніме",
      "/ai - Штучний інтелект",
      "/ball - Магічний шар",
      "/cat - Фото котика",
      "/number - Вгадай число",
      "/serverinfo - Інфо про сервер",
      "/userinfo - Інфо про користувача",
      "/botinfo - Статистика бота",
      "/tiktokinfo - Інфо TikTok",
      "/premium - Преміум-підписка"
    ]
  },
  {
    icon: Hammer,
    title: "Модерація",
    description: "Легке керування сервером для адмінів",
    commands: [
      "/ban - Заблокувати",
      "/unban - Розблокувати",
      "/kick - Вигнати",
      "/mute - Замʼютити",
      "/unmute - Розмʼютити",
      "/clear - Видалити повідомлення",
      "/slowmode - Повільний режим"
    ]
  },
  {
    icon: Wrench,
    title: "Утиліти",
    description: "Корисні інструменти для сервера",
    commands: [
      "/embedbuilder - Embed-повідомлення",
      "/avatar - Аватар користувача",
      "/banner - Банер користувача",
      "/sendfakemessage - Фейк-повідомлення",
      "/addemoji - Додати емоцію"
    ]
  },
  {
    icon: Heart,
    title: "Реакції",
    description: "Виражайте емоції анімаціями",
    commands: [
      "/hug - Обняти",
      "/pat - Погладити",
      "/wink - Підмигнути",
      "/slap - Відлупити",
      "/kiss - Поцілувати",
      "/kill - Вбити",
      "/sad, /angry, /smile, /laugh"
    ]
  },
  {
    icon: CheckCircle,
    title: "Верифікація",
    description: "5-значна капча для перевірки нових користувачів на ботів та відсіювання підозрілих акаунтів.",
    commands: []
  },
  {
    icon: UserPlus,
    title: "Авто-ролі",
    description: "Автоматична видача ролей новим користувачам одразу після входу на сервер.",
    commands: []
  },
  {
    icon: Lock,
    title: "Безпека",
    description: "Захист від твінк-акаунтів та селф-ботів. Автоматичний бан щойно створених акаунтів.",
    commands: []
  },
  {
    icon: Sparkles,
    title: "Скоро...",
    description: "У наступних оновленнях будуть нові круті фішки! Слідкуйте за новинами на сервері підтримки.",
    commands: [],
    isComingSoon: true
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Модулі</span> бота
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lanicat — перший український бот-комбайн з безліччю функцій
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <div
              key={module.title}
              className={`group p-6 bg-card rounded-xl border transition-all duration-300 hover:scale-[1.02] flex flex-col
                ${module.isComingSoon 
                  ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary' 
                  : 'border-border hover:border-primary/50 hover:glow-soft'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors
                ${module.isComingSoon 
                  ? 'bg-primary/20 group-hover:bg-primary/30' 
                  : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                <module.icon className={`w-6 h-6 ${module.isComingSoon ? 'text-primary animate-pulse' : 'text-primary'}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{module.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{module.description}</p>
              
              {module.commands.length > 0 && (
                <div className="mt-auto pt-3 border-t border-border/50">
                  <div className="flex flex-wrap gap-1.5">
                    {module.commands.slice(0, 5).map((cmd) => (
                      <span 
                        key={cmd} 
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-mono"
                      >
                        {cmd.split(" - ")[0]}
                      </span>
                    ))}
                    {module.commands.length > 5 && (
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
                        +{module.commands.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {module.isComingSoon && (
                <div className="mt-auto pt-3">
                  <a 
                    href="https://discord.gg/aWPSsuEzr3"
                    className="text-xs text-primary hover:underline"
                  >
                    Слідкувати за оновленнями →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
