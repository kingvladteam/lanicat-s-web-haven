import Header from "@/components/Header";
import FAQContent from "@/components/FAQ";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

const FAQ = () => {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHead
        title="FAQ — Питання та відповіді про Lanicat"
        description="Відповіді на поширені запитання про команди, модулі, налаштування, Premium і можливості українського Discord-бота Lanicat."
        path="/faq"
      />
      <Header />
      <FAQContent />
      <Footer />
    </main>
  );
};

export default FAQ;
