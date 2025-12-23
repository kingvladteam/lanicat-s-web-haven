import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Crown, Zap, Shield, Star, MessageCircle, Clock } from "lucide-react";
import lanicatLogo from "@/assets/lanicat-logo.png";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
const Premium = () => {
  const benefits = [{
    icon: Crown,
    title: "Ексклюзивна роль",
    description: "Отримайте унікальну роль на сервері підтримки, яка виділить вас серед інших користувачів"
  }, {
    icon: Star,
    title: "Ексклюзивний бейдж",
    description: "Особливий бейдж передплатника відображається у команді /userinfo"
  }, {
    icon: Shield,
    title: "Без реклами",
    description: "Повне відключення всієї реклами для комфортного використання бота"
  }, {
    icon: Zap,
    title: "Без затримок",
    description: "Імунітет до всіх затримок на командах — миттєве виконання"
  }, {
    icon: MessageCircle,
    title: "Пріоритетна підтримка",
    description: "Ваші звернення обробляються в першу чергу на сервері підтримки"
  }, {
    icon: Clock,
    title: "Premium-статистика",
    description: "Доступ до команди /serverstats з детальною статистикою по модулях сервера"
  }];
  return <>
      <Helmet>
        <title>Lanicat Premium - Підтримка проєкту</title>
        <meta name="description" content="Підтримайте проєкт Lanicat та отримайте ексклюзивні бонуси: без реклами, без затримок, пріоритетна підтримка та унікальні ролі." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container px-4">
            {/* Hero Section */}
            <ScrollAnimation>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
                  <img src={lanicatLogo} alt="Lanicat Premium" className="w-14 h-14 rounded-full" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Crown className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-bold text-gradient">Lanicat Premium</h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Підтримка проєкту
                </p>
              </div>
            </ScrollAnimation>

            {/* Thank You Message */}
            <ScrollAnimation delay={100}>
              <div className="max-w-3xl mx-auto mb-16">
                <div className="glass-card rounded-2xl p-8 text-center">
                  <p className="text-lg text-foreground mb-4">
                    Ми дякуємо Вам, що обрали <span className="text-primary font-semibold">Lanicat</span>!
                  </p>
                  <p className="text-muted-foreground">
                    Якщо у вас є бажання підтримати проєкт матеріально та отримати за це невеликі бонуси — 
                    Ви можете оформити підписку <span className="text-primary font-semibold">Lanicat Premium</span>
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            {/* Pricing Card */}
            <ScrollAnimation delay={200}>
              <div className="max-w-md mx-auto mb-16">
                <div className="relative glass-card rounded-2xl p-8 border-2 border-primary/50 overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Premium
                  </div>
                  <div className="text-center">
                    <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">Lanicat Premium</h2>
                    <div className="flex items-baseline justify-center gap-1 mb-6">
                      <span className="text-5xl font-bold text-primary">100</span>
                      <span className="text-2xl text-primary">₴</span>
                      <span className="text-muted-foreground">/місяць</span>
                    </div>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors" href="https://dsc.gg/lanicat">
                      <Crown className="w-5 h-5" />
                      Оформити підписку
                    </a>
                    <p className="text-sm text-muted-foreground mt-4">Оформлення через команду /premium у Discord</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Benefits Grid */}
            <ScrollAnimation delay={300}>
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-foreground mb-8">
                  Бонуси та можливості
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => <ScrollAnimation key={index} delay={400 + index * 100}>
                      <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-colors h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <benefit.icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </ScrollAnimation>)}
                </div>
              </div>
            </ScrollAnimation>

            {/* CTA Section */}
            <ScrollAnimation delay={700}>
              <div className="max-w-3xl mx-auto mt-16 text-center">
                <div className="glass-card rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Готові підтримати проєкт?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Приєднуйтесь до нашого сервера підтримки в Discord для відповіді на усі ваші запитання
                  </p>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors" href=" https://discord.gg/aWPSsuEzr3">
                    <MessageCircle className="w-5 h-5" />
                    Перейти на сервер підтримки    
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </main>

        <Footer />
      </div>
    </>;
};
export default Premium;