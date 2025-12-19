import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FAQContent from "@/components/FAQ";
import Footer from "@/components/Footer";

const FAQ = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container px-4 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            На головну
          </Link>
        </div>
      </div>

      <FAQContent />
      <Footer />
    </main>
  );
};

export default FAQ;
