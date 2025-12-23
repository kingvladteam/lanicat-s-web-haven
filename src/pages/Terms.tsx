import Header from "@/components/Header";
import Footer from "@/components/Footer";
import lanicatLogo from "@/assets/lanicat-logo.png";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const Terms = () => {
  return (
    <main className="min-h-screen bg-background pt-16">
      <Header />

      {/* Content */}
      <div className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimation>
            <div className="flex items-center gap-4 mb-8">
              <img src={lanicatLogo} alt="Lanicat" className="w-12 h-12 rounded-full" />
              <h1 className="text-3xl md:text-4xl font-bold text-gradient">Умови користування</h1>
            </div>
          </ScrollAnimation>

          <div className="prose prose-invert max-w-none space-y-8">
            <ScrollAnimation delay={100}>
              <p className="text-muted-foreground text-lg">
                Тут відображені умови користування бота Lanicat. 
                Використовуючи Бота, Ви автоматично погоджуєтесь з цими умовами користування.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={150}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Загальні положення</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Бот Lanicat (далі — «Бот») створений для надання корисних та розважальних функцій у межах платформи Discord.</li>
                  <li>Використовуючи Бота, ви погоджуєтесь з цими умовами користування, а також із Правилами користування Discord (Discord TOS).</li>
                  <li>Адміністрація залишає за собою право змінювати ці умови користування з оповіщенням про це на сервері підтримки. Актуальна версія завжди доступна на офіційних ресурсах.</li>
                </ul>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Використання Бота</h2>
                <p className="text-muted-foreground mb-4">Користувачам заборонено:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Використовувати Бота для шкоди іншим користувачам</li>
                  <li>Створювати збої чи перешкоди у його роботі</li>
                  <li>Використовувати баги, експлойти чи вразливості у власних цілях</li>
                  <li>При виявленні багів чи вразливостей користувач зобов'язаний повідомити про це на сервері підтримки</li>
                  <li>Використовувати Бота для поширення образ, дискримінаційного чи образливого контенту, спаму, шахрайства чи іншої незаконної діяльності</li>
                  <li>Використовувати Бота для масового збору чи збереження даних інших користувачів без їхньої згоди</li>
                  <li>Використовувати Бота для імітації або видавання себе за адміністрацію чи офіційну команду Lanicat</li>
                  <li>Використовувати Бота для обходу обмежень Discord або інших технічних правил</li>
                  <li>Використовувати автоматизовані скрипти чи інші сторонні інструменти для примусової взаємодії з Ботом</li>
                  <li>Використовувати Бота для надмірного навантаження на сервери</li>
                  <li>Використовувати Бота для порушення авторських прав чи поширення нелегального контенту</li>
                </ul>
                <div className="mt-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-muted-foreground">
                    У випадку порушення умов користування на вас буде накладено певні обмеження або блокування. 
                    Адміністрація не зобов'язана пояснювати причину застосованого обмеження або блокування.
                  </p>
                </div>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={250}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Lanicat Premium</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Підписка є добровільною і надає доступ до додаткових функцій</li>
                  <li>Оформивши підписку, користувач має розуміти, що послуга надана тільки на 1 календарний місяць з дня покупки</li>
                  <li>Повернення коштів за послугу ніяк неможливе</li>
                  <li>Адміністрація боту залишає за собою право відкликати Lanicat Premium без компенсації вартості послуги у випадку порушення умов використання або Discord TOS</li>
                </ul>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Відповідальність</h2>
                <p className="text-muted-foreground mb-4">
                  Бот надається «як є» (AS IS) без будь-яких прямих чи непрямих гарантій.
                </p>
                <p className="text-muted-foreground mb-4">
                  Ми не гарантуємо, що робота Бота буде безперервною, безпомилковою чи завжди доступною.
                </p>
                <p className="text-muted-foreground mb-2">Адміністрація не несе відповідальності за:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Дії користувачів, які порушують ці умови або правила Discord</li>
                  <li>Будь-які прямі чи непрямі збитки, завдані внаслідок використання або неможливості використання Бота</li>
                  <li>Втрату даних, пошкодження пристроїв або перебої у роботі серверів</li>
                  <li>Роботу сторонніх сервісів та ресурсів, з якими може взаємодіяти Бот</li>
                  <li>Можливі збої чи проблеми, викликані оновленнями Discord API або інших залежних платформ</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Користувач самостійно несе відповідальність за будь-який контент, який він поширює чи створює з використанням Бота.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Адміністрація залишає за собою право тимчасово або постійно припинити роботу Бота без попереднього повідомлення та без відшкодування будь-яких збитків.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={350}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Зовнішні ресурси</h2>
                <p className="text-muted-foreground">
                  Бот або сайт можуть містити посилання на сторонні ресурси. 
                  Ми не контролюємо зміст цих сайтів і не несемо відповідальності за їхню політику конфіденційності.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={400}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Контакти</h2>
                <p className="text-muted-foreground">
                  З усіх питань звертайтесь на наш офіційний сервер підтримки.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={450}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Дата набрання чинності</h2>
                <p className="text-muted-foreground">
                  Редакція умов користування набирає чинності одразу після публікації. 
                  Дату оновлення можна знайти в нижній частині даної сторінки.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={500}>
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Оновлення умов користування</h2>
                <p className="text-muted-foreground mb-2">
                  Ми можемо час від часу змінювати або оновлювати ці умови користування, 
                  щоб відобразити зміни у роботі Бота, законодавстві чи вимогах безпеки.
                </p>
                <p className="text-muted-foreground mb-2">
                  У разі зміни умов користування, користувачів буде додатково повідомлено на сервері підтримки.
                </p>
                <p className="text-muted-foreground">
                  Користувачі будуть вважатися такими, що погодилися з новою редакцією умов користування 
                  з моменту продовження використання Бота після їх публікації.
                </p>
              </section>
            </ScrollAnimation>

            <ScrollAnimation delay={550}>
              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-foreground font-medium">
                  Ця редакція умов користування дійсна з 05.09.2025.
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

export default Terms;
