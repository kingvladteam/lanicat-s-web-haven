import { useEffect } from "react";
import PageHead from "@/components/PageHead";

const Add = () => {
  useEffect(() => {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=940627200208699452&scope=bot%20applications.commands&permissions=2146958847";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <PageHead
        title="Додати Lanicat на сервер"
        description="Додайте український Discord-бот Lanicat на свій сервер."
        path="/add"
        noindex
      />
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Перенаправлення...</p>
      </div>
    </div>
  );
};

export default Add;
