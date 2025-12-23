import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FlowSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function FlowSection({
  title,
  description,
  children,
  className,
  icon,
}: FlowSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
        )}
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        {children}
      </div>
    </section>
  );
}
