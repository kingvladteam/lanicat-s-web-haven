import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

const ImageUploadInput = ({ value, onChange, placeholder = "https://...", className }: ImageUploadInputProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Помилка", description: "Можна завантажувати лише зображення (PNG, JPG, GIF, WEBP)", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Помилка", description: "Максимальний розмір файлу — 5 МБ", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "png";
      const fileName = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("embed-images")
        .upload(fileName, file, { contentType: file.type });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("embed-images")
        .getPublicUrl(fileName);

      onChange(urlData.publicUrl);
      toast({ title: "Завантажено!", description: "Зображення успішно завантажено" });
    } catch (err: any) {
      toast({ title: "Помилка завантаження", description: err.message || "Не вдалося завантажити зображення", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-1.5">
      <Input
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="shrink-0 h-10 w-10"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        title="Завантажити зображення"
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
      </Button>
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 h-10 w-10 text-destructive"
          onClick={() => onChange("")}
          title="Очистити"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default ImageUploadInput;
