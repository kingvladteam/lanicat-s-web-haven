import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Copy, Check, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import type { EmbedData } from "./DiscordPreview";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUploadInput from "./ImageUploadInput";

interface EmbedFormProps {
  embed: EmbedData;
  onChange: (embed: EmbedData) => void;
  initialWebhookUrl?: string;
}

const isValidUrl = (str: string): boolean => {
  if (!str.trim()) return true; // empty is ok
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const validateEmbed = (embed: EmbedData): string | null => {
  const urlFields: { value: string; label: string }[] = [
    { value: embed.botAvatarUrl, label: "Аватар бота" },
    { value: embed.authorIconUrl, label: "Іконка автора" },
    { value: embed.authorUrl, label: "URL автора" },
    { value: embed.titleUrl, label: "URL заголовку" },
    { value: embed.thumbnailUrl, label: "Мініатюра" },
    { value: embed.imageUrl, label: "Зображення" },
    { value: embed.footerIconUrl, label: "Іконка підвалу" },
  ];

  for (const field of urlFields) {
    if (field.value && !isValidUrl(field.value)) {
      return `Поле "${field.label}" містить невалідне посилання. Вставте правильний URL (починається з https://) або залиште порожнім.`;
    }
  }

  const hasImage = !!(embed.imageUrl || embed.thumbnailUrl || (embed.extraImageUrls || []).some(Boolean));
  if (!embed.title && !embed.description && !embed.content && !hasImage) {
    return "Додайте хоча б заголовок, опис, текст повідомлення або зображення.";
  }

  return null;
};

const EmbedForm = ({ embed, onChange, initialWebhookUrl = "" }: EmbedFormProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(initialWebhookUrl);
  const [sending, setSending] = useState(false);

  const set = <K extends keyof EmbedData>(key: K, value: EmbedData[K]) => {
    onChange({ ...embed, [key]: value });
  };

  const updateField = (index: number, key: string, value: string | boolean) => {
    const fields = [...embed.fields];
    fields[index] = { ...fields[index], [key]: value };
    set("fields", fields);
  };

  const addField = () => {
    if (embed.fields.length >= 25) return;
    set("fields", [...embed.fields, { name: "", value: "", inline: false }]);
  };

  const removeField = (index: number) => {
    set("fields", embed.fields.filter((_, i) => i !== index));
  };

  const generateJson = () => {
    const obj: any = {};
    if (embed.botName) obj.username = embed.botName;
    if (embed.botAvatarUrl) obj.avatar_url = embed.botAvatarUrl;
    if (embed.content) obj.content = embed.content;

    const embedObj: any = {};
    if (embed.title) embedObj.title = embed.title;
    if (embed.titleUrl) embedObj.url = embed.titleUrl;
    if (embed.description) embedObj.description = embed.description;
    if (embed.color) embedObj.color = parseInt(embed.color.replace("#", ""), 16);
    if (embed.authorName) {
      embedObj.author = { name: embed.authorName };
      if (embed.authorUrl) embedObj.author.url = embed.authorUrl;
      if (embed.authorIconUrl) embedObj.author.icon_url = embed.authorIconUrl;
    }
    if (embed.thumbnailUrl) embedObj.thumbnail = { url: embed.thumbnailUrl };
    if (embed.imageUrl) embedObj.image = { url: embed.imageUrl };
    if (embed.footerText) {
      embedObj.footer = { text: embed.footerText };
      if (embed.footerIconUrl) embedObj.footer.icon_url = embed.footerIconUrl;
    }
    if (embed.timestamp) embedObj.timestamp = new Date().toISOString();
    if (embed.fields.length > 0) {
      embedObj.fields = embed.fields.filter(f => f.name || f.value);
    }

    const extras = (embed.extraImageUrls || []).filter(Boolean);
    if (Object.keys(embedObj).length > 0 || extras.length > 0) {
      const embedsArr: any[] = [embedObj];
      if (extras.length > 0) {
        // Discord groups embeds into a gallery when they share the same `url`.
        // Use the user's titleUrl if provided, otherwise an invisible shared marker
        // that does NOT turn the title into a visible link unless the user set one.
        const sharedUrl = embed.titleUrl || `https://lanicat.pp.ua/#g-${Date.now()}`;
        embedObj.url = sharedUrl;
        for (const url of extras) {
          embedsArr.push({ url: sharedUrl, image: { url } });
        }
      }
      obj.embeds = embedsArr;
    }
    return JSON.stringify(obj, null, 2);
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(generateJson());
      setCopied(true);
      toast({ title: "Скопійовано!", description: "JSON скопійовано в буфер обміну" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Помилка", description: "Не вдалося скопіювати", variant: "destructive" });
    }
  };

  const sendWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast({ title: "Помилка", description: "Введіть URL вебхука", variant: "destructive" });
      return;
    }

    const webhookPattern = /^https:\/\/(discord\.com|discordapp\.com)\/api\/webhooks\/\d+\/.+$/;
    if (!webhookPattern.test(webhookUrl.trim())) {
      toast({
        title: "Невалідний URL вебхука",
        description: "URL має виглядати як https://discord.com/api/webhooks/ID/TOKEN",
        variant: "destructive",
      });
      return;
    }

    const validationError = validateEmbed(embed);
    if (validationError) {
      toast({ title: "Помилка валідації", description: validationError, variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      const payload = JSON.parse(generateJson());
      const { data, error } = await supabase.functions.invoke("send-webhook", {
        body: { webhookUrl: webhookUrl.trim(), payload },
      });

      if (error) {
        throw new Error("Не вдалося з'єднатися з сервером. Спробуйте ще раз.");
      }

      if (data?.error) {
        // Parse Discord API errors into friendly messages
        if (data.error.includes("400")) {
          throw new Error("Discord відхилив повідомлення. Перевірте, що всі URL-посилання на зображення є дійсними та доступними.");
        } else if (data.error.includes("401") || data.error.includes("403")) {
          throw new Error("Вебхук недійсний або був видалений. Перевірте URL вебхука.");
        } else if (data.error.includes("404")) {
          throw new Error("Вебхук не знайдено. Можливо, він був видалений.");
        } else if (data.error.includes("429")) {
          throw new Error("Забагато запитів. Зачекайте кілька секунд і спробуйте знову.");
        }
        throw new Error(data.error);
      }

      toast({ title: "Надіслано!", description: "Ембед успішно відправлено в Discord" });
    } catch (err: any) {
      toast({ title: "Помилка відправки", description: err.message || "Не вдалося відправити ембед", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const inputClass = "bg-[hsl(var(--secondary))] border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]";
  const labelClass = "text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wide";

  return (
    <div className="space-y-6">
      {/* General */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Загальне</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className={labelClass}>Ім'я бота</Label>
            <Input className={inputClass} placeholder="Bot" value={embed.botName} onChange={e => set("botName", e.target.value)} />
          </div>
          <div>
            <Label className={labelClass}>Аватар бота (URL)</Label>
            <ImageUploadInput className={inputClass} placeholder="https://..." value={embed.botAvatarUrl} onChange={v => set("botAvatarUrl", v)} />
          </div>
        </div>
        <div>
          <Label className={labelClass}>Текст повідомлення</Label>
          <Textarea className={inputClass} placeholder="Текст над ембедом..." value={embed.content} onChange={e => set("content", e.target.value)} rows={2} />
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Author */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Автор</h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label className={labelClass}>Ім'я автора</Label>
            <Input className={inputClass} placeholder="Автор" value={embed.authorName} onChange={e => set("authorName", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className={labelClass}>URL автора</Label>
              <Input className={inputClass} placeholder="https://..." value={embed.authorUrl} onChange={e => set("authorUrl", e.target.value)} />
            </div>
            <div>
              <Label className={labelClass}>Іконка автора (URL)</Label>
              <ImageUploadInput className={inputClass} placeholder="https://..." value={embed.authorIconUrl} onChange={v => set("authorIconUrl", v)} />
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Body */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Тіло ембеду</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className={labelClass}>Заголовок</Label>
            <Input className={inputClass} placeholder="Заголовок" value={embed.title} onChange={e => set("title", e.target.value)} />
          </div>
          <div>
            <Label className={labelClass}>URL заголовку</Label>
            <Input className={inputClass} placeholder="https://..." value={embed.titleUrl} onChange={e => set("titleUrl", e.target.value)} />
          </div>
        </div>
        <div>
          <Label className={labelClass}>Опис</Label>
          <Textarea className={inputClass} placeholder="Опис ембеду..." value={embed.description} onChange={e => set("description", e.target.value)} rows={4} />
        </div>
        <div>
          <Label className={labelClass}>Колір</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={embed.color || "#5865f2"}
              onChange={e => set("color", e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-[hsl(var(--border))]"
            />
            <Input className={`${inputClass} w-32`} value={embed.color} onChange={e => set("color", e.target.value)} placeholder="#5865f2" />
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Images */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Зображення</h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label className={labelClass}>Мініатюра (URL або завантажити)</Label>
            <ImageUploadInput className={inputClass} placeholder="https://..." value={embed.thumbnailUrl} onChange={v => set("thumbnailUrl", v)} />
          </div>
          <div>
            <Label className={labelClass}>Основне зображення (URL або завантажити)</Label>
            <ImageUploadInput className={inputClass} placeholder="https://..." value={embed.imageUrl} onChange={v => set("imageUrl", v)} />
          </div>

          {/* Extra images (gallery up to 4 total) */}
          {(embed.extraImageUrls || []).map((url, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <Label className={labelClass}>Додаткове зображення {i + 2}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = [...(embed.extraImageUrls || [])];
                    next.splice(i, 1);
                    set("extraImageUrls", next);
                  }}
                  className="h-6 w-6 p-0 text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <ImageUploadInput
                className={inputClass}
                placeholder="https://..."
                value={url}
                onChange={v => {
                  const next = [...(embed.extraImageUrls || [])];
                  next[i] = v;
                  set("extraImageUrls", next);
                }}
              />
            </div>
          ))}

          {(!embed.extraImageUrls || embed.extraImageUrls.length < 3) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => set("extraImageUrls", [...(embed.extraImageUrls || []), ""])}
              className="gap-1 self-start"
              disabled={!embed.imageUrl}
            >
              <Plus className="w-3 h-3" /> Додати зображення (до 4)
            </Button>
          )}
          {!embed.imageUrl && (
            <p className="text-xs text-muted-foreground">
              Спочатку додай основне зображення, щоб додавати додаткові (Discord групує до 4 в галерею).
            </p>
          )}
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Fields */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Поля ({embed.fields.length}/25)</h3>
          <Button variant="outline" size="sm" onClick={addField} disabled={embed.fields.length >= 25} className="gap-1">
            <Plus className="w-3 h-3" /> Додати
          </Button>
        </div>
        {embed.fields.map((field, i) => (
          <div key={i} className="p-3 rounded-lg bg-[hsl(var(--secondary))] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Поле {i + 1}</span>
              <Button variant="ghost" size="sm" onClick={() => removeField(i)} className="h-6 w-6 p-0 text-destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input className={inputClass} placeholder="Назва" value={field.name} onChange={e => updateField(i, "name", e.target.value)} />
              <Input className={inputClass} placeholder="Значення" value={field.value} onChange={e => updateField(i, "value", e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={field.inline} onCheckedChange={v => updateField(i, "inline", v)} />
              <Label className="text-xs text-muted-foreground">Inline</Label>
            </div>
          </div>
        ))}
      </section>

      <Separator className="bg-border" />

      {/* Footer */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Підвал</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className={labelClass}>Текст підвалу</Label>
            <Input className={inputClass} placeholder="Footer text" value={embed.footerText} onChange={e => set("footerText", e.target.value)} />
          </div>
          <div>
            <Label className={labelClass}>Іконка підвалу (URL)</Label>
            <ImageUploadInput className={inputClass} placeholder="https://..." value={embed.footerIconUrl} onChange={v => set("footerIconUrl", v)} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={embed.timestamp} onCheckedChange={v => set("timestamp", v)} />
          <Label className="text-xs text-muted-foreground">Показати дату</Label>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Webhook */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Відправка через Webhook</h3>
        <div>
          <Label className={labelClass}>Discord Webhook URL</Label>
          <Input
            className={inputClass}
            placeholder="https://discord.com/api/webhooks/..."
            value={webhookUrl}
            onChange={e => setWebhookUrl(e.target.value)}
          />
        </div>
        <Button onClick={sendWebhook} disabled={sending} className="w-full gap-2">
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {sending ? "Надсилання..." : "Надіслати в Discord"}
        </Button>
      </section>

      <Separator className="bg-border" />

      {/* Copy JSON */}
      <Button onClick={copyJson} className="w-full gap-2" variant="outline">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Скопійовано!" : "Скопіювати JSON"}
      </Button>
    </div>
  );
};

export default EmbedForm;
