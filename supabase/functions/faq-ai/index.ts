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

Ось основна інформація про Lanicat:
- Lanicat — це Discord бот з розважальними та корисними функціями
- Працює тільки на Discord
- Базовий функціонал безкоштовний, є Lanicat Premium з додатковими функціями
- Написаний на Python з використанням discord.py
- Команди доступні через /help
- Підтримує модулі: верифікація, авторолі, безпека
- Premium дає: ексклюзивну роль, бейдж, без реклами, без затримок, premium-статистику, /texttoimg, ранній доступ, пріоритетну підтримку
- Підписка оформлюється через /premium
- Дані: збирає ID користувачів, дані сервера для роботи функцій
- Приватні повідомлення не зберігаються

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
