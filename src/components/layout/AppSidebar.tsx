import { Building2, Users, History, ShieldCheck, Settings, ChevronUp, User2, LogOut, ListChecks } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { currentUser } from "@/lib/mockData";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavItems = [
  { title: "Departments", url: "/departments", icon: Building2 },
  { title: "Users", url: "/users", icon: Users },
  { title: "Activity Logs", url: "/activity-logs", icon: History },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const isSuperAdmin = currentUser.role === 'super_admin';

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">LM</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Logto Manager</span>
              <span className="text-xs text-muted-foreground">OGCIO Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname.startsWith(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <User2 className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{currentUser.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {isSuperAdmin ? 'Super Admin' : 'Admin'}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-popover"
                side="top"
                align="end"
                sideOffset={4}
              >
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
                <DropdownMenuSeparator />
                {isSuperAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <NavLink to="/admin-management" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        <span>Manage Admins</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink to="/whitelisting" className="flex items-center gap-2 cursor-pointer">
                        <ListChecks className="h-4 w-4" />
                        <span>Whitelisting</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
