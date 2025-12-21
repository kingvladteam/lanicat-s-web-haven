import { useState } from "react";
import { 
  Bot,
  Hammer,
  Wrench,
  Heart,
  CheckCircle,
  UserPlus,
  Lock,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const modules = [
  {
    icon: Bot,
    title: "Основні команди",
    description: "Розваги та корисна інформація",
    fullDescription: "Основні команди бота для розваг та отримання корисної інформації. Доступні для всіх користувачів сервера.",
    commands: [
      { cmd: "/anime", desc: "Пошук аніме по назві з детальною інформацією" },
      { cmd: "/ai", desc: "Запитати що-небудь у штучного інтелекту" },
      { cmd: "/ball", desc: "Магічний шар — отримай відповідь на своє питання" },
      { cmd: "/cat", desc: "Отримати фото рандомного котика" },
      { cmd: "/number", desc: "Спробуй вгадати загадане число" },
      { cmd: "/serverinfo", desc: "Детальна інформація про поточний сервер" },
      { cmd: "/userinfo", desc: "Інформація про користувача Discord" },
      { cmd: "/botinfo", desc: "Статистика та інформація про бота" },
      { cmd: "/tiktokinfo", desc: "Інформація про користувача в TikTok" },
      { cmd: "/premium", desc: "Інформація про Преміум-підписку" }
    ]
  },
  {
    icon: Hammer,
    title: "Модерація",
    description: "Легке керування сервером для адмінів",
    fullDescription: "Модуль модерації доступний лише адміністрації серверу. Для роботи модуля потрібні права адміністратора.",
    commands: [
      { cmd: "/ban", desc: "Заблокувати порушника на сервері" },
      { cmd: "/unban", desc: "Розблокувати раніше заблокованого користувача" },
      { cmd: "/kick", desc: "Вигнати порушника з сервера" },
      { cmd: "/mute", desc: "Замʼютити порушника на певний час" },
      { cmd: "/unmute", desc: "Розмʼютити користувача" },
      { cmd: "/clear", desc: "Функціональне видалення великої кількості повідомлень" },
      { cmd: "/slowmode", desc: "Встановити користувацький повільний режим" }
    ]
  },
  {
    icon: Wrench,
    title: "Утиліти",
    description: "Корисні інструменти для сервера",
    fullDescription: "Набір корисних інструментів для покращення вашого сервера та спрощення рутинних завдань.",
    commands: [
      { cmd: "/embedbuilder", desc: "Створіть власне красиве embed-повідомлення" },
      { cmd: "/avatar", desc: "Отримати аватар будь-якого користувача у повному розмірі" },
      { cmd: "/banner", desc: "Отримати банер профілю користувача" },
      { cmd: "/sendfakemessage", desc: "Відправити фейк-повідомлення від імені бота" },
      { cmd: "/addemoji", desc: "Додати нову емоцію на сервер за посиланням" }
    ]
  },
  {
    icon: Heart,
    title: "Реакції",
    description: "Виражайте емоції анімаціями",
    fullDescription: "Модуль реакцій доступний абсолютно всім. Для роботи боту потрібне право відправляти вкладення у чат.",
    commands: [
      { cmd: "/hug", desc: "Обняти іншу людину" },
      { cmd: "/pat", desc: "Погладити людину по голові" },
      { cmd: "/wink", desc: "Підмигнути людині" },
      { cmd: "/slap", desc: "Відлупити людину" },
      { cmd: "/kiss", desc: "Поцілувати людину" },
      { cmd: "/kill", desc: "Вбити людину (жартівливо)" },
      { cmd: "/sad", desc: "Показати що тобі сумно" },
      { cmd: "/angry", desc: "Показати що ти злий" },
      { cmd: "/smile", desc: "Посміхнутись" },
      { cmd: "/laugh", desc: "Голосно посміятись" }
    ]
  },
  {
    icon: CheckCircle,
    title: "Верифікація",
    description: "Перевірка нових користувачів",
    fullDescription: "Модуль верифікації дозволяє перевірити нових людей на ботів за допомогою 5-значної капчі та відсіяти підозрілі акаунти. Захистіть свій сервер від автоматизованих атак.",
    commands: [],
    videoLink: "https://www.youtube.com/watch?v=7JKfxAkXnnw"
  },
  {
    icon: UserPlus,
    title: "Авто-ролі",
    description: "Автоматична видача ролей",
    fullDescription: "Модуль авторолей дозволяє видавати новим користувачам роль автоматично одразу після входу на сервер. Налаштуйте один раз — і забудьте про ручну видачу ролей.",
    commands: [],
    videoLink: "https://www.youtube.com/watch?v=heB_cfIpViw"
  },
  {
    icon: Lock,
    title: "Безпека",
    description: "Захист від підозрілих акаунтів",
    fullDescription: "Модуль безпеки дозволяє захистити ваш сервер від твінк-акаунтів та селф-ботів. Якщо модуль увімкнений, бот автоматично видаватиме бан щойно створеним акаунтам в Discord.",
    commands: []
  },
  {
    icon: Sparkles,
    title: "Скоро...",
    description: "Нові функції в розробці",
    fullDescription: "У наступних оновленнях будуть нові круті фішки! Слідкуйте за новинами на сервері підтримки, щоб першими дізнатися про нововведення.",
    commands: [],
    isComingSoon: true
  }
];

const Features = () => {
  const [selectedModule, setSelectedModule] = useState<typeof modules[0] | null>(null);

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-4">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Модулі</span> бота
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lanicat — перший український бот-комбайн з безліччю функцій
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <ScrollAnimation key={module.title} delay={index * 100}>
              <button
                onClick={() => setSelectedModule(module)}
                className={`group p-6 bg-card rounded-xl border transition-all duration-300 hover:scale-[1.02] flex flex-col text-left cursor-pointer w-full h-full
                  ${module.isComingSoon 
                    ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary' 
                    : 'border-border hover:border-primary/50 hover:glow-soft'}`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors
                    ${module.isComingSoon 
                      ? 'bg-primary/20 group-hover:bg-primary/30' 
                      : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                    <module.icon className={`w-6 h-6 ${module.isComingSoon ? 'text-primary animate-pulse' : 'text-primary'}`} />
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{module.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{module.description}</p>
                
                {module.commands.length > 0 && (
                  <div className="mt-auto pt-3 border-t border-border/50">
                    <div className="flex flex-wrap gap-1.5">
                      {module.commands.slice(0, 4).map((cmd) => (
                        <span 
                          key={cmd.cmd} 
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-mono"
                        >
                          {cmd.cmd}
                        </span>
                      ))}
                      {module.commands.length > 4 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
                          +{module.commands.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {module.isComingSoon && (
                  <div className="mt-auto pt-3">
                    <span className="text-xs text-primary">
                      Натисни для деталей →
                    </span>
                  </div>
                )}
              </button>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Module Detail Dialog */}
      <Dialog open={!!selectedModule} onOpenChange={() => setSelectedModule(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-card border-border">
          {selectedModule && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center
                    ${selectedModule.isComingSoon ? 'bg-primary/20' : 'bg-primary/10'}`}>
                    <selectedModule.icon className={`w-6 h-6 ${selectedModule.isComingSoon ? 'text-primary animate-pulse' : 'text-primary'}`} />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    {selectedModule.title}
                  </DialogTitle>
                </div>
              </DialogHeader>
              
              <div className="mt-4">
                <p className="text-muted-foreground mb-6">{selectedModule.fullDescription}</p>
                
                {selectedModule.commands.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Команди</h4>
                    <div className="space-y-2">
                      {selectedModule.commands.map((cmd) => (
                        <div 
                          key={cmd.cmd}
                          className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border"
                        >
                          <code className="text-primary font-mono text-sm bg-primary/10 px-2 py-1 rounded shrink-0">
                            {cmd.cmd}
                          </code>
                          <span className="text-muted-foreground text-sm">{cmd.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedModule.videoLink && (
                  <div className="mt-6">
                    <a 
                      href={selectedModule.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-gold-light transition-colors"
                    >
                      📺 Відео-інструкція
                    </a>
                  </div>
                )}
                
                {selectedModule.isComingSoon && (
                  <div className="mt-6">
                    <a 
                      href="https://discord.gg/aWPSsuEzr3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-gold-light transition-colors"
                    >
                      Слідкувати за оновленнями
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Features;
