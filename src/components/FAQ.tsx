import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { HelpCircle, Crown, Terminal, Shield, Cpu, Database, Settings, Search, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

const faqCategories = [
  {
    id: "general",
    title: "Загальні питання",
    icon: HelpCircle,
    questions: [
      { q: "Що таке Lanicat?", a: "Lanicat — це бот для Discord з розважальними та корисними функціями для серверів." },
      { q: "На яких платформах працює Бот?", a: "Тільки на Discord." },
      { q: "Чи безкоштовний Бот?", a: "Базовий функціонал безкоштовний. Додаткові функції доступні через Lanicat Premium." },
      { q: "Чи потрібна реєстрація?", a: "Ні, достатньо мати акаунт у Discord та додати Бота на сервер." },
      { q: "Чи підтримується мультисерверне використання?", a: "Так, один Бот може працювати на кількох серверах одночасно." },
      { q: "Чи є обмеження на кількість команд за день?", a: "Базові команди не мають жорстких обмежень, але надмірне навантаження може тимчасово обмежити доступ." },
      { q: "Чи можна використовувати Бота на мобільному Discord?", a: "Так, усі команди працюють на мобільних пристроях." },
      { q: 'Як дізнатися статус Бота?', a: 'На сервері підтримки у каналі "статус".' },
    ],
  },
  {
    id: "premium",
    title: "Питання про Premium",
    icon: Crown,
    questions: [
      { q: "Що дає підписка Lanicat Premium?", a: "Додаткові функції, прискорена робота команд, вимкнення затримок на командах, унікальні налаштування та бонуси. (Більше деталей /premium)" },
      { q: "Як оформити підписку?", a: "Через команду /premium." },
      { q: "Скільки часу діє підписка?", a: "1 календарний місяць з дати покупки." },
      { q: "Чи можна повернути гроші за Premium?", a: "Ні, оплата остаточна." },
      { q: "Що робити, якщо Premium-функції не працюють?", a: "Зверніться на сервер підтримки." },
      { q: "Чи можна передавати доступ до Premium іншому користувачу?", a: "Ні, підписка особиста." },
      { q: "Чи будуть додані нові функції в Premium?", a: "Так, адміністрація регулярно оновлює функції." },
      { q: "Чи можна оформити Premium на декілька серверів одночасно?", a: "Підписка прив'язана до акаунта, не до одного сервера." },
      { q: "Що робити, якщо спробував обійти систему Premium?", a: "Адміністрація може заблокувати доступ без повернення коштів." },
    ],
  },
  {
    id: "commands",
    title: "Команди та використання",
    icon: Terminal,
    questions: [
      { q: "Які основні команди у Бота?", a: "Список команд можна отримати через /help." },
      { q: "Чому Бот не відповідає на команду?", a: "Можливо тимчасові технічні проблеми або відсутність прав доступу. Зверніться на сервер підтримки." },
      { q: "Як перевірити права Бота на сервері?", a: "Через налаштування ролей Discord, Бот повинен мати достатньо прав." },
      { q: "Чи можна створювати власні команди?", a: "Ні, поки що Бот підтримує тільки стандартні команди від адміністрації." },
      { q: "Що робити при помилці виконання команди?", a: "Перевірте правильність команди та зверніться на сервер підтримки, якщо помилка повторюється." },
      { q: "Чи можна використовувати Бота для автоматизації?", a: "Лише через дозволені команди, сторонні скрипти заборонені." },
      { q: "Чи можна змінювати зовнішній вигляд повідомлень Бота?", a: "Частково — через доступні налаштування та модулі, повний контроль заборонений." },
      { q: "Чи можна обмежити Бота тільки для певних каналів?", a: "Так, через налаштування дозволів сервера Discord. Налаштування сервера ⇨ Інтеграції ⇨ Lanicat ⇨ Команди" },
    ],
  },
  {
    id: "security",
    title: "Безпека та обмеження",
    icon: Shield,
    questions: [
      { q: "Чи можуть мене заблокувати за використання Бота?", a: "Ні. Блокування відбувається лише за порушення правил." },
      { q: "Чи пояснюють причину блокування?", a: "Ні, адміністрація не зобов'язана пояснювати." },
      { q: "Що робити, якщо блокування помилкове?", a: "Зверніться на сервер підтримки, але гарантії розблокування немає." },
      { q: "Чи зберігає Бот особисті повідомлення?", a: "Ні, приватні повідомлення не зберігаються." },
      { q: "Чи можна обійти обмеження Бота?", a: "Заборонено, за це можна отримати блокування." },
      { q: "Чи збираються IP-адреси користувачів?", a: "Ні." },
      { q: "Чи можна використовувати Бота для шкоди іншим?", a: "Ні, це порушує правила і призводить до блокування." },
      { q: "Чи можна використовувати баги у власних цілях?", a: "Заборонено, за це Бот може обмежити доступ." },
      { q: "Чи можна використовувати Бота для спаму чи шахрайства?", a: "Заборонено." },
      { q: "Чи можна обмежити функції Бота для певних користувачів?", a: "Так, через налаштування дозволів сервера Discord. Налаштування сервера ⇨ Інтеграції ⇨ Lanicat ⇨ Команди" },
    ],
  },
  {
    id: "technical",
    title: "Технічні питання",
    icon: Cpu,
    questions: [
      { q: "Чому іноді виникають тимчасові затримки у роботі Бота?", a: "Можливо, тимчасове навантаження на сервер або Discord API." },
      { q: "Чи можна дізнатися точний uptime Бота?", a: "Ні, це конфіденційна інформація, що доступна тільки розробнику." },
      { q: "Lanicat Open Source проєкт?", a: "Ні, доступ до коду закритий." },
      { q: "Як часто оновлюється Бот?", a: "Адміністрація додає нові функції та виправляє баги регулярно." },
      { q: "Чи можна використовувати сторонні скрипти з Ботом?", a: "Заборонено, це порушує правила." },
      { q: "Як Бот взаємодіє з Discord API?", a: "Технічні деталі не розкриваються." },
      { q: "Якою мовою програмування написаний бот?", a: "Lanicat написаний на Python з використанням бібліотеки discord.py, що дозволяє йому взаємодіяти з Discord та виконувати команди швидко та надійно." },
      { q: "На якому хостингу працює Lanicat?", a: "Для забезпечення стабільної роботи та доступності Бота ми використовуємо надійні серверні рішення. Технічні деталі хостингу не розкриваються, але ви можете бути впевнені в стабільній роботі Lanicat 24/7." },
    ],
  },
  {
    id: "data",
    title: "Питання про дані",
    icon: Database,
    questions: [
      { q: "Які дані збирає Бот?", a: "Ідентифікатори користувачів Discord. Дані про сервер (назва, ID, ID ролей, ID власника сервера), необхідні для роботи функцій. Ваш ID. Технічні дані для забезпечення стабільності Бота." },
      { q: "Чи зберігаються приватні повідомлення?", a: "Ні." },
      { q: "Чи передаються дані третім особам?", a: "Тільки у випадках, передбачених законодавством." },
      { q: "Як видалити свої дані з Бота?", a: "Зверніться на сервер підтримки." },
      { q: "Скільки часу зберігаються дані?", a: "Лише стільки, скільки потрібно для роботи функцій Бота." },
      { q: "Чи можна відмовитись від надання даних?", a: "Так, але деякі функції Бота стануть недоступні." },
      { q: "Чи можна дізнатися, що саме Бот знає про мене?", a: "Так, зверніться на сервер підтримки." },
    ],
  },
  {
    id: "modules",
    title: "Налаштування модулів",
    icon: Settings,
    questions: [
      { q: "Як налаштувати модулі Бота?", a: "Налаштування доступне через: /help." },
      { q: "Як налаштувати модуль верифікації?", a: "Перегляньте відео-інструкцію: https://www.youtube.com/watch?v=7JKfxAkXnnw" },
      { q: "Як налаштувати модуль авторолей?", a: "Перегляньте відео-інструкцію: https://www.youtube.com/watch?v=heB_cfIpViw" },
      { q: "Чи можна вимкнути модулі після увімкнення?", a: "Так, модулі можна вимкнути через меню налаштування. Після вимкнення дані (ID ролей, каналів) стираються." },
      { q: "Де шукати допомогу з налаштування модулів?", a: "Зверніться на сервер підтримки Lanicat. Там можна отримати покрокову допомогу та відповіді на додаткові питання." },
      { q: "Як працює модуль безпеки?", a: "Модуль безпеки автоматично перевіряє нових користувачів, які приєднуються до сервера. Якщо акаунт користувача підозрілий або був створений в той же день коли і приєднався, Бот може автоматично заблокувати або забанити такого користувача. Це допомагає запобігти спаму, фейковим акаунтам та потенційно небезпечним учасникам." },
    ],
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiAsked, setAiAsked] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;

    const query = searchQuery.toLowerCase();
    return faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (item) =>
            item.q.toLowerCase().includes(query) ||
            item.a.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [searchQuery]);

  const totalResults = filteredCategories.reduce((sum, c) => sum + c.questions.length, 0);
  const hasResults = totalResults > 0;
  const showAiSection = searchQuery.trim().length > 2 && !hasResults;

  const askAi = async () => {
    setAiLoading(true);
    setAiError("");
    setAiAnswer("");
    setAiAsked(true);

    try {
      const { data, error } = await supabase.functions.invoke("faq-ai", {
        body: { question: searchQuery },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setAiAnswer(data.answer);
    } catch (e: any) {
      setAiError(e.message || "Не вдалося отримати відповідь");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container px-4">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">FAQ</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Часті запитання про бота Lanicat
            </p>
          </div>
        </ScrollAnimation>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Пошук питань..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setAiAsked(false);
                setAiAnswer("");
                setAiError("");
              }}
              className="pl-12 h-12 text-base bg-card border-border rounded-xl"
            />
          </div>
          {searchQuery.trim() && hasResults && (
            <p className="text-sm text-muted-foreground mt-2 ml-1">
              Знайдено {totalResults} {totalResults === 1 ? "результат" : totalResults < 5 ? "результати" : "результатів"}
            </p>
          )}
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredCategories.map((category, index) => (
            <ScrollAnimation key={category.id} delay={index * 100}>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`${category.id}-${qIndex}`} className="border-border/50">
                      <AccordionTrigger className="text-left text-foreground hover:text-primary">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollAnimation>
          ))}

          {/* AI Section */}
          {showAiSection && (
            <ScrollAnimation>
              <div className="bg-card rounded-xl border border-primary/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Lanicat AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <AlertTriangle className="w-3 h-3 text-destructive" />
                      <p className="text-xs text-muted-foreground">
                        Експериментальна функція — може помилятись. Найкраща допомога на{" "}
                        <a
                          href="https://discord.gg/lanicat"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          сервері підтримки
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {!aiAsked && (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">
                      Не знайшли відповідь? Запитайте у Lanicat AI
                    </p>
                    <button
                      onClick={askAi}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Запитати AI
                    </button>
                  </div>
                )}

                {aiLoading && (
                  <div className="flex items-center justify-center gap-3 py-6">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="text-muted-foreground">Lanicat AI думає...</span>
                  </div>
                )}

                {aiAnswer && (
                  <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                    <div className="prose prose-sm prose-invert max-w-none text-foreground">
                      <ReactMarkdown>{aiAnswer}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {aiError && (
                  <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
                    <p className="text-sm text-destructive">{aiError}</p>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
