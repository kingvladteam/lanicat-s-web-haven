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

interface EmbedFormProps {
  embed: EmbedData;
  onChange: (embed: EmbedData) => void;
  initialWebhookUrl?: string;
}

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

    if (Object.keys(embedObj).length > 0) obj.embeds = [embedObj];
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
    setSending(true);
    try {
      const payload = JSON.parse(generateJson());
      const { data, error } = await supabase.functions.invoke("send-webhook", {
        body: { webhookUrl: webhookUrl.trim(), payload },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: "Надіслано!", description: "Ембед успішно відправлено в Discord" });
    } catch (err: any) {
      toast({ title: "Помилка", description: err.message || "Не вдалося відправити", variant: "destructive" });
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
            <Input className={inputClass} placeholder="https://..." value={embed.botAvatarUrl} onChange={e => set("botAvatarUrl", e.target.value)} />
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
              <Input className={inputClass} placeholder="https://..." value={embed.authorIconUrl} onChange={e => set("authorIconUrl", e.target.value)} />
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className={labelClass}>Мініатюра (URL)</Label>
            <Input className={inputClass} placeholder="https://..." value={embed.thumbnailUrl} onChange={e => set("thumbnailUrl", e.target.value)} />
          </div>
          <div>
            <Label className={labelClass}>Зображення (URL)</Label>
            <Input className={inputClass} placeholder="https://..." value={embed.imageUrl} onChange={e => set("imageUrl", e.target.value)} />
          </div>
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
            <Input className={inputClass} placeholder="https://..." value={embed.footerIconUrl} onChange={e => set("footerIconUrl", e.target.value)} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={embed.timestamp} onCheckedChange={v => set("timestamp", v)} />
          <Label className="text-xs text-muted-foreground">Показати дату</Label>
        </div>
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
