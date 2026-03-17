import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { Sparkles, Bug, Zap, ArrowUp, Star, Rocket } from "lucide-react";

const typeConfig = {
  feature: { icon: Sparkles, label: "Нова функція", color: "bg-emerald-500/20 text-emerald-400" },
  fix: { icon: Bug, label: "Виправлення", color: "bg-red-500/20 text-red-400" },
  improvement: { icon: Zap, label: "Покращення", color: "bg-sky-500/20 text-sky-400" },
  update: { icon: ArrowUp, label: "Оновлення", color: "bg-primary/20 text-primary" },
  milestone: { icon: Star, label: "Досягнення", color: "bg-amber-500/20 text-amber-400" },
};

type ChangeType = keyof typeof typeConfig;

interface Change {
  type: ChangeType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  title: string;
  highlight?: boolean;
  changes: Change[];
}

const releases: Release[] = [
  {
    version: "2.0.0",
    date: "2025",
    title: "Великий реліз — повний перезапуск",
    highlight: true,
    changes: [
      { type: "update", text: "Повний рефакторинг коду бота та оптимізація архітектури" },
      { type: "feature", text: "Оновлена система верифікації з 5-значною капчею" },
      { type: "feature", text: "Інтеграція зі штучним інтелектом — команда /ai" },
      { type: "feature", text: "Lanicat Premium — підписка з ексклюзивними бонусами" },
      { type: "improvement", text: "Покращена продуктивність та стабільність на великих серверах" },
      { type: "feature", text: "Новий офіційний вебсайт lanicat.lovable.app" },
    ],
  },
  {
    version: "1.5.0",
    date: "Весна 2024",
    title: "Верифікація Discord та розширення",
    changes: [
      { type: "milestone", text: "Отримання офіційної верифікації від Discord" },
      { type: "milestone", text: "Досягнення 75+ серверів" },
      { type: "feature", text: "Модуль безпеки — захист від твінк-акаунтів" },
      { type: "improvement", text: "Оптимізація обробки подій у реальному часі" },
    ],
  },
  {
    version: "1.0.0",
    date: "Січень 2024",
    title: "Офіційний запуск",
    changes: [
      { type: "update", text: "Перший стабільний реліз бота" },
      { type: "feature", text: "Модуль модерації — ban, kick, mute, clear" },
      { type: "feature", text: "Модуль реакцій — hug, pat, kiss та інші" },
      { type: "feature", text: "Утиліти — embedbuilder, avatar, banner" },
      { type: "feature", text: "Система авто-ролей для нових учасників" },
    ],
  },
  {
    version: "0.1.0",
    date: "Кінець 2023",
    title: "Початок розробки",
    changes: [
      { type: "update", text: "Перша бета-версія бота для тестування" },
      { type: "feature", text: "Базові команди та архітектура модулів" },
    ],
  },
];

const Changelog = () => {
  return (
    <>
      <Helmet>
        <title>Changelog — Lanicat | Історія оновлень</title>
        <meta name="description" content="Дізнайтесь про всі оновлення, нові функції та виправлення бота Lanicat. Повна історія розвитку проєкту." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="container px-4">
            {/* Hero */}
            <ScrollAnimation>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gradient">Changelog</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Історія оновлень та розвитку Lanicat
                </p>
              </div>
            </ScrollAnimation>

            {/* Timeline */}
            <div className="max-w-3xl mx-auto relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

              <div className="space-y-12">
                {releases.map((release, ri) => (
                  <ScrollAnimation key={release.version} delay={ri * 150}>
                    <div className="relative pl-12 md:pl-20">
                      {/* Dot on timeline */}
                      <div className={`absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full border-2 ${
                        release.highlight
                          ? "bg-primary border-primary shadow-[0_0_12px_hsl(43_70%_50%/0.6)]"
                          : "bg-card border-primary/50"
                      }`} />

                      {/* Version badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`text-sm font-mono font-bold px-3 py-1 rounded-lg ${
                          release.highlight
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          v{release.version}
                        </span>
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                        {release.title}
                      </h2>

                      {/* Changes */}
                      <div className="space-y-2">
                        {release.changes.map((change, ci) => {
                          const config = typeConfig[change.type];
                          const Icon = config.icon;
                          return (
                            <div
                              key={ci}
                              className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/20 transition-colors group"
                            >
                              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md shrink-0 ${config.color}`}>
                                <Icon className="w-3.5 h-3.5" />
                                {config.label}
                              </span>
                              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                {change.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Changelog;
