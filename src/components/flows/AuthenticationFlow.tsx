import { FlowNode, FlowConnector, FlowBranch } from "@/components/FlowNode";
import { FlowSection } from "@/components/FlowSection";
import { LogIn, Mail, Lock, Check, X, LayoutDashboard } from "lucide-react";

export function AuthenticationFlow() {
  return (
    <FlowSection
      title="Authentication Flow"
      description="Login and session management for all users"
      icon={<LogIn className="w-5 h-5" />}
    >
      <div className="flex flex-col items-center">
        <FlowNode
          type="start"
          title="Access Platform"
          description="User navigates to /login"
          icon={<LogIn className="w-4 h-4" />}
          delay={1}
        />
        <FlowConnector direction="down" />
        
        <FlowNode
          type="action"
          title="Enter Credentials"
          description="Email + Password form"
          icon={<Mail className="w-4 h-4" />}
          delay={2}
        />
        <FlowConnector direction="down" />
        
        <FlowNode
          type="decision"
          title="Valid Credentials?"
          description="System validates email & password"
          icon={<Lock className="w-4 h-4" />}
          delay={3}
          className="bg-flow-decision"
        />
        
        <FlowBranch className="mt-4">
          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold text-success mb-2">Yes</div>
            <FlowNode
              type="action"
              title="Create Session"
              description="8-hour timeout, secure cookie"
              icon={<Check className="w-4 h-4 text-success" />}
              delay={4}
            />
            <FlowConnector direction="down" />
            <FlowNode
              type="page"
              title="Dashboard"
              description="Role-specific view"
              icon={<LayoutDashboard className="w-4 h-4" />}
              delay={5}
              roleAccess={["super-admin", "admin"]}
            />
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold text-destructive mb-2">No</div>
            <FlowNode
              type="end"
              title="Show Error"
              description="Invalid credentials toast"
              icon={<X className="w-4 h-4 text-destructive" />}
              delay={4}
            />
            <FlowConnector direction="down" />
            <div className="text-xs text-muted-foreground">Return to login</div>
          </div>
        </FlowBranch>
      </div>
      
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Password Requirements</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Minimum 8 characters</li>
          <li>• At least one uppercase letter</li>
          <li>• At least one number</li>
          <li>• At least one special character</li>
        </ul>
      </div>
    </FlowSection>
  );
}
