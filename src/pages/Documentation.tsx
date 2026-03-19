import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { DocModuleCard } from "@/components/docs/DocModuleCard";
import { DocModuleDetail } from "@/components/docs/DocModuleDetail";
import { AdminPanel } from "@/components/docs/AdminPanel";
import { Book, Shield } from "lucide-react";

export interface DocModule {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  full_description: string | null;
  icon_name: string;
  module_type: string;
  display_order: number;
}

export interface DocEntry {
  id: string;
  module_id: string;
  name: string;
  description: string | null;
  usage: string | null;
  arguments: any;
  is_premium: boolean | null;
  display_order: number;
}

const Documentation = () => {
  const [modules, setModules] = useState<DocModule[]>([]);
  const [entries, setEntries] = useState<DocEntry[]>([]);
  const [selectedModule, setSelectedModule] = useState<DocModule | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const { isAdmin } = useAdmin();

  const fetchData = async () => {
    const [{ data: mods }, { data: ents }] = await Promise.all([
      supabase.from("doc_modules").select("*").order("display_order"),
      supabase.from("doc_entries").select("*").order("display_order"),
    ]);
    if (mods) setModules(mods as DocModule[]);
    if (ents) setEntries(ents as DocEntry[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const moduleEntries = selectedModule
    ? entries.filter((e) => e.module_id === selectedModule.id)
    : [];

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
        <div className="container px-4 relative z-10">
          <ScrollAnimation>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Book className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-gradient">Документація</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Повний список команд та налаштувань бота Lanicat
              </p>
              {isAdmin && (
                <button
                  onClick={() => setShowAdmin(!showAdmin)}
                  className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  {showAdmin ? "Сховати адмін-панель" : "Адмін-панель"}
                </button>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <main className="py-16">
        <div className="container px-4 max-w-5xl mx-auto">
          {/* Admin Panel */}
          {isAdmin && showAdmin && (
            <AdminPanel
              modules={modules}
              entries={entries}
              onUpdate={fetchData}
            />
          )}

          {/* Module list or detail view */}
          {selectedModule ? (
            <DocModuleDetail
              module={selectedModule}
              entries={moduleEntries}
              onBack={() => setSelectedModule(null)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((mod, i) => (
                <ScrollAnimation key={mod.id} delay={i * 80}>
                  <DocModuleCard
                    module={mod}
                    entryCount={entries.filter((e) => e.module_id === mod.id).length}
                    onClick={() => setSelectedModule(mod)}
                  />
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
