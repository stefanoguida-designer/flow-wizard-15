import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type NodeType = "start" | "action" | "decision" | "end" | "process" | "page";

interface FlowNodeProps {
  type: NodeType;
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  delay?: number;
  roleAccess?: ("super-admin" | "admin")[];
}

const nodeStyles: Record<NodeType, string> = {
  start: "bg-primary text-primary-foreground border-primary",
  action: "bg-flow-action border-flow-action-border text-foreground",
  decision: "bg-flow-decision border-flow-decision-border text-foreground rounded-xl rotate-0",
  end: "bg-flow-end border-flow-end-border text-foreground",
  process: "bg-card border-primary text-foreground",
  page: "bg-card border-2 border-primary text-foreground shadow-sm",
};

const roleColors = {
  "super-admin": "bg-role-super-admin/20 text-role-super-admin border-role-super-admin/30",
  admin: "bg-info/20 text-info border-info/30",
};

export function FlowNode({
  type,
  title,
  description,
  icon,
  className,
  delay = 0,
  roleAccess,
}: FlowNodeProps) {
  return (
    <div
      className={cn(
        "relative px-4 py-3 border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] opacity-0 animate-flow-in",
        nodeStyles[type],
        type === "decision" && "transform-none",
        className
      )}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-tight">{title}</p>
          {description && (
            <p className="text-xs mt-0.5 opacity-80 leading-tight">{description}</p>
          )}
        </div>
      </div>
      {roleAccess && (
        <div className="flex gap-1 mt-2">
          {roleAccess.map((role) => (
            <span
              key={role}
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full border font-medium",
                roleColors[role]
              )}
            >
              {role === "super-admin" ? "SA" : "Admin"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function FlowConnector({
  direction = "down",
  label,
  className,
}: {
  direction?: "down" | "right" | "left";
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        direction === "down" && "flex-col py-1",
        direction === "right" && "flex-row px-2",
        direction === "left" && "flex-row-reverse px-2",
        className
      )}
    >
      <div
        className={cn(
          "bg-flow-line",
          direction === "down" && "w-0.5 h-6",
          (direction === "right" || direction === "left") && "h-0.5 w-8"
        )}
      />
      {label && (
        <span className="text-[10px] text-muted-foreground font-medium px-1 bg-background">
          {label}
        </span>
      )}
      <svg
        className={cn(
          "w-3 h-3 text-flow-line fill-current",
          direction === "down" && "rotate-0",
          direction === "right" && "-rotate-90",
          direction === "left" && "rotate-90"
        )}
        viewBox="0 0 12 12"
      >
        <path d="M6 9L2 5h8L6 9z" />
      </svg>
    </div>
  );
}

export function FlowBranch({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-4 items-start justify-center", className)}>
      {children}
    </div>
  );
}
