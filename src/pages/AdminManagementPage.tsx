import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { admins, activityLogs, type Admin, type AdminRole } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, ShieldCheck, Crown, Shield, History, Mail, Calendar, UserPlus, MoreHorizontal, Pencil, Trash2, Eye, Ban, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { SortableTableHead, useSorting, toggleSort, type SortDirection } from "@/components/ui/sortable-table-head";

export default function AdminManagementPage() {
  const { currentUser, canAccessAdminManagement } = useAuth();
  const [adminList, setAdminList] = useState<Admin[]>(admins);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [editRole, setEditRole] = useState<AdminRole>("admin");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>("admin");
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "disabled">("active");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Only super admins can access this page
  if (!canAccessAdminManagement) {
    return <Navigate to="/departments" replace />;
  }

  const handleSort = (key: string) => {
    const result = toggleSort(key, sortKey, sortDirection);
    setSortKey(result.key);
    setSortDirection(result.direction);
  };

  // Filter admins by status
  const activeAdmins = adminList.filter(a => a.status === 'active');
  const disabledAdmins = adminList.filter(a => a.status === 'disabled');

  // Sort admins
  const sortedActiveAdmins = useSorting(activeAdmins, sortKey, sortDirection, (admin, key) => {
    if (key === "name") return admin.name;
    if (key === "role") return admin.role;
    return "";
  });
  
  const sortedDisabledAdmins = useSorting(disabledAdmins, sortKey, sortDirection, (admin, key) => {
    if (key === "name") return admin.name;
    if (key === "role") return admin.role;
    return "";
  });

  const handleAddAdmin = () => {
    if (!newAdminName.trim() || !newAdminEmail.trim()) return;

    if (adminList.some(a => a.email.toLowerCase() === newAdminEmail.toLowerCase())) {
      toast.error("An admin with this email already exists");
      return;
    }

    const newAdmin: Admin = {
      id: `admin-${Date.now()}`,
      name: newAdminName,
      email: newAdminEmail,
      role: newAdminRole,
      status: 'active',
      addedAt: new Date().toISOString().split('T')[0],
      addedBy: currentUser.name,
    };

    setAdminList([...adminList, newAdmin]);
    setNewAdminName("");
    setNewAdminEmail("");
    setNewAdminRole("admin");
    setIsAddOpen(false);
    toast.success(`Admin "${newAdminName}" invited successfully`);
  };

  const handleRemoveAdmin = (admin: Admin) => {
    if (admin.id === currentUser.id) {
      toast.error("You cannot remove yourself");
      return;
    }

    setAdminList(adminList.filter(a => a.id !== admin.id));
    setSidebarOpen(false);
    setSelectedAdmin(null);
    toast.success(`Admin "${admin.name}" removed successfully`);
  };

  const handleDisableAdmin = (admin: Admin) => {
    if (admin.id === currentUser.id) {
      toast.error("You cannot disable yourself");
      return;
    }

    setAdminList(adminList.map(a => 
      a.id === admin.id ? { ...a, status: 'disabled' as const } : a
    ));
    toast.success(`Admin "${admin.name}" has been disabled`);
  };

  const handleRestoreAdmin = (admin: Admin) => {
    setAdminList(adminList.map(a => 
      a.id === admin.id ? { ...a, status: 'active' as const } : a
    ));
    toast.success(`Admin "${admin.name}" has been restored`);
  };

  const handleRowClick = (admin: Admin) => {
    setSelectedAdmin(admin);
    setSidebarOpen(true);
  };

  const handleEditAdmin = (admin: Admin, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingAdmin(admin);
    setEditRole(admin.role);
    setIsEditOpen(true);
  };

  const handleSaveAdminRole = () => {
    if (!editingAdmin) return;
    setAdminList(adminList.map(a => a.id === editingAdmin.id ? { ...a, role: editRole } : a));
    setIsEditOpen(false);
    setEditingAdmin(null);
    toast.success(`Role updated for "${editingAdmin.name}"`);
  };

  const getAdminLogs = (admin: Admin) => {
    return activityLogs.filter(log => 
      (log.targetType === 'admin' && log.targetName === admin.name) ||
      log.performedBy === admin.name
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  // Render admin table row with actions
  const renderAdminRow = (admin: Admin, isDisabledTab: boolean) => (
    <TableRow 
      key={admin.id} 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => handleRowClick(admin)}
    >
      <TableCell>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{admin.name}</span>
            {admin.id === currentUser.id && (
              <Badge variant="outline" className="text-xs">You</Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{admin.email}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant={admin.role === 'super_admin' ? 'default' : 'secondary'}
          className="gap-1"
        >
          {admin.role === 'super_admin' ? (
            <>
              <Crown className="h-3 w-3" />
              Super Admin
            </>
          ) : admin.role === 'read_only' ? (
            <>
              <Eye className="h-3 w-3" />
              Read Only
            </>
          ) : (
            <>
              <Shield className="h-3 w-3" />
              Admin
            </>
          )}
        </Badge>
      </TableCell>
      <TableCell>{admin.addedAt}</TableCell>
      <TableCell>{admin.addedBy}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem onClick={(e) => handleEditAdmin(admin, e)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit role
            </DropdownMenuItem>
            
            {isDisabledTab ? (
              // Disabled tab: Restore option
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestoreAdmin(admin);
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restore admin
              </DropdownMenuItem>
            ) : (
              // Active tab: Disable option
              admin.id !== currentUser.id && (
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDisableAdmin(admin);
                  }}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Disable admin
                </DropdownMenuItem>
              )
            )}
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete admin
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Administrator</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to permanently delete "{admin.name}" as an administrator? 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => handleRemoveAdmin(admin)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  return (
    <AppLayout
      title="Admin Management"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Super Admin Access</h3>
            <p className="text-sm text-muted-foreground mt-1">
              As a Super Admin, you can invite other administrators to help manage the platform. 
              Admins can manage units and users, while Super Admins can also manage other admins and allow listing.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Platform Administrators</h2>
            <p className="text-sm text-muted-foreground">
              {activeAdmins.length} active administrator{activeAdmins.length !== 1 ? 's' : ''} on the platform
            </p>
          </div>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Administrator</DialogTitle>
                <DialogDescription>
                  Invite a new administrator to help manage the platform.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name</Label>
                  <Input
                    id="admin-name"
                    placeholder="e.g., John Murphy"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="e.g., john.murphy@ogcio.gov.ie"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-role">Role</Label>
                  <Select value={newAdminRole} onValueChange={(v: AdminRole) => setNewAdminRole(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="read_only">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>Read Only</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Admin</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="super_admin">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4" />
                          <span>Super Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Read Only can view users and access. Admins can manage units and users. Super Admins can also manage other administrators and allow listing.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAdmin}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs for Active / Disabled Admins */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "active" | "disabled")}>
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              Active Administrators
              <Badge variant="secondary" className="ml-1">{activeAdmins.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="disabled" className="gap-2">
              Disabled Administrators
              <Badge variant="secondary" className="ml-1">{disabledAdmins.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableTableHead
                      sortKey="name"
                      currentSortKey={sortKey}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    >
                      Name
                    </SortableTableHead>
                    <SortableTableHead
                      sortKey="role"
                      currentSortKey={sortKey}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    >
                      Role
                    </SortableTableHead>
                    <TableHead>Added On</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedActiveAdmins.length > 0 ? (
                    sortedActiveAdmins.map((admin) => renderAdminRow(admin, false))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No active administrators
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="disabled" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableTableHead
                      sortKey="name"
                      currentSortKey={sortKey}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    >
                      Name
                    </SortableTableHead>
                    <SortableTableHead
                      sortKey="role"
                      currentSortKey={sortKey}
                      currentSortDirection={sortDirection}
                      onSort={handleSort}
                    >
                      Role
                    </SortableTableHead>
                    <TableHead>Added On</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedDisabledAdmins.length > 0 ? (
                    sortedDisabledAdmins.map((admin) => renderAdminRow(admin, true))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No disabled administrators
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Admin Details Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent className="w-[400px] sm:w-[500px]">
          {selectedAdmin && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {selectedAdmin.name}
                  {selectedAdmin.id === currentUser.id && (
                    <Badge variant="outline" className="text-xs">You</Badge>
                  )}
                  {selectedAdmin.status === 'disabled' && (
                    <Badge variant="secondary" className="text-xs">Disabled</Badge>
                  )}
                </SheetTitle>
              </SheetHeader>
              
              <Tabs defaultValue="details" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{selectedAdmin.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      {selectedAdmin.role === 'super_admin' ? (
                        <Crown className="h-4 w-4 text-muted-foreground" />
                      ) : selectedAdmin.role === 'read_only' ? (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <p className="text-xs text-muted-foreground">Role</p>
                        <p className="text-sm font-medium">
                          {selectedAdmin.role === 'super_admin' ? 'Super Admin' : selectedAdmin.role === 'read_only' ? 'Read Only' : 'Admin'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Added On</p>
                        <p className="text-sm font-medium">{selectedAdmin.addedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <UserPlus className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Added By</p>
                        <p className="text-sm font-medium">{selectedAdmin.addedBy}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="mt-4">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {getAdminLogs(selectedAdmin).map((log) => (
                        <div key={log.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                          <History className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm">{log.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {getAdminLogs(selectedAdmin).length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          No activity recorded yet
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Admin Role Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Administrator Role</DialogTitle>
            <DialogDescription>
              Change the role for {editingAdmin?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="font-medium">{editingAdmin?.name}</div>
              <div className="text-sm text-muted-foreground">{editingAdmin?.email}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-admin-role">Role</Label>
              <Select value={editRole} onValueChange={(v: AdminRole) => setEditRole(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="read_only">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>Read Only</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="super_admin">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      <span>Super Admin</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Read Only can view users and access. Admins can manage units and users. Super Admins can also manage other administrators and allow listing.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAdminRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
