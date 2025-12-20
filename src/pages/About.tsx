import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import lanicatLogo from "@/assets/lanicat-logo.png";
import { CheckCircle, Zap, Shield, Users, Calendar, Award } from "lucide-react";

const About = () => {
  const features = [
    { icon: Shield, text: "Верифікацію користувачів" },
    { icon: Zap, text: "Інтеграцію зі штучним інтелектом" },
    { icon: Users, text: "Систему авто-ролей" },
    { icon: CheckCircle, text: "Інші інструменти для керування та автоматизації сервера" },
  ];

  const timeline = [
    { date: "Кінець 2023", title: "Початок розробки", description: "Lanicat створювався як експериментальний технічний проєкт для вивчення архітектури Discord-ботів." },
    { date: "Січень 2024", title: "Офіційний запуск", description: "Після активної фази розробки та тестування бот був офіційно запущений." },
    { date: "Весна 2024", title: "75 серверів та верифікація", description: "Lanicat досяг важливої віхи та отримав офіційну верифікацію від Discord." },
    { date: "Сьогодні", title: "Версія 2.0", description: "Стабільний реліз із оптимізованим кодом, покращеною архітектурою та розширеним функціоналом." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 border-b border-border">
        <div className="container px-4">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <img src={lanicatLogo} alt="Lanicat" className="w-10 h-10 rounded-full" />
            <span className="text-xl font-bold text-gradient">Lanicat</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
        <div className="container px-4 relative z-10">
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
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container px-4 max-w-4xl mx-auto">
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Що таке Lanicat?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Lanicat</strong> — це багатофункціональний програмний бот, створений для автоматизації, модерації та розширення можливостей серверів. Проєкт розроблений і підтримується <strong className="text-primary">Kingvlad</strong> з акцентом на стабільність, функціональність і зручність для користувачів.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Lanicat є повністю безкоштовним ботом і з самого початку створювався спеціально для українських спільнот. Основна ідея проєкту — надати українським серверам якісний, сучасний та універсальний інструмент без необхідності використання кількох різних ботів.
            </p>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Можливості бота</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Lanicat — це перший український бот-комбайн для вашого сервера, який поєднує в собі безліч функцій:
            </p>
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Історія розвитку</h2>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-semibold">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Verification */}
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

          {/* Technical */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Технічна реалізація</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              З технічної точки зору Lanicat побудований за модульним принципом, що дозволяє легко масштабувати проєкт, впроваджувати нові можливості та адаптувати бот під різні типи серверів.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Особлива увага приділяється продуктивності, безпеці та коректній обробці подій у реальному часі. За час існування бот пройшов значний шлях — від початкової версії v0.1 Beta до стабільного релізу і поточної v2.0.
            </p>
          </section>

          {/* Future */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Плани на майбутнє</h2>
            <p className="text-muted-foreground leading-relaxed">
              На сьогодні Lanicat є повноцінним технічним проєктом, який продовжує розвиватися, отримувати оновлення та вдосконалюватися з урахуванням потреб спільноти. Цей сайт — офіційна платформа, де користувачі можуть ознайомитися з можливостями Lanicat, історією його розвитку та планами на майбутнє.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center pt-8">
            <a
              href="https://dsc.gg/lanicat"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg 
                         hover:bg-gold-light transition-all duration-300 glow-gold hover:scale-105"
            >
              Додати Lanicat на сервер
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
