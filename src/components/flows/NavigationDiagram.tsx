import { FlowSection } from "@/components/FlowSection";
import { 
  LayoutDashboard, 
  Building2, 
  Boxes, 
  Users, 
  Settings, 
  Shield,
  Lock
} from "lucide-react";

export function NavigationDiagram() {
  return (
    <FlowSection
      title="Information Architecture"
      description="Platform navigation structure by role"
      icon={<LayoutDashboard className="w-5 h-5" />}
    >
      <div className="overflow-x-auto">
        <div className="min-w-[600px] p-4">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary text-primary-foreground rounded-t-lg px-4 py-3">
            <span className="font-bold">OGCIO Form Management</span>
            <div className="flex items-center gap-4 text-sm">
              <span className="opacity-80">[User Name]</span>
              <span className="px-2 py-0.5 bg-primary-foreground/20 rounded">Logout</span>
            </div>
          </div>
          
          {/* Layout */}
          <div className="flex border-x border-b border-border rounded-b-lg">
            {/* Sidebar */}
            <div className="w-48 bg-sidebar border-r border-border p-4 space-y-2">
              <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
              <NavItem 
                icon={<Building2 className="w-4 h-4" />} 
                label="Departments" 
                superAdminOnly 
              />
              <NavItem icon={<Boxes className="w-4 h-4" />} label="Units" />
              <NavItem icon={<Users className="w-4 h-4" />} label="Users" />
              <NavItem 
                icon={<Settings className="w-4 h-4" />} 
                label="Settings" 
                superAdminOnly 
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 bg-background">
              <div className="text-sm text-muted-foreground mb-4">[Main Content Area]</div>
              <div className="space-y-3">
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-8 bg-muted rounded w-full" />
                <div className="h-24 bg-muted/50 rounded w-full border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                  Data Table / Forms / Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Table */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-3">Page Routes</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-medium">Page</th>
                <th className="text-left py-2 px-3 font-medium">Route</th>
                <th className="text-center py-2 px-3 font-medium">Super Admin</th>
                <th className="text-center py-2 px-3 font-medium">Admin</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {[
                { page: "Login", route: "/login", sa: true, admin: true },
                { page: "Dashboard", route: "/dashboard", sa: true, admin: true },
                { page: "Departments", route: "/dashboard/departments", sa: true, admin: false },
                { page: "Units", route: "/dashboard/units", sa: true, admin: "read" },
                { page: "Users", route: "/dashboard/users", sa: true, admin: true },
                { page: "Settings", route: "/dashboard/settings", sa: true, admin: false },
              ].map((row) => (
                <tr key={row.route} className="border-b border-border/50">
                  <td className="py-2 px-3">{row.page}</td>
                  <td className="py-2 px-3 font-mono text-primary">{row.route}</td>
                  <td className="py-2 px-3 text-center">
                    {row.sa && <span className="text-success">✓</span>}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {row.admin === true && <span className="text-success">✓</span>}
                    {row.admin === false && <span className="text-destructive">✗</span>}
                    {row.admin === "read" && <span className="text-warning">Read</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FlowSection>
  );
}

function NavItem({ 
  icon, 
  label, 
  active = false, 
  superAdminOnly = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  superAdminOnly?: boolean;
}) {
  return (
    <div 
      className={`
        flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
        ${active ? 'bg-sidebar-accent text-sidebar-primary font-medium' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'}
      `}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {superAdminOnly && (
        <span className="text-[9px] px-1 py-0.5 bg-role-super-admin/20 text-role-super-admin rounded font-medium">
          SA
        </span>
      )}
    </div>
  );
}
