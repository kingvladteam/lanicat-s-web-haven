import { useState, useRef, useEffect } from "react";
import { DocModule, DocEntry } from "@/pages/Documentation";
import { Search, X, Crown } from "lucide-react";
import {
  Bot, Hammer, Wrench, Heart, CheckCircle, UserPlus, Lock, Sparkles,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Bot, Hammer, Wrench, Heart, CheckCircle, UserPlus, Lock, Sparkles,
};

interface Props {
  modules: DocModule[];
  entries: DocEntry[];
  onSelectEntry: (entry: DocEntry) => void;
  onSelectModule: (module: DocModule) => void;
}

export const DocSearch = ({ modules, entries, onSelectEntry, onSelectModule }: Props) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = query.toLowerCase().trim();

  const matchedEntries = q
    ? entries.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          (e.description && e.description.toLowerCase().includes(q))
      ).slice(0, 8)
    : [];

  const matchedModules = q
    ? modules.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          (m.description && m.description.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const hasResults = matchedEntries.length > 0 || matchedModules.length > 0;
  const showDropdown = focused && q.length > 0;

  return (
    <div ref={wrapperRef} className="relative mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Пошук команд та налаштувань..."
          className="w-full h-12 pl-12 pr-10 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setFocused(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-50 top-full mt-2 w-full bg-card border border-border rounded-xl shadow-xl overflow-hidden max-h-[400px] overflow-y-auto">
          {!hasResults && (
            <div className="p-6 text-center text-muted-foreground text-sm">
              Нічого не знайдено за запитом «{query}»
            </div>
          )}

          {matchedModules.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                Модулі
              </div>
              {matchedModules.map((mod) => {
                const Icon = iconMap[mod.icon_name] || Bot;
                return (
                  <button
                    key={mod.id}
                    onClick={() => { onSelectModule(mod); setQuery(""); setFocused(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground">{mod.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{mod.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {matchedEntries.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                Команди / Налаштування
              </div>
              {matchedEntries.map((entry) => {
                const mod = modules.find((m) => m.id === entry.module_id);
                return (
                  <button
                    key={entry.id}
                    onClick={() => { onSelectEntry(entry); setQuery(""); setFocused(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors text-left"
                  >
                    <code className="text-primary font-mono text-xs bg-primary/10 px-2 py-0.5 rounded shrink-0">
                      {entry.name}
                    </code>
                    <span className="text-sm text-muted-foreground truncate flex-1">
                      {entry.description}
                    </span>
                    {entry.is_premium && <Crown className="w-3 h-3 text-primary shrink-0" />}
                    {mod && (
                      <span className="text-xs text-muted-foreground/60 shrink-0">{mod.name}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
