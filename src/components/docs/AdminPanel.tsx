import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DocModule, DocEntry } from "@/pages/Documentation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Save, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Props {
  modules: DocModule[];
  entries: DocEntry[];
  onUpdate: () => void;
}

export const AdminPanel = ({ modules, entries, onUpdate }: Props) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<DocEntry | null>(null);
  const [newEntry, setNewEntry] = useState(false);
  const [editingModule, setEditingModule] = useState<DocModule | null>(null);

  // New entry form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    usage: "",
    arguments: "[]",
    is_premium: false,
    display_order: 0,
  });

  const resetForm = () => {
    setForm({ name: "", description: "", usage: "", arguments: "[]", is_premium: false, display_order: 0 });
    setEditingEntry(null);
    setNewEntry(false);
  };

  const startEdit = (entry: DocEntry) => {
    setEditingEntry(entry);
    setNewEntry(false);
    setForm({
      name: entry.name,
      description: entry.description || "",
      usage: entry.usage || "",
      arguments: JSON.stringify(entry.arguments || [], null, 2),
      is_premium: entry.is_premium || false,
      display_order: entry.display_order,
    });
  };

  const saveEntry = async (moduleId: string) => {
    let args: any[];
    try {
      args = JSON.parse(form.arguments);
    } catch {
      toast({ title: "Невалідний JSON в аргументах", variant: "destructive" });
      return;
    }

    if (editingEntry) {
      const { error } = await supabase
        .from("doc_entries")
        .update({
          name: form.name,
          description: form.description,
          usage: form.usage,
          arguments: args,
          is_premium: form.is_premium,
          display_order: form.display_order,
        })
        .eq("id", editingEntry.id);
      if (error) {
        toast({ title: "Помилка збереження", description: error.message, variant: "destructive" });
        return;
      }
    } else {
      const { error } = await supabase.from("doc_entries").insert({
        module_id: moduleId,
        name: form.name,
        description: form.description,
        usage: form.usage,
        arguments: args,
        is_premium: form.is_premium,
        display_order: form.display_order,
      });
      if (error) {
        toast({ title: "Помилка додавання", description: error.message, variant: "destructive" });
        return;
      }
    }

    toast({ title: "Збережено!" });
    resetForm();
    onUpdate();
  };

  const deleteEntry = async (id: string) => {
    if (!confirm("Видалити цей запис?")) return;
    await supabase.from("doc_entries").delete().eq("id", id);
    toast({ title: "Видалено" });
    onUpdate();
  };

  const saveModule = async (mod: DocModule) => {
    if (!editingModule) return;
    const { error } = await supabase
      .from("doc_modules")
      .update({
        name: editingModule.name,
        description: editingModule.description,
        full_description: editingModule.full_description,
        icon_name: editingModule.icon_name,
        display_order: editingModule.display_order,
      })
      .eq("id", mod.id);
    if (error) {
      toast({ title: "Помилка", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Модуль оновлено!" });
    setEditingModule(null);
    onUpdate();
  };

  const addModule = async () => {
    const { error } = await supabase.from("doc_modules").insert({
      name: "Новий модуль",
      slug: `new-${Date.now()}`,
      description: "Опис модуля",
      full_description: "Повний опис модуля",
      icon_name: "Bot",
      module_type: "commands",
      display_order: modules.length + 1,
    });
    if (error) {
      toast({ title: "Помилка", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Модуль додано!" });
    onUpdate();
  };

  const deleteModule = async (id: string) => {
    if (!confirm("Видалити модуль та всі його записи?")) return;
    await supabase.from("doc_modules").delete().eq("id", id);
    toast({ title: "Модуль видалено" });
    onUpdate();
  };

  return (
    <div className="mb-12 p-6 bg-card rounded-xl border border-primary/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">🔧 Адмін-панель документації</h2>
        <Button onClick={addModule} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Додати модуль
        </Button>
      </div>

      <div className="space-y-4">
        {modules.map((mod) => {
          const isExpanded = expandedModule === mod.id;
          const modEntries = entries.filter((e) => e.module_id === mod.id);

          return (
            <div key={mod.id} className="border border-border rounded-lg overflow-hidden">
              {/* Module header */}
              <div className="flex items-center gap-3 p-4 bg-background cursor-pointer" onClick={() => {
                setExpandedModule(isExpanded ? null : mod.id);
                resetForm();
              }}>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                <span className="font-semibold text-foreground flex-1">{mod.name}</span>
                <span className="text-xs text-muted-foreground">{modEntries.length} записів</span>
              </div>

              {isExpanded && (
                <div className="p-4 space-y-4 border-t border-border">
                  {/* Module edit */}
                  {editingModule?.id === mod.id ? (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                      <Input value={editingModule.name} onChange={(e) => setEditingModule({ ...editingModule, name: e.target.value })} placeholder="Назва" />
                      <Input value={editingModule.description || ""} onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })} placeholder="Короткий опис" />
                      <Textarea value={editingModule.full_description || ""} onChange={(e) => setEditingModule({ ...editingModule, full_description: e.target.value })} placeholder="Повний опис" />
                      <Input value={editingModule.icon_name} onChange={(e) => setEditingModule({ ...editingModule, icon_name: e.target.value })} placeholder="Іконка (Bot, Hammer, ...)" />
                      <Input type="number" value={editingModule.display_order} onChange={(e) => setEditingModule({ ...editingModule, display_order: parseInt(e.target.value) || 0 })} placeholder="Порядок" />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveModule(mod)} className="gap-1"><Save className="w-3 h-3" /> Зберегти</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingModule(null)}>Скасувати</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingModule({ ...mod })}>Редагувати модуль</Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteModule(mod.id)} className="gap-1"><Trash2 className="w-3 h-3" /> Видалити</Button>
                    </div>
                  )}

                  {/* Entries list */}
                  <div className="space-y-2">
                    {modEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                        <code className="text-primary text-sm font-mono">{entry.name}</code>
                        <span className="text-muted-foreground text-sm flex-1 truncate">{entry.description}</span>
                        {entry.is_premium && <span className="text-xs text-primary font-semibold">Premium</span>}
                        <Button size="sm" variant="ghost" onClick={() => { setNewEntry(false); startEdit(entry); }}>✏️</Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteEntry(entry.id)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                      </div>
                    ))}
                  </div>

                  {/* Entry form */}
                  {(editingEntry?.module_id === mod.id || (newEntry && expandedModule === mod.id)) && (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-primary/20">
                      <h4 className="text-sm font-semibold text-foreground">
                        {editingEntry ? "Редагування" : "Новий запис"}
                      </h4>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Назва (наприклад /ban)" />
                      <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опис" />
                      <Input value={form.usage} onChange={(e) => setForm({ ...form, usage: e.target.value })} placeholder="Використання (наприклад /ban <user>)" />
                      <Textarea value={form.arguments} onChange={(e) => setForm({ ...form, arguments: e.target.value })} placeholder='Аргументи JSON' className="font-mono text-xs" rows={4} />
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={form.is_premium} onChange={(e) => setForm({ ...form, is_premium: e.target.checked })} className="rounded" />
                          Premium
                        </label>
                        <Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} placeholder="Порядок" className="w-24" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveEntry(mod.id)} className="gap-1"><Save className="w-3 h-3" /> Зберегти</Button>
                        <Button size="sm" variant="ghost" onClick={resetForm}>Скасувати</Button>
                      </div>
                    </div>
                  )}

                  {!newEntry && editingEntry?.module_id !== mod.id && (
                    <Button size="sm" variant="outline" onClick={() => { resetForm(); setNewEntry(true); setForm({ ...form, display_order: modEntries.length + 1 }); }} className="gap-1">
                      <Plus className="w-3 h-3" /> Додати запис
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
