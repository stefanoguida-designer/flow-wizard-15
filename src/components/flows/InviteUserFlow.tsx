import { FlowNode, FlowConnector, FlowBranch } from "@/components/FlowNode";
import { FlowSection } from "@/components/FlowSection";
import { UserPlus, Mail, Shield, Users, Send, Check, X, AlertTriangle } from "lucide-react";

export function InviteUserFlow() {
  return (
    <FlowSection
      title="Invite User Flow"
      description="Process for inviting new civil servants to the platform"
      icon={<UserPlus className="w-5 h-5" />}
    >
      <div className="flex flex-col items-center">
        <FlowNode
          type="start"
          title="Click 'Invite User'"
          description="From Users page"
          icon={<UserPlus className="w-4 h-4" />}
          delay={1}
          roleAccess={["super-admin", "admin"]}
        />
        <FlowConnector direction="down" />
        
        <FlowNode
          type="action"
          title="Enter Email Address"
          description="Civil servant's government email"
          icon={<Mail className="w-4 h-4" />}
          delay={2}
        />
        <FlowConnector direction="down" />
        
        <FlowNode
          type="decision"
          title="Email Domain Whitelisted?"
          description="System extracts domain → checks whitelist table"
          icon={<Shield className="w-4 h-4" />}
          delay={3}
          className="bg-flow-decision"
        />
        
        <FlowBranch className="mt-4">
          <div className="flex flex-col items-center max-w-xs">
            <div className="text-xs font-semibold text-success mb-2">Domain Found</div>
            <FlowNode
              type="action"
              title="Select Role"
              description="Admin can only select 'Admin'"
              icon={<Shield className="w-4 h-4" />}
              delay={4}
            />
            <FlowConnector direction="down" />
            <FlowNode
              type="action"
              title="Select Unit(s)"
              description="Multi-select dropdown"
              icon={<Users className="w-4 h-4" />}
              delay={5}
            />
            <FlowConnector direction="down" />
            <FlowNode
              type="action"
              title="Send Invitation"
              description="Click confirm button"
              icon={<Send className="w-4 h-4" />}
              delay={6}
            />
            <FlowConnector direction="down" />
            <FlowNode
              type="page"
              title="Success"
              description="'Invitation sent to [email]'"
              icon={<Check className="w-4 h-4 text-success" />}
              delay={7}
            />
            <div className="mt-3 text-xs text-muted-foreground text-center">
              User appears in list with<br />
              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-warning/20 text-warning rounded-full text-[10px] font-medium">
                <AlertTriangle className="w-3 h-3" /> Pending
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center max-w-xs">
            <div className="text-xs font-semibold text-destructive mb-2">Not Found</div>
            <FlowNode
              type="end"
              title="Error Toast"
              description="'[email] is not part of a whitelisted agency'"
              icon={<X className="w-4 h-4 text-destructive" />}
              delay={4}
            />
            <FlowConnector direction="down" />
            <div className="text-xs text-muted-foreground text-center">
              Flow ends<br />
              <span className="text-[10px]">User must contact Super Admin to whitelist domain</span>
            </div>
          </div>
        </FlowBranch>
      </div>
      
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-role-super-admin" />
            Super Admin Can
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Assign any role (Super Admin or Admin)</li>
            <li>• Assign to any unit</li>
          </ul>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-info" />
            Admin Can
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Assign 'Admin' role only</li>
            <li>• Cannot assign Super Admin role</li>
          </ul>
        </div>
      </div>
    </FlowSection>
  );
}
