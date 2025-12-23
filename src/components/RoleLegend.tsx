import { Shield, UserCog } from "lucide-react";

export function RoleLegend() {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-role-super-admin/20 rounded-md">
          <Shield className="w-4 h-4 text-role-super-admin" />
        </div>
        <div>
          <p className="text-xs font-semibold">Super Admin</p>
          <p className="text-[10px] text-muted-foreground">Full system access</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-info/20 rounded-md">
          <UserCog className="w-4 h-4 text-info" />
        </div>
        <div>
          <p className="text-xs font-semibold">Admin</p>
          <p className="text-[10px] text-muted-foreground">User management focus</p>
        </div>
      </div>
      <div className="h-8 w-px bg-border mx-2" />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-flow-action border border-flow-action-border" />
          <span className="text-[10px] text-muted-foreground">Action</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-flow-decision border border-flow-decision-border" />
          <span className="text-[10px] text-muted-foreground">Decision</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-flow-end border border-flow-end-border" />
          <span className="text-[10px] text-muted-foreground">End/Error</span>
        </div>
      </div>
    </div>
  );
}
