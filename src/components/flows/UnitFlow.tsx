import { FlowNode, FlowConnector, FlowBranch } from "@/components/FlowNode";
import { FlowSection } from "@/components/FlowSection";
import { Boxes, Plus, Edit, Trash2, Check, AlertTriangle, Users } from "lucide-react";

export function UnitFlow() {
  return (
    <FlowSection
      title="Unit Management Flow"
      description="Create and manage units within departments (Super Admin only, Admin read-only)"
      icon={<Boxes className="w-5 h-5" />}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Create Unit */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> Create Unit
          </h4>
          <FlowNode
            type="start"
            title="Click 'Add Unit'"
            description="Units page"
            icon={<Plus className="w-4 h-4" />}
            delay={1}
            roleAccess={["super-admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Select Department"
            description="Dropdown selection"
            delay={2}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Fill Unit Details"
            description="Name, Local Authority (Dublin, Cork, etc.)"
            delay={3}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="decision"
            title="Name Unique in Dept?"
            delay={4}
            className="bg-flow-decision"
          />
          <FlowBranch className="mt-3">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-success font-medium mb-1">Yes</span>
              <FlowNode
                type="page"
                title="Created"
                description="Unit linked to department"
                icon={<Check className="w-4 h-4 text-success" />}
                delay={5}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-destructive font-medium mb-1">No</span>
              <FlowNode
                type="end"
                title="Error"
                description="Duplicate name"
                delay={5}
                className="text-xs"
              />
            </div>
          </FlowBranch>
        </div>

        {/* Delete Unit */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-destructive" /> Delete Unit
          </h4>
          <FlowNode
            type="start"
            title="Click 'Delete'"
            description="Unit row action"
            icon={<Trash2 className="w-4 h-4" />}
            delay={1}
            roleAccess={["super-admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="decision"
            title="Has Assigned Users?"
            delay={2}
            className="bg-flow-decision"
          />
          <FlowBranch className="mt-3">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-warning font-medium mb-1">Yes</span>
              <FlowNode
                type="action"
                title="Warning Shown"
                description="'X users will be affected'"
                icon={<AlertTriangle className="w-4 h-4 text-warning" />}
                delay={3}
              />
              <FlowConnector direction="down" />
              <FlowNode
                type="action"
                title="Confirm Deletion"
                description="Removes all user assignments"
                delay={4}
              />
              <FlowConnector direction="down" />
              <FlowNode
                type="page"
                title="Deleted"
                description="Users unassigned"
                icon={<Check className="w-4 h-4 text-success" />}
                delay={5}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-success font-medium mb-1">No</span>
              <FlowNode
                type="action"
                title="Simple Confirm"
                description="Standard confirmation"
                delay={3}
              />
              <FlowConnector direction="down" />
              <FlowNode
                type="page"
                title="Deleted"
                icon={<Check className="w-4 h-4 text-success" />}
                delay={4}
              />
            </div>
          </FlowBranch>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-semibold mb-3">Local Authorities (Predefined)</h4>
        <div className="flex flex-wrap gap-2">
          {["Dublin", "Cork", "Galway", "Limerick", "Waterford", "Kilkenny", "Wexford"].map((la) => (
            <span key={la} className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs font-medium">
              {la}
            </span>
          ))}
          <span className="px-2 py-1 text-muted-foreground text-xs">+ 24 more...</span>
        </div>
      </div>
    </FlowSection>
  );
}
