export const BASE_URL = "https://lanicat.pp.ua";

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  changefreq: ChangeFrequency;
  priority: string;
  structuredData?: Record<string, unknown>;
}

export const seoRoutes: SeoRoute[] = [
  {
    path: "/",
    title: "Lanicat — Український Discord-бот",
    description: "Український Discord-бот із десятками функцій для адміністрування, автоматизації та розвитку вашого сервера.",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/about",
    title: "Про Lanicat — Український Discord-бот від kingvlad",
    description: "Історія та можливості українського Discord-бота Lanicat, створеного розробником kingvlad: від v0.1 Beta до v2.1, верифікація Discord і плани розвитку.",
    changefreq: "monthly",
    priority: "0.8",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${BASE_URL}/about#webpage`,
      url: `${BASE_URL}/about`,
      name: "Про Lanicat — Український Discord-бот від kingvlad",
      description: "Сторінка про створений розробником kingvlad український Discord-бот Lanicat, його історію та можливості.",
      inLanguage: "uk-UA",
      about: { "@id": `${BASE_URL}/#software` },
      mainEntity: { "@id": `${BASE_URL}/#software` },
    },
  },
  {
    path: "/premium",
    title: "Lanicat Premium — Підтримка проєкту",
    description: "Підтримайте проєкт Lanicat та отримайте ексклюзивні бонуси: без реклами, без затримок, пріоритетна підтримка та унікальні ролі.",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/faq",
    title: "FAQ — Питання та відповіді про Lanicat",
    description: "Відповіді на поширені запитання про команди, модулі, налаштування, Premium і можливості українського Discord-бота Lanicat.",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/documentation",
    title: "Документація та команди — Lanicat",
    description: "Повна документація Lanicat: модулі, команди, аргументи, приклади використання та налаштування функцій для вашого Discord-сервера.",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/embed",
    title: "Embed Builder — Lanicat",
    description: "Створюйте ембеди для Discord із зображеннями, Markdown і попереднім переглядом, копіюйте JSON або надсилайте їх через вебхук.",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/privacy",
    title: "Політика конфіденційності — Lanicat",
    description: "Політика конфіденційності Lanicat: які дані Discord-бот збирає, як використовує та захищає їх і як користувачі можуть керувати своїми даними.",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/terms",
    title: "Умови користування — Lanicat",
    description: "Умови користування Discord-ботом Lanicat: правила використання, обмеження відповідальності та умови підписки Lanicat Premium.",
    changefreq: "yearly",
    priority: "0.3",
  },
];
