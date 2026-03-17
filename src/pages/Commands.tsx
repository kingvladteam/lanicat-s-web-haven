import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Bot, Hammer, Wrench, Heart, CheckCircle, UserPlus, Lock,
  Search, Terminal, Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Command {
  cmd: string;
  desc: string;
  premium?: boolean;
}

interface Category {
  id: string;
  icon: typeof Bot;
  title: string;
  description: string;
  commands: Command[];
}

const categories: Category[] = [
  {
    id: "main",
    icon: Bot,
    title: "Основні",
    description: "Розваги та корисна інформація",
    commands: [
      { cmd: "/anime", desc: "Пошук аніме по назві з детальною інформацією" },
      { cmd: "/ai", desc: "Запитати що-небудь у штучного інтелекту" },
      { cmd: "/texttoimg", desc: "Створює зображення з вашим текстом", premium: true },
      { cmd: "/ball", desc: "Магічний шар — отримай відповідь на своє питання" },
      { cmd: "/cat", desc: "Отримати фото рандомного котика" },
      { cmd: "/number", desc: "Спробуй вгадати загадане число" },
      { cmd: "/serverinfo", desc: "Детальна інформація про поточний сервер" },
      { cmd: "/userinfo", desc: "Інформація про користувача Discord" },
      { cmd: "/botinfo", desc: "Статистика та інформація про бота" },
      { cmd: "/inviteinfo", desc: "Інформація про запрошення на сервер" },
      { cmd: "/premium", desc: "Інформація про Преміум-підписку" },
    ],
  },
  {
    id: "moderation",
    icon: Hammer,
    title: "Модерація",
    description: "Керування сервером для адмінів",
    commands: [
      { cmd: "/ban", desc: "Заблокувати порушника на сервері" },
      { cmd: "/unban", desc: "Розблокувати раніше заблокованого користувача" },
      { cmd: "/kick", desc: "Вигнати порушника з сервера" },
      { cmd: "/mute", desc: "Замʼютити порушника на певний час" },
      { cmd: "/unmute", desc: "Розмʼютити користувача" },
      { cmd: "/clear", desc: "Функціональне видалення великої кількості повідомлень" },
      { cmd: "/slowmode", desc: "Встановити користувацький повільний режим" },
    ],
  },
  {
    id: "utils",
    icon: Wrench,
    title: "Утиліти",
    description: "Корисні інструменти",
    commands: [
      { cmd: "/embedbuilder", desc: "Створіть власне красиве embed-повідомлення" },
      { cmd: "/avatar", desc: "Отримати аватар будь-якого користувача у повному розмірі" },
      { cmd: "/banner", desc: "Отримати банер профілю користувача" },
      { cmd: "/sendfakemessage", desc: "Відправити фейк-повідомлення від імені бота" },
      { cmd: "/addemoji", desc: "Додати нову емоцію на сервер за посиланням" },
      { cmd: "/serverstats", desc: "Premium-статистика по кожному модулю для сервера", premium: true },
    ],
  },
  {
    id: "reactions",
    icon: Heart,
    title: "Реакції",
    description: "Виражайте емоції анімаціями",
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
      { cmd: "/laugh", desc: "Голосно посміятись" },
    ],
  },
  {
    id: "modules",
    icon: CheckCircle,
    title: "Модулі",
    description: "Верифікація, авто-ролі, безпека",
    commands: [
      { cmd: "Верифікація", desc: "Перевірка нових користувачів за допомогою 5-значної капчі" },
      { cmd: "Авто-ролі", desc: "Автоматична видача ролей новим учасникам сервера" },
      { cmd: "Безпека", desc: "Захист від твінк-акаунтів та підозрілих профілів" },
    ],
  },
];

const Commands = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return categories
      .filter((cat) => !activeCategory || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        commands: q
          ? cat.commands.filter(
              (c) =>
                c.cmd.toLowerCase().includes(q) ||
                c.desc.toLowerCase().includes(q)
            )
          : cat.commands,
      }))
      .filter((cat) => cat.commands.length > 0);
  }, [search, activeCategory]);

  const totalCommands = categories.reduce((s, c) => s + c.commands.length, 0);

  return (
    <>
      <Helmet>
        <title>Команди — Lanicat | Повний список команд</title>
        <meta name="description" content="Повний список команд бота Lanicat з описом, категоріями та фільтрацією. Знайдіть потрібну команду за лічені секунди." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="container px-4">
            {/* Hero */}
            <ScrollAnimation>
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
                  <Terminal className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gradient">Команди</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {totalCommands} команд та модулів для вашого сервера
                </p>
              </div>
            </ScrollAnimation>

            {/* Search */}
            <ScrollAnimation delay={100}>
              <div className="max-w-xl mx-auto mb-8">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Пошук команди..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                  />
                </div>
              </div>
            </ScrollAnimation>

            {/* Category tabs */}
            <ScrollAnimation delay={150}>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    !activeCategory
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  )}
                >
                  Усі
                </button>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        activeCategory === cat.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.title}
                    </button>
                  );
                })}
              </div>
            </ScrollAnimation>

            {/* Commands */}
            <div className="max-w-4xl mx-auto space-y-10">
              {filtered.length === 0 && (
                <ScrollAnimation>
                  <div className="text-center py-16">
                    <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">Нічого не знайдено</p>
                    <p className="text-muted-foreground/60 text-sm mt-1">Спробуйте інший запит</p>
                  </div>
                </ScrollAnimation>
              )}

              {filtered.map((cat, ci) => {
                const Icon = cat.icon;
                return (
                  <ScrollAnimation key={cat.id} delay={ci * 100}>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-foreground">{cat.title}</h2>
                          <p className="text-sm text-muted-foreground">{cat.description}</p>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        {cat.commands.map((cmd) => (
                          <div
                            key={cmd.cmd}
                            className="flex items-start gap-3 p-3.5 bg-card/50 rounded-lg border border-border/50 hover:border-primary/20 transition-all group"
                          >
                            <code className="text-primary font-mono text-sm bg-primary/10 px-2.5 py-1 rounded-md shrink-0 group-hover:bg-primary/20 transition-colors">
                              {cmd.cmd}
                            </code>
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                              {cmd.desc}
                            </span>
                            {cmd.premium && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-primary/20 text-primary rounded-md shrink-0">
                                <Crown className="w-3 h-3" />
                                Premium
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Commands;
