import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import lanicatLogo from "@/assets/lanicat-logo.png";
import { CheckCircle, Zap, Shield, Users, Calendar, Award } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const About = () => {
  const features = [
    { icon: Shield, text: "Верифікацію користувачів" },
    { icon: Zap, text: "Інтеграцію зі штучним інтелектом" },
    { icon: Users, text: "Систему авто-ролей" },
    { icon: CheckCircle, text: "Інші інструменти для керування та автоматизації сервера" }
  ];

  const timeline = [
    { date: "Кінець 2023", title: "Початок розробки", description: "Lanicat створювався як експериментальний технічний проєкт для вивчення архітектури Discord-ботів." },
    { date: "22.01.2024", title: "v0.1 Beta", description: "Перша публічна бета-версія бота." },
    { date: "23.01.2024", title: "v0.2 Beta", description: "Швидкі виправлення та доопрацювання бета-версії." },
    { date: "24.01.2024", title: "v1.0", description: "Офіційний запуск — перший стабільний реліз Lanicat." },
    { date: "27.01.2024", title: "v1.1", description: "Перші покращення після запуску." },
    { date: "29.01.2024", title: "v1.2", description: "Нові можливості та виправлення помилок." },
    { date: "03.02.2024", title: "v1.3", description: "Розширення функціоналу модулів." },
    { date: "09.02.2024", title: "v1.4", description: "Оптимізація та стабільність." },
    { date: "25.02.2024", title: "v1.5", description: "Нові команди та покращення." },
    { date: "10.03.2024", title: "v1.6", description: "Подальший розвиток функціоналу." },
    { date: "Весна 2024", title: "75 серверів та верифікація", description: "Lanicat досяг важливої віхи та отримав офіційну верифікацію від Discord." },
    { date: "25.05.2024", title: "v1.7", description: "Оновлення модулів і виправлення." },
    { date: "26.05.2024", title: "v1.8", description: "Швидке оновлення слідом за v1.7." },
    { date: "18.05.2025", title: "v1.9", description: "Велике оновлення після тривалої паузи." },
    { date: "01.01.2026", title: "v2.0 — Довгоочікувана", description: "Оптимізований код, покращена архітектура та розширений функціонал." },
    { date: "21.11.2026", title: "v2.1", description: "Вебконструктор Embed, повернення Lanicat AI, вибір ролей і каналів зі списків, автоматичне повідомлення верифікації, оновлені /help і модерація, нові Premium-можливості та реакції /cry і /shy." }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
        <div className="container px-4 relative z-10">
          <ScrollAnimation>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl scale-110" />
                <img src={lanicatLogo} alt="Lanicat Logo" className="relative w-32 h-32 rounded-full object-cover glow-gold" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-gradient">Про бота Lanicat</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Перший український бот-комбайн для вашого сервера
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container px-4 max-w-4xl mx-auto">
          {/* About Section */}
          <ScrollAnimation>
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Що таке Lanicat?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Lanicat</strong> — це багатофункціональний програмний бот, створений для автоматизації, модерації та розширення можливостей серверів. Проєкт розроблений і підтримується <strong className="text-primary">Kingvlad</strong> з акцентом на стабільність, функціональність і зручність для користувачів.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Lanicat є безкоштовним ботом і з самого початку створювався спеціально для українських спільнот. Основна ідея проєкту — надати українським серверам якісний, сучасний та універсальний інструмент без необхідності використання кількох різних ботів.
              </p>
            </section>
          </ScrollAnimation>

          {/* Features */}
          <ScrollAnimation>
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Можливості бота</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Lanicat — це перший український бот-комбайн для вашого сервера, який поєднує в собі безліч функцій:
              </p>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <ScrollAnimation key={index} delay={index * 100}>
                    <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature.text}</span>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </section>
          </ScrollAnimation>

          {/* Timeline */}
          <ScrollAnimation>
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Історія розвитку</h2>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <ScrollAnimation key={index} delay={index * 150}>
                    <div className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-semibold">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </section>
          </ScrollAnimation>

          {/* Verification */}
          <ScrollAnimation>
            <section className="mb-16">
              <div className="p-6 bg-card rounded-xl border border-primary/30 flex items-start gap-4">
                <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Офіційна верифікація Discord</h3>
                  <p className="text-muted-foreground">
                    Lanicat отримав офіційну верифікацію від Discord (верифікаційну галочку), що підтверджує його надійність, відповідність вимогам платформи та довіру з боку Discord.
                  </p>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* Technical */}
          <ScrollAnimation>
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Технічна реалізація</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                З технічної точки зору Lanicat побудований за модульним принципом, що дозволяє легко масштабувати проєкт, впроваджувати нові можливості та адаптувати бот під різні типи серверів.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Особлива увага приділяється продуктивності, безпеці та коректній обробці подій у реальному часі. За час існування бот пройшов значний шлях — від початкової версії v0.1 Beta до стабільного релізу і поточної v2.1.
              </p>
            </section>
          </ScrollAnimation>

          {/* Future */}
          <ScrollAnimation>
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Плани на майбутнє</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Lanicat не стоїть на місці. З виходом v2.1 ми зробили великий крок уперед, але це лише початок. Ми і далі розвиватимемо бота: додаватимемо нові модулі та команди, покращуватимемо вже наявні функції, робитимемо налаштування ще простішими та зручнішими.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Наш пріоритет — стабільність, швидкість і безпека. Ми продовжимо оптимізувати роботу бота, стежити за оновленнями Discord API та впроваджувати сучасні технології, щоб Lanicat залишався надійним помічником для кожного сервера.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Найголовніше — ми прислухаємося до спільноти. Кожна ідея, відгук чи повідомлення про помилку допомагають робити Lanicat кращим. Разом ми будуємо найкращий український бот для Discord. Слава Україні!
              </p>
            </section>
          </ScrollAnimation>

          {/* CTA */}
          <ScrollAnimation>
            <div className="text-center pt-8">
              <Link
                to="/add"
                className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg 
                           hover:bg-gold-light transition-all duration-300 glow-gold hover:scale-105"
              >
                Додати Lanicat на сервер
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
