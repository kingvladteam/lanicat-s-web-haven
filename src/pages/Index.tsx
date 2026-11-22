import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageHead
        title="Lanicat — Український Discord-бот"
        description="Український Discord-бот із десятками функцій для адміністрування, автоматизації та розвитку вашого сервера."
        path="/"
      />
      <Header />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
};

export default Index;
