import { FlowNode, FlowConnector, FlowBranch } from "@/components/FlowNode";
import { FlowSection } from "@/components/FlowSection";
import { Users, Edit, Trash2, Check, Shield, AlertCircle, Boxes } from "lucide-react";

export function UserManagementFlow() {
  return (
    <FlowSection
      title="User Management Flow"
      description="Edit user roles, assignments, and status"
      icon={<Users className="w-5 h-5" />}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Edit User */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Edit className="w-4 h-4 text-primary" /> Edit User
          </h4>
          <FlowNode
            type="start"
            title="Find User"
            description="Search by name or email"
            delay={1}
            roleAccess={["super-admin", "admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Click 'Edit'"
            description="User row action"
            icon={<Edit className="w-4 h-4" />}
            delay={2}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="decision"
            title="Is Target Super Admin?"
            delay={3}
            className="bg-flow-decision"
          />
          <FlowBranch className="mt-3">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-success font-medium mb-1">No</span>
              <FlowNode
                type="action"
                title="Edit Form"
                description="Role, Units, Status"
                delay={4}
              />
              <FlowConnector direction="down" />
              <FlowNode
                type="page"
                title="Updated"
                icon={<Check className="w-4 h-4 text-success" />}
                delay={5}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-warning font-medium mb-1">Yes</span>
              <FlowNode
                type="decision"
                title="Current User SA?"
                delay={4}
                className="bg-flow-decision text-xs"
              />
              <FlowBranch className="mt-2">
                <div className="flex flex-col items-center">
                  <span className="text-[8px] text-success mb-1">Yes</span>
                  <FlowNode
                    type="page"
                    title="Can Edit"
                    icon={<Check className="w-3 h-3" />}
                    delay={5}
                    className="text-[10px] px-2 py-1"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[8px] text-destructive mb-1">No</span>
                  <FlowNode
                    type="end"
                    title="Blocked"
                    icon={<AlertCircle className="w-3 h-3" />}
                    delay={5}
                    className="text-[10px] px-2 py-1"
                  />
                </div>
              </FlowBranch>
            </div>
          </FlowBranch>
        </div>

        {/* Remove from Unit */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Boxes className="w-4 h-4 text-warning" /> Remove from Unit
          </h4>
          <FlowNode
            type="start"
            title="Find User"
            description="Users page"
            delay={1}
            roleAccess={["super-admin", "admin"]}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Click 'Edit'"
            description="Open edit modal"
            delay={2}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Deselect Unit"
            description="In multi-select dropdown"
            icon={<Boxes className="w-4 h-4" />}
            delay={3}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="action"
            title="Save Changes"
            delay={4}
          />
          <FlowConnector direction="down" />
          <FlowNode
            type="page"
            title="Access Updated"
            description="User immediately loses unit access"
            icon={<Check className="w-4 h-4 text-success" />}
            delay={5}
          />
        </div>
      </div>

      {/* Delete User */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-destructive" /> Delete User
        </h4>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <FlowNode
            type="start"
            title="Click 'Delete'"
            description="User row action"
            icon={<Trash2 className="w-4 h-4" />}
            delay={1}
            roleAccess={["super-admin", "admin"]}
            className="w-48"
          />
          <FlowConnector direction="right" className="hidden md:flex" />
          <FlowConnector direction="down" className="md:hidden" />
          <FlowNode
            type="decision"
            title="Permission Check"
            description="SA can delete any (except self), Admin can't delete SA"
            delay={2}
            className="bg-flow-decision w-64"
          />
          <FlowConnector direction="right" className="hidden md:flex" />
          <FlowConnector direction="down" className="md:hidden" />
          <FlowNode
            type="action"
            title="Confirm Deletion"
            description="Confirmation dialog"
            delay={3}
            className="w-48"
          />
          <FlowConnector direction="right" className="hidden md:flex" />
          <FlowConnector direction="down" className="md:hidden" />
          <FlowNode
            type="page"
            title="User Removed"
            description="Soft/Hard delete based on config"
            icon={<Check className="w-4 h-4 text-success" />}
            delay={4}
            className="w-48"
          />
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-role-super-admin/10 border border-role-super-admin/20 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-role-super-admin" />
            Super Admin Privileges
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Edit any user's role, units, status</li>
            <li>• Delete any user except themselves</li>
            <li>• Assign Super Admin role</li>
          </ul>
        </div>
        <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-info" />
            Admin Limitations
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Cannot edit Super Admin users</li>
            <li>• Cannot delete Super Admin users</li>
            <li>• Can only assign Admin role (not SA)</li>
          </ul>
        </div>
      </div>
    </FlowSection>
  );
}
