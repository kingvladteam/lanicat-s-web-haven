import Header from "@/components/Header";
import Footer from "@/components/Footer";
import lanicatLogo from "@/assets/lanicat-logo.png";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background pt-16">
      <Header />

      {/* Content */}
      <div className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimation>
            <div className="flex items-center gap-4 mb-8">
              <img src={lanicatLogo} alt="Lanicat" className="w-12 h-12 rounded-full" />
              <h1 className="text-3xl md:text-4xl font-bold text-gradient">Політика конфіденційності</h1>
            </div>
          </ScrollAnimation>

          <div className="prose prose-invert max-w-none space-y-8">
            <ScrollAnimation delay={100}>
              <p className="text-muted-foreground text-lg">
                Тут відображена політика конфіденційності бота Lanicat (Далі - Бота). 
                Використовуючи Бота, Ви автоматично погоджуєтесь з цією політикою конфіденційності.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={150}>
              <p className="text-muted-foreground">
                Ваша конфіденційність є дуже важливою для нас. Ця політика конфіденційності описує всі 
                персональні дані, які збираються та обробляються нашим проєктом, а також іншими нашими ресурсами.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Які дані ми збираємо</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Ідентифікатори користувачів Discord</li>
                  <li>Дані про сервер (назва, ID, ID ролей, ID власника сервера), необхідні для роботи функцій</li>
                  <li>Ваш ID</li>
                  <li>Технічні дані для забезпечення стабільності Бота</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Ми не збираємо паролі чи чутливу особисту інформацію.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={250}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Як ми використовуємо дані</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Для роботи та покращення функціоналу Бота</li>
                  <li>Для підтримки стабільності та безпеки</li>
                  <li>Для надання преміум-функцій (якщо користувач оформив підписку)</li>
                </ul>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Зберігання даних</h2>
                <p className="text-muted-foreground">
                  Дані зберігаються лише протягом часу, потрібного для роботи функцій. Після цього вони можуть бути видалені.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={350}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Передача даних третім сторонам</h2>
                <p className="text-muted-foreground mb-2">
                  Ми не передаємо ваші дані стороннім особам, крім випадків, передбачених законом.
                </p>
                <p className="text-muted-foreground">
                  Ми можемо використовувати зовнішні сервіси (наприклад, Discord API, OpenAI), 
                  але вони регулюються власною політикою конфіденційності.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={400}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Ваші права</h2>
                <p className="text-muted-foreground mb-2">Ви маєте право:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Запросити видалення всіх даних про ваш сервер</li>
                  <li>Відмовитись від надання даних, розуміючи, що деякі функції стануть недоступними</li>
                </ul>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={450}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Захист даних</h2>
                <p className="text-muted-foreground mb-2">
                  Ми використовуємо комерційно прийнятні методи для захисту ваших даних від:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Несанкціонованого доступу</li>
                  <li>Розголошення</li>
                  <li>Копіювання чи зміни</li>
                </ul>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={500}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Зовнішні посилання</h2>
                <p className="text-muted-foreground">
                  Наш сайт або ресурси можуть містити посилання на сторонні сайти. 
                  Ми не несемо відповідальності за їх вміст та їхню політику конфіденційності.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={550}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Контакти</h2>
                <p className="text-muted-foreground">
                  Якщо у вас є питання щодо обробки даних — звертайтесь на наш сервер підтримки.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={600}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Дата набрання чинності</h2>
                <p className="text-muted-foreground">
                  Редакція політики конфіденційності набирає чинності одразу після публікації. 
                  Дату оновлення можна знайти в нижній частині даної сторінки.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={650}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">10. Оновлення політики</h2>
                <p className="text-muted-foreground mb-2">
                  Ми можемо час від часу змінювати або оновлювати цю політику конфіденційності, 
                  щоб відобразити зміни у роботі Бота, законодавстві чи вимогах безпеки.
                </p>
                <p className="text-muted-foreground mb-2">
                  У разі зміни політики конфіденційності, користувачів буде додатково повідомлено на сервері підтримки.
                </p>
                <p className="text-muted-foreground">
                  Користувачі будуть вважатися такими, що погодилися з новою редакцією політики конфіденційності 
                  з моменту продовження використання Бота після її публікації.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={700}>
              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-foreground font-medium">
                  Ця редакція політики конфіденційності дійсна з 05.09.2025.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
