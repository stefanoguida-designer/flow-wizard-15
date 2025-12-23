import { FlowNode, FlowConnector, FlowBranch } from "@/components/FlowNode";
import { FlowSection } from "@/components/FlowSection";
import { Building2, Plus, Edit, Trash2, Check, X, AlertCircle } from "lucide-react";

export function DepartmentFlow() {
  return (
    <FlowSection
      title="Department Management Flow"
      description="Create, edit, and delete government departments (Super Admin only)"
      icon={<Building2 className="w-5 h-5" />}
    >
      <div className="grid md:grid-cols-3 gap-8">
        {/* Create Department */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> Create Department
          </h4>
          <FlowNode
            type="start"
            title="Click 'Add Department'"
            description="Departments page"
            icon={<Plus className="w-4 h-4" />}
            delay={1}
            roleAccess={["super-admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Fill Form"
            description="Name (required), Description"
            delay={2}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="decision"
            title="Name Unique?"
            description="2-100 chars, unique"
            delay={3}
            className="bg-flow-decision"
          />
          <FlowBranch className="mt-3">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-success font-medium mb-1">Yes</span>
              <FlowNode
                type="page"
                title="Created"
                icon={<Check className="w-4 h-4 text-success" />}
                delay={4}
                className="text-xs px-3 py-2"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-destructive font-medium mb-1">No</span>
              <FlowNode
                type="end"
                title="Error"
                icon={<X className="w-4 h-4" />}
                delay={4}
                className="text-xs px-3 py-2"
              />
            </div>
          </FlowBranch>
        </div>

        {/* Edit Department */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Edit className="w-4 h-4 text-primary" /> Edit Department
          </h4>
          <FlowNode
            type="start"
            title="Click 'Edit'"
            description="Department row"
            icon={<Edit className="w-4 h-4" />}
            delay={1}
            roleAccess={["super-admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Modify Fields"
            description="Update name or description"
            delay={2}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Save Changes"
            description="Validate unique name"
            delay={3}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="page"
            title="Updated"
            description="Success toast shown"
            icon={<Check className="w-4 h-4 text-success" />}
            delay={4}
          />
        </div>

        {/* Delete Department */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-destructive" /> Delete Department
          </h4>
          <FlowNode
            type="start"
            title="Click 'Delete'"
            description="Department row"
            icon={<Trash2 className="w-4 h-4" />}
            delay={1}
            roleAccess={["super-admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="decision"
            title="Has Units?"
            description="Check for existing units"
            delay={2}
            className="bg-flow-decision"
          />
          <FlowBranch className="mt-3">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-success font-medium mb-1">No</span>
              <FlowNode
                type="action"
                title="Confirm"
                description="Dialog shown"
                delay={3}
                className="text-xs px-3 py-2"
              />
              <FlowConnector direction="down" />
              <FlowNode
                type="page"
                title="Deleted"
                icon={<Check className="w-4 h-4 text-success" />}
                delay={4}
                className="text-xs px-3 py-2"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-destructive font-medium mb-1">Yes</span>
              <FlowNode
                type="end"
                title="Blocked"
                description="Cannot delete"
                icon={<AlertCircle className="w-4 h-4" />}
                delay={3}
                className="text-xs px-3 py-2"
              />
            </div>
          </FlowBranch>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
        <p className="text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="font-medium">Constraint:</span>
          <span className="text-muted-foreground">Cannot delete department with existing units - must delete units first</span>
        </p>
      </div>
    </FlowSection>
  );
}
