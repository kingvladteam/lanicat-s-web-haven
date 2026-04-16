import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import DiscordPreview, { type EmbedData } from "@/components/embed/DiscordPreview";
import EmbedForm from "@/components/embed/EmbedForm";
import { Code, Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";

const defaultEmbed: EmbedData = {
  botName: "Lanicat",
  botAvatarUrl: "",
  content: "",
  authorName: "",
  authorIconUrl: "",
  authorUrl: "",
  title: "Приклад ембеду",
  titleUrl: "",
  description: "Це приклад ембеду створеного за допомогою Embed Builder від Lanicat.",
  color: "#d4a017",
  thumbnailUrl: "",
  imageUrl: "",
  footerText: "Lanicat Embed Builder",
  footerIconUrl: "",
  timestamp: true,
  fields: [],
  extraImageUrls: [],
};

const EmbedBuilder = () => {
  const [searchParams] = useSearchParams();
  const [embed, setEmbed] = useState<EmbedData>(() => {
    const name = searchParams.get("name");
    const botavatar = searchParams.get("botavatar");
    return {
      ...defaultEmbed,
      ...(name ? { botName: name } : {}),
      ...(botavatar ? { botAvatarUrl: botavatar } : {}),
    };
  });
  const webhookUrlFromParams = searchParams.get("url") || "";

  return (
    <>
      <Helmet>
        <title>Embed Builder — Lanicat</title>
        <meta name="description" content="Створюй красиві ембеди для Discord з попереднім переглядом" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Embed <span className="text-primary">Builder</span>
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Створюй красиві ембеди для Discord та копіюй готовий JSON для використання з вебхуками
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Form */}
              <ScrollAnimation>
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold text-foreground">Редактор</h2>
                  </div>
                  <EmbedForm embed={embed} onChange={setEmbed} initialWebhookUrl={webhookUrlFromParams} />
                </div>
              </ScrollAnimation>

              {/* Preview */}
              <ScrollAnimation>
                <div className="lg:sticky lg:top-24">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="w-5 h-5 text-primary" />
                      <h2 className="font-semibold text-foreground">Попередній перегляд</h2>
                    </div>
                    <DiscordPreview embed={embed} />
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EmbedBuilder;
