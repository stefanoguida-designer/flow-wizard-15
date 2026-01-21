import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { users, departments, units, getUserActivityLogs, type User as UserType, type UserAccess, type UserRole } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  UserPlus, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Building2, 
  Mail, 
  Calendar,
  History,
  User as UserIcon,
  X,
  MoreHorizontal,
  Pencil,
  Trash2
} from "lucide-react";
import { format } from "date-fns";

// Get department abbreviation helper
function getDeptAbbreviation(departmentName: string): string {
  const dept = departments.find(d => d.name === departmentName);
  return dept?.abbreviation || departmentName;
}

// Access Tag Component - stops propagation to prevent opening the sidebar
function AccessTag({ access }: { access: UserAccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const abbreviation = getDeptAbbreviation(access.departmentName);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (access.fullDepartment) {
    return (
      <Badge className="bg-primary text-primary-foreground">
        {abbreviation}
      </Badge>
    );
  }

  if (access.unitIds.length === 1) {
    return (
      <Badge variant="outline" className="border-primary text-primary">
        {abbreviation}/{access.unitNames[0]}
      </Badge>
    );
  }

  // Multiple units - clickable to expand inline
  return (
    <div className="inline-flex flex-col">
      <Badge 
        variant="outline" 
        className="border-primary text-primary cursor-pointer hover:bg-primary/10"
        onClick={handleToggle}
      >
        {abbreviation} ({access.unitIds.length} units)
        {isOpen ? (
          <ChevronDown className="h-3 w-3 ml-1" />
        ) : (
          <ChevronRight className="h-3 w-3 ml-1" />
        )}
      </Badge>
      {isOpen && (
        <div className="mt-1 ml-2 space-y-1">
          {access.unitNames.map((unitName, index) => (
            <div key={index} className="text-xs text-muted-foreground pl-2 border-l-2 border-primary/30">
              {unitName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Role Badge Component
function RoleBadge({ role }: { role: UserRole }) {
  const roleConfig = {
    admin: { label: 'Admin', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
    editor: { label: 'Editor', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
    viewer: { label: 'Viewer', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' }
  };
  
  const config = roleConfig[role];
  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
}

// Edit User Permissions Modal
function EditPermissionsModal({ user, onClose, onSave }: { user: UserType; onClose: () => void; onSave: (user: UserType, access: Map<string, { fullDepartment: boolean; unitIds: Set<string>; role: UserRole }>) => void }) {
  // Initialize with user's current access
  const initialAccess = new Map<string, { fullDepartment: boolean; unitIds: Set<string>; role: UserRole }>();
  user.access.forEach(a => {
    initialAccess.set(a.departmentId, {
      fullDepartment: a.fullDepartment,
      unitIds: new Set(a.unitIds),
      role: a.role
    });
  });
  
  const [selectedAccess, setSelectedAccess] = useState<Map<string, { fullDepartment: boolean; unitIds: Set<string>; role: UserRole }>>(initialAccess);

  const toggleDepartment = (deptId: string, full: boolean) => {
    const newAccess = new Map(selectedAccess);
    const current = newAccess.get(deptId);
    
    if (full) {
      if (current?.fullDepartment) {
        newAccess.delete(deptId);
      } else {
        newAccess.set(deptId, { fullDepartment: true, unitIds: new Set(), role: current?.role || 'viewer' });
      }
    }
    setSelectedAccess(newAccess);
  };

  const toggleUnit = (deptId: string, unitId: string) => {
    const newAccess = new Map(selectedAccess);
    const current = newAccess.get(deptId) || { fullDepartment: false, unitIds: new Set<string>(), role: 'viewer' as UserRole };
    
    const newUnitIds = new Set(current.unitIds);
    if (newUnitIds.has(unitId)) {
      newUnitIds.delete(unitId);
      if (newUnitIds.size === 0) {
        newAccess.delete(deptId);
      } else {
        newAccess.set(deptId, { fullDepartment: false, unitIds: newUnitIds, role: current.role });
      }
    } else {
      newUnitIds.add(unitId);
      newAccess.set(deptId, { fullDepartment: false, unitIds: newUnitIds, role: current.role });
    }
    setSelectedAccess(newAccess);
  };

  const setRole = (deptId: string, role: UserRole) => {
    const newAccess = new Map(selectedAccess);
    const current = newAccess.get(deptId);
    if (current) {
      newAccess.set(deptId, { ...current, role });
      setSelectedAccess(newAccess);
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
      <DialogHeader className="flex-shrink-0">
        <DialogTitle>Edit Permissions</DialogTitle>
        <DialogDescription>
          Modify access permissions for {user.name}.
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex-1 overflow-hidden flex flex-col min-h-0 py-4">
        <div className="p-3 bg-muted/50 rounded-lg flex-shrink-0 mb-4">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>

        <Separator className="flex-shrink-0" />

        <div className="flex-1 min-h-0 space-y-3 mt-4">
          <Label className="flex-shrink-0">Access Permissions</Label>
          <p className="text-sm text-muted-foreground flex-shrink-0">
            Select which departments and units this user should have access to, and assign a role for each.
          </p>
          
          <ScrollArea className="flex-1 h-[250px] rounded-md border p-4">
            <div className="space-y-4">
              {departments.map((dept) => {
                const deptUnits = units.filter(u => u.departmentId === dept.id);
                const currentAccess = selectedAccess.get(dept.id);
                const isFullDept = currentAccess?.fullDepartment || false;
                const hasAccess = currentAccess && (currentAccess.fullDepartment || currentAccess.unitIds.size > 0);
                
                return (
                  <div key={dept.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`edit-dept-${dept.id}`}
                          checked={isFullDept}
                          onCheckedChange={() => toggleDepartment(dept.id, true)}
                        />
                        <label 
                          htmlFor={`edit-dept-${dept.id}`}
                          className="text-sm font-medium cursor-pointer flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4 text-primary" />
                          {dept.name}
                          <span className="text-xs text-muted-foreground">(full access)</span>
                        </label>
                      </div>
                      {hasAccess && (
                        <Select value={currentAccess?.role || 'viewer'} onValueChange={(v) => setRole(dept.id, v as UserRole)}>
                          <SelectTrigger className="w-28 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    
                    {!isFullDept && deptUnits.length > 0 && (
                      <div className="ml-6 space-y-1 border-l-2 border-muted pl-4">
                        {deptUnits.map((unit) => (
                          <div key={unit.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`edit-unit-${unit.id}`}
                              checked={currentAccess?.unitIds.has(unit.id) || false}
                              onCheckedChange={() => toggleUnit(dept.id, unit.id)}
                            />
                            <label 
                              htmlFor={`edit-unit-${unit.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {unit.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      <DialogFooter className="flex-shrink-0 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onSave(user, selectedAccess)} disabled={selectedAccess.size === 0}>
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

// Invite User Modal
function InviteUserModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedAccess, setSelectedAccess] = useState<Map<string, { fullDepartment: boolean; unitIds: Set<string>; role: UserRole }>>(new Map());

  const toggleDepartment = (deptId: string, full: boolean) => {
    const newAccess = new Map(selectedAccess);
    const current = newAccess.get(deptId);
    
    if (full) {
      if (current?.fullDepartment) {
        newAccess.delete(deptId);
      } else {
        newAccess.set(deptId, { fullDepartment: true, unitIds: new Set(), role: current?.role || 'viewer' });
      }
    }
    setSelectedAccess(newAccess);
  };

  const toggleUnit = (deptId: string, unitId: string) => {
    const newAccess = new Map(selectedAccess);
    const current = newAccess.get(deptId) || { fullDepartment: false, unitIds: new Set<string>(), role: 'viewer' as UserRole };
    
    const newUnitIds = new Set(current.unitIds);
    if (newUnitIds.has(unitId)) {
      newUnitIds.delete(unitId);
      if (newUnitIds.size === 0) {
        newAccess.delete(deptId);
      } else {
        newAccess.set(deptId, { fullDepartment: false, unitIds: newUnitIds, role: current.role });
      }
    } else {
      newUnitIds.add(unitId);
      newAccess.set(deptId, { fullDepartment: false, unitIds: newUnitIds, role: current.role });
    }
    setSelectedAccess(newAccess);
  };

  const setRole = (deptId: string, role: UserRole) => {
    const newAccess = new Map(selectedAccess);
    const current = newAccess.get(deptId);
    if (current) {
      newAccess.set(deptId, { ...current, role });
      setSelectedAccess(newAccess);
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle>Invite User</DialogTitle>
        <DialogDescription>
          Invite a civil servant to access the platform. They will receive an email invitation.
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex-1 overflow-hidden flex flex-col space-y-6 py-4">
        <div className="grid grid-cols-2 gap-4 flex-shrink-0">
          <div className="space-y-2">
            <Label htmlFor="invite-name">Full Name</Label>
            <Input
              id="invite-name"
              placeholder="e.g., John O'Brien"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-email">Email Address</Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="e.g., john.obrien@gov.ie"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <Separator className="flex-shrink-0" />

        <div className="flex-1 min-h-0 space-y-3">
          <Label className="flex-shrink-0">Access Permissions</Label>
          <p className="text-sm text-muted-foreground flex-shrink-0">
            Select which departments and units this user should have access to, and assign a role for each.
          </p>
          
          <ScrollArea className="h-[250px] rounded-md border p-4">
            <div className="space-y-4">
              {departments.map((dept) => {
                const deptUnits = units.filter(u => u.departmentId === dept.id);
                const currentAccess = selectedAccess.get(dept.id);
                const isFullDept = currentAccess?.fullDepartment || false;
                const hasAccess = currentAccess && (currentAccess.fullDepartment || currentAccess.unitIds.size > 0);
                
                return (
                  <div key={dept.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`dept-${dept.id}`}
                          checked={isFullDept}
                          onCheckedChange={() => toggleDepartment(dept.id, true)}
                        />
                        <label 
                          htmlFor={`dept-${dept.id}`}
                          className="text-sm font-medium cursor-pointer flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4 text-primary" />
                          {dept.name}
                          <span className="text-xs text-muted-foreground">(full access)</span>
                        </label>
                      </div>
                      {hasAccess && (
                        <Select value={currentAccess?.role || 'viewer'} onValueChange={(v) => setRole(dept.id, v as UserRole)}>
                          <SelectTrigger className="w-28 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    
                    {!isFullDept && deptUnits.length > 0 && (
                      <div className="ml-6 space-y-1 border-l-2 border-muted pl-4">
                        {deptUnits.map((unit) => (
                          <div key={unit.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`unit-${unit.id}`}
                              checked={currentAccess?.unitIds.has(unit.id) || false}
                              onCheckedChange={() => toggleUnit(dept.id, unit.id)}
                            />
                            <label 
                              htmlFor={`unit-${unit.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {unit.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      <DialogFooter className="flex-shrink-0">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!email || !name || selectedAccess.size === 0}>
          <UserPlus className="h-4 w-4 mr-2" />
          Send Invitation
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

// User Detail Sidebar
function UserDetailSheet({ 
  user, 
  open, 
  onClose,
  onEditPermissions,
  onDeleteUser
}: { 
  user: UserType | null; 
  open: boolean; 
  onClose: () => void;
  onEditPermissions: (user: UserType) => void;
  onDeleteUser: (user: UserType) => void;
}) {
  const logs = user ? getUserActivityLogs(user.id) : [];
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:max-w-[500px]">
        <SheetHeader>
        <SheetTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <UserIcon className="h-5 w-5 text-primary" />
            </div>
            {user.name}
          </SheetTitle>
          <SheetDescription>{user.email}</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Added on {user.addedAt} by {user.addedBy}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Access Permissions</h4>
              <div className="space-y-3">
                {user.access.map((access, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">{access.departmentName}</span>
                        {access.fullDepartment && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Full Access
                          </Badge>
                        )}
                      </div>
                      <RoleBadge role={access.role} />
                    </div>
                    {!access.fullDepartment && access.unitNames.length > 0 && (
                      <div className="ml-6 space-y-1">
                        {access.unitNames.map((unitName, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                            {unitName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  onEditPermissions(user);
                  onClose();
                }}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Permissions
              </Button>
              <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex-1">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{user.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => {
                        onDeleteUser(user);
                        onClose();
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <ScrollArea className="h-[400px]">
              {logs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No activity logs found</p>
                </div>
              ) : (
              <div className="space-y-3">
                  {logs.map((log) => (
                    <a 
                      key={log.id} 
                      href={`/activity-logs?highlight=${log.id}`}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="flex-1">
                        <p className="text-sm">{log.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span>{log.performedBy}</span>
                          <span>•</span>
                          <span>{format(new Date(log.timestamp), "MMM d, yyyy 'at' h:mm a")}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

export default function UsersPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState(searchParams.get("department") || "all");
  const [unitFilter, setUnitFilter] = useState(searchParams.get("unit") || "all");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [userList, setUserList] = useState(users);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  const filteredUsers = useMemo(() => {
    return userList.filter(user => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!user.name.toLowerCase().includes(query) && !user.email.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Department filter
      if (departmentFilter !== "all") {
        if (!user.access.some(a => a.departmentId === departmentFilter)) {
          return false;
        }
      }

      // Unit filter
      if (unitFilter !== "all") {
        if (!user.access.some(a => a.unitIds.includes(unitFilter))) {
          return false;
        }
      }

    return true;
    });
  }, [searchQuery, departmentFilter, unitFilter, userList]);

  const availableUnits = useMemo(() => {
    if (departmentFilter === "all") return units;
    return units.filter(u => u.departmentId === departmentFilter);
  }, [departmentFilter]);

  const handleDeleteUser = (user: UserType) => {
    setUserList(userList.filter(u => u.id !== user.id));
    setSelectedUser(null);
    setUserToDelete(null);
    setSelectedUsers(prev => {
      const next = new Set(prev);
      next.delete(user.id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    setUserList(userList.filter(u => !selectedUsers.has(u.id)));
    setSelectedUsers(new Set());
  };

  const toggleUserSelection = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUsers(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const toggleAllUsers = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const handleEditPermissions = (user: UserType) => {
    setEditingUser(user);
    setIsEditOpen(true);
  };

  const handleSavePermissions = (user: UserType, accessMap: Map<string, { fullDepartment: boolean; unitIds: Set<string>; role: UserRole }>) => {
    const newAccess: UserAccess[] = [];
    accessMap.forEach((value, deptId) => {
      const dept = departments.find(d => d.id === deptId);
      if (dept) {
        const unitNames = value.fullDepartment 
          ? [] 
          : Array.from(value.unitIds).map(uid => units.find(u => u.id === uid)?.name || '');
        newAccess.push({
          departmentId: deptId,
          departmentName: dept.name,
          fullDepartment: value.fullDepartment,
          unitIds: Array.from(value.unitIds),
          unitNames,
          role: value.role
        });
      }
    });
    
    setUserList(userList.map(u => u.id === user.id ? { ...u, access: newAccess } : u));
    setIsEditOpen(false);
    setEditingUser(null);
  };

  return (
    <AppLayout
      title="Users"
    >
      <p className="text-muted-foreground mb-6">
        Manage civil servants' access to form submissions across departments and units.
      </p>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {selectedUsers.size > 0 ? (
          // Bulk Actions Mode
          <>
            <div className="flex items-center gap-3 flex-1">
              <Badge variant="secondary" className="px-3 py-1.5">
                {selectedUsers.size} selected
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedUsers(new Set())}
              >
                <X className="h-4 w-4 mr-1" />
                Clear selection
              </Button>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Users</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedUsers.size} selected user{selectedUsers.size > 1 ? 's' : ''}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleBulkDelete}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          // Normal Mode
          <>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={departmentFilter} onValueChange={(v) => { setDepartmentFilter(v); setUnitFilter("all"); }}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.abbreviation}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {departmentFilter !== "all" && (
              <Select value={unitFilter} onValueChange={setUnitFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by unit" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Units</SelectItem>
                  {availableUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
              <DialogTrigger asChild>
                <Button className="ml-auto">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </DialogTrigger>
              <InviteUserModal onClose={() => setIsInviteOpen(false)} />
            </Dialog>
          </>
        )}
      </div>

      {/* Active Filters */}
      {(departmentFilter !== "all" || unitFilter !== "all") && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {departmentFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {departments.find(d => d.id === departmentFilter)?.abbreviation}
              <button onClick={() => { setDepartmentFilter("all"); setUnitFilter("all"); }}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {unitFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {units.find(u => u.id === unitFilter)?.name}
              <button onClick={() => setUnitFilter("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={toggleAllUsers}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Has Access To</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No users found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow 
                  key={user.id} 
                  className={`cursor-pointer hover:bg-muted/50 ${selectedUsers.has(user.id) ? 'bg-muted/30' : ''}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedUsers.has(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id, { stopPropagation: () => {} } as React.MouseEvent)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 items-start">
                      {user.access.map((access, index) => (
                        <AccessTag key={index} access={access} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPermissions(user);
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUserToDelete(user);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* User Detail Sidebar */}
      <UserDetailSheet 
        user={selectedUser} 
        open={!!selectedUser} 
        onClose={() => setSelectedUser(null)}
        onEditPermissions={handleEditPermissions}
        onDeleteUser={handleDeleteUser}
      />

      {/* Edit Permissions Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        {editingUser && (
          <EditPermissionsModal 
            user={editingUser} 
            onClose={() => { setIsEditOpen(false); setEditingUser(null); }} 
            onSave={handleSavePermissions}
          />
        )}
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{userToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => userToDelete && handleDeleteUser(userToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
