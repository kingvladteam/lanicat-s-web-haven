import { DocModule } from "@/pages/Documentation";
import {
  Bot, Hammer, Wrench, Heart, CheckCircle, UserPlus, Lock, Sparkles, ChevronRight,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Bot, Hammer, Wrench, Heart, CheckCircle, UserPlus, Lock, Sparkles,
};

interface Props {
  module: DocModule;
  entryCount: number;
  onClick: () => void;
}

export const DocModuleCard = ({ module, entryCount, onClick }: Props) => {
  const Icon = iconMap[module.icon_name] || Bot;

  return (
    <button
      onClick={onClick}
      className="group w-full text-left p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mt-4 mb-1">{module.name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">
        {module.module_type === "commands" ? `${entryCount} команд` : `${entryCount} налаштувань`}
      </span>
    </button>
  );
};
