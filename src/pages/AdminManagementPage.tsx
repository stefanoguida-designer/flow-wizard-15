import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { admins, currentUser, type Admin } from "@/lib/mockData";
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
import { Plus, Trash2, ShieldCheck, Crown, Shield } from "lucide-react";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

export default function AdminManagementPage() {
  const [adminList, setAdminList] = useState<Admin[]>(admins);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminRole, setNewAdminRole] = useState<"admin" | "super_admin">("admin");

  // Only super admins can access this page
  if (currentUser.role !== 'super_admin') {
    return <Navigate to="/departments" replace />;
  }

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
    toast.success(`Admin "${admin.name}" removed successfully`);
  };

  return (
    <AppLayout
      breadcrumbs={[{ label: "Admin Management" }]}
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
              Admins can manage units and users, while Super Admins can also manage other admins.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Platform Administrators</h2>
            <p className="text-sm text-muted-foreground">
              {adminList.length} administrator{adminList.length !== 1 ? 's' : ''} on the platform
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
                  <Select value={newAdminRole} onValueChange={(v: "admin" | "super_admin") => setNewAdminRole(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
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
                    Admins can manage units and users. Super Admins can also manage other administrators.
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

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Added On</TableHead>
                <TableHead>Added By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminList.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {admin.name}
                      {admin.id === currentUser.id && (
                        <Badge variant="outline" className="text-xs">You</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{admin.email}</TableCell>
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
                  <TableCell className="text-right">
                    {admin.id !== currentUser.id && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Administrator</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove "{admin.name}" as an administrator? 
                              They will no longer have access to manage the platform.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleRemoveAdmin(admin)}
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
}
