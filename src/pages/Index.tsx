import { Header } from "@/components/Header";
import { RoleLegend } from "@/components/RoleLegend";
import { AuthenticationFlow } from "@/components/flows/AuthenticationFlow";
import { NavigationDiagram } from "@/components/flows/NavigationDiagram";
import { TeamFlow } from "@/components/flows/TeamFlow";
import { UnitFlow } from "@/components/flows/UnitFlow";
import { InviteUserFlow } from "@/components/flows/InviteUserFlow";
import { UserManagementFlow } from "@/components/flows/UserManagementFlow";
import { WhitelistFlow } from "@/components/flows/WhitelistFlow";
import { 
  Building2, 
  Users, 
  Shield, 
  Clock, 
  Target,
  FileText
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Executive Summary */}
        <section className="mb-8 animate-fade-in">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-2">Executive Summary</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This document outlines the complete user flows for the OGCIO Form Management Platform—an 
                  internal access control system designed to manage civil servants' access to form submissions 
                  across government teams and their units.
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <StatCard 
                icon={<Building2 className="w-4 h-4" />}
                label="Teams"
                value="Hierarchical"
              />
              <StatCard 
                icon={<Users className="w-4 h-4" />}
                label="Role Types"
                value="2"
              />
              <StatCard 
                icon={<Shield className="w-4 h-4" />}
                label="Whitelist"
                value="Domain-based"
              />
              <StatCard 
                icon={<Clock className="w-4 h-4" />}
                label="Session"
                value="8 hours"
              />
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Success Metrics</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { metric: "User Onboarding", target: "< 2 min", desc: "Time from invite to active" },
              { metric: "Access Review", target: "< 30 sec", desc: "Time to verify permissions" },
              { metric: "System Adoption", target: "100%", desc: "Teams using platform" },
              { metric: "Error Rate", target: "< 1%", desc: "Invalid invitations" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-4">
                <div className="text-2xl font-bold text-primary">{item.target}</div>
                <div className="text-sm font-medium mt-1">{item.metric}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Role Legend */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h2 className="text-lg font-bold mb-4">Role & Flow Legend</h2>
          <RoleLegend />
        </section>

        {/* Flows */}
        <div className="space-y-8">
          <div className="animate-slide-in-bottom" style={{ animationDelay: "300ms" }}>
            <AuthenticationFlow />
          </div>
          
          <div className="animate-slide-in-bottom" style={{ animationDelay: "400ms" }}>
            <NavigationDiagram />
          </div>
          
          <div className="animate-slide-in-bottom" style={{ animationDelay: "500ms" }}>
            <TeamFlow />
          </div>
          
          <div className="animate-slide-in-bottom" style={{ animationDelay: "600ms" }}>
            <UnitFlow />
          </div>
          
          <div className="animate-slide-in-bottom" style={{ animationDelay: "700ms" }}>
            <InviteUserFlow />
          </div>
          
          <div className="animate-slide-in-bottom" style={{ animationDelay: "800ms" }}>
            <UserManagementFlow />
          </div>
          
          <div className="animate-slide-in-bottom" style={{ animationDelay: "900ms" }}>
            <WhitelistFlow />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>OGCIO Form Management Platform • Version 1.0 • December 2024</p>
            <div className="flex items-center gap-4">
              <span>WCAG 2.1 AA Compliant</span>
              <span>•</span>
              <span>GDPR Ready</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

function StatCard({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
      <div className="p-2 bg-primary/10 rounded-md text-primary">
        {icon}
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default Index;
