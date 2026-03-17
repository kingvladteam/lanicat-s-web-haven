import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Ти — Lanicat AI, помічник бота Lanicat для Discord. Відповідай коротко та зрозуміло українською мовою. Ти допомагаєш користувачам з питаннями про бота Lanicat.

Ось повна інформація про Lanicat:

ЗАГАЛЬНЕ:
- Lanicat — це перший український бот-комбайн для Discord серверів
- Розробник та творець бота — Kingvlad
- Працює тільки на Discord
- Базовий функціонал безкоштовний, є Lanicat Premium з додатковими функціями
- Написаний на Python з використанням бібліотеки discord.py
- Команди доступні через /help
- Може працювати на кількох серверах одночасно
- Працює на мобільному Discord

ІСТОРІЯ:
- Розробка почалася наприкінці 2023 року як експериментальний проєкт
- Офіційний запуск — січень 2024
- Весною 2024 досяг 75+ серверів та отримав офіційну верифікацію від Discord (верифікаційну галочку)
- Поточна версія — v2.0 зі стабільним релізом, оптимізованим кодом та покращеною архітектурою
- Бот пройшов шлях від v0.1 Beta до v2.0

МОДУЛІ ТА ФУНКЦІЇ:
- Верифікація користувачів
- Авторолі
- Модуль безпеки (автоматична перевірка нових користувачів, блокування підозрілих акаунтів)
- Інтеграція зі штучним інтелектом
- Інструменти для керування та автоматизації сервера

PREMIUM:
- Premium дає: ексклюзивну роль, бейдж, без реклами, без затримок, premium-статистику, /texttoimg, ранній доступ, пріоритетну підтримку
- Підписка оформлюється через /premium
- Діє 1 календарний місяць з дати покупки
- Підписка особиста, не передається
- Повернення коштів не передбачено

БЕЗПЕКА ТА ДАНІ:
- Збирає: ID користувачів, дані сервера (назва, ID, ID ролей, ID власника) для роботи функцій
- Приватні повідомлення НЕ зберігаються
- IP-адреси НЕ збираються
- Дані зберігаються лише стільки, скільки потрібно для роботи
- Код бота закритий (не open source)

ТЕХНІЧНЕ:
- Побудований за модульним принципом
- Сайт бота: lanicat.lovable.app
- Сервер підтримки: discord.gg/aWPSsuEzr3

Якщо не знаєш відповіді — порадь звернутися на сервер підтримки Lanicat.
Відповідай стисло, 2-4 речення максимум.`
          },
          { role: "user", content: question },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Забагато запитів, спробуйте пізніше." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Сервіс тимчасово недоступний." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "На жаль, не вдалося отримати відповідь.";

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("faq-ai error:", e);
    return new Response(JSON.stringify({ error: "Помилка сервісу" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
