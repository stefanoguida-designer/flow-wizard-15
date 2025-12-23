import { FlowNode, FlowConnector, FlowBranch } from "@/components/FlowNode";
import { FlowSection } from "@/components/FlowSection";
import { Shield, Plus, Trash2, Check, AlertTriangle, Building } from "lucide-react";

export function WhitelistFlow() {
  return (
    <FlowSection
      title="Whitelist Management Flow"
      description="Control which email domains can be invited (Super Admin only)"
      icon={<Shield className="w-5 h-5" />}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Add to Whitelist */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> Add Domain
          </h4>
          <FlowNode
            type="start"
            title="Click 'Add Domain'"
            description="Settings → Whitelisted Agencies"
            icon={<Plus className="w-4 h-4" />}
            delay={1}
            roleAccess={["super-admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Enter Domain"
            description="e.g., 'ogcio.gov.ie'"
            delay={2}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Enter Agency Name"
            description="e.g., 'Office of the Government CIO'"
            icon={<Building className="w-4 h-4" />}
            delay={3}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="decision"
            title="Domain Unique?"
            description="Format & uniqueness check"
            delay={4}
            className="bg-flow-decision"
          />
          <FlowBranch className="mt-3">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-success font-medium mb-1">Yes</span>
              <FlowNode
                type="page"
                title="Added"
                description="Domain now whitelisted"
                icon={<Check className="w-4 h-4 text-success" />}
                delay={5}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-destructive font-medium mb-1">No</span>
              <FlowNode
                type="end"
                title="Error"
                description="Already exists"
                delay={5}
                className="text-xs"
              />
            </div>
          </FlowBranch>
        </div>

        {/* Remove from Whitelist */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-destructive" /> Remove Domain
          </h4>
          <FlowNode
            type="start"
            title="Click 'Remove'"
            description="Domain row action"
            icon={<Trash2 className="w-4 h-4" />}
            delay={1}
            roleAccess={["super-admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Show Warning"
            description="Existing users remain active"
            icon={<AlertTriangle className="w-4 h-4 text-warning" />}
            delay={2}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Confirm Removal"
            description="Acknowledge implications"
            delay={3}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="page"
            title="Removed"
            description="No new invites from this domain"
            icon={<Check className="w-4 h-4 text-success" />}
            delay={4}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Important Behaviour</p>
            <p className="text-xs text-muted-foreground mt-1">
              Removing a domain from the whitelist does <strong>not</strong> affect existing users from that domain. 
              It only prevents new invitations. To remove access for existing users, delete them individually from Users management.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-semibold mb-3">Example Whitelisted Domains</h4>
        <div className="space-y-2">
          {[
            { domain: "ogcio.gov.ie", agency: "Office of the Government CIO" },
            { domain: "gov.ie", agency: "Government of Ireland" },
            { domain: "hse.ie", agency: "Health Service Executive" },
          ].map((item) => (
            <div key={item.domain} className="flex items-center gap-3 text-xs">
              <code className="px-2 py-1 bg-primary/10 text-primary rounded font-mono">{item.domain}</code>
              <span className="text-muted-foreground">{item.agency}</span>
            </div>
          ))}
        </div>
      </div>
    </FlowSection>
  );
}
