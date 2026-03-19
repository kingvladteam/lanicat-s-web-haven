import { DocModule, DocEntry } from "@/pages/Documentation";
import { ArrowLeft, Crown, Link2 } from "lucide-react";
import {
  Bot, Hammer, Wrench, Heart, CheckCircle, UserPlus, Lock, Sparkles,
} from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { toast } from "@/hooks/use-toast";

const iconMap: Record<string, any> = {
  Bot, Hammer, Wrench, Heart, CheckCircle, UserPlus, Lock, Sparkles,
};

interface Props {
  module: DocModule;
  entries: DocEntry[];
  onBack: () => void;
  highlightedEntry?: string | null;
}

export const DocModuleDetail = ({ module, entries, onBack, highlightedEntry }: Props) => {
  const Icon = iconMap[module.icon_name] || Bot;
  const isConfig = module.module_type === "config";

  const copyLink = (entryName: string) => {
    const url = `${window.location.origin}/documentation?module=${module.slug}&cmd=${encodeURIComponent(entryName)}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Посилання скопійовано!" });
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад до модулів
      </button>

      <ScrollAnimation>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">{module.name}</h2>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-md">
              {isConfig ? "Налаштування" : "Команди"}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-3xl">{module.full_description}</p>
      </ScrollAnimation>

      <div className="space-y-4">
        {entries.map((entry, i) => {
          const isHighlighted = highlightedEntry === entry.name;
          return (
            <ScrollAnimation key={entry.id} delay={i * 60}>
              <div
                id={`entry-${entry.name}`}
                className={`p-5 bg-card rounded-xl border transition-colors ${
                  isHighlighted
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <code className="text-primary font-mono text-sm bg-primary/10 px-2.5 py-1 rounded-lg font-semibold">
                      {entry.name}
                    </code>
                    {entry.is_premium && (
                      <span className="flex items-center gap-1 text-xs px-2 py-1 bg-primary/20 text-primary rounded-md font-semibold">
                        <Crown className="w-3 h-3" /> Premium
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => copyLink(entry.name)}
                    className="text-muted-foreground hover:text-primary transition-colors shrink-0 p-1"
                    title="Копіювати посилання"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-muted-foreground text-sm mb-3">{entry.description}</p>

                {entry.usage && (
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      {isConfig ? "Як заповнити" : "Використання"}
                    </span>
                    <code className="block mt-1 text-sm bg-background text-foreground px-3 py-2 rounded-lg border border-border font-mono">
                      {entry.usage}
                    </code>
                  </div>
                )}

                {Array.isArray(entry.arguments) && entry.arguments.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      {isConfig ? "Параметри" : "Аргументи"}
                    </span>
                    <div className="mt-2 space-y-1.5">
                      {entry.arguments.map((arg: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm bg-background px-3 py-2 rounded-lg border border-border"
                        >
                          <code className="text-primary font-mono shrink-0">{arg.name}</code>
                          <span className="text-muted-foreground/60 shrink-0">({arg.type})</span>
                          {arg.required && (
                            <span className="text-xs text-destructive shrink-0">обов'язковий</span>
                          )}
                          <span className="text-muted-foreground ml-auto text-right">{arg.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          );
        })}
      </div>
    </div>
  );
};
