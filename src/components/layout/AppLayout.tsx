import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  title?: string;
  showBreadcrumbs?: boolean;
}

export function AppLayout({ children, breadcrumbs = [], title, showBreadcrumbs = false }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {showBreadcrumbs && breadcrumbs.length > 0 && (
            <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={index}>
                      {index > 0 && <BreadcrumbSeparator />}
                      {crumb.href ? (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </header>
          )}
          <main className="flex-1 p-6">
            {title && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              </div>
            )}
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
