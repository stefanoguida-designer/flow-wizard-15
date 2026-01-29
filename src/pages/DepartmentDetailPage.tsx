import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { getUnitsByDepartmentId, getDepartmentById, getUsersByUnitId, type Unit } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
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
import { Building2, Users, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const department = getDepartmentById(id || "");
  const [units, setUnits] = useState<Unit[]>(getUnitsByDepartmentId(id || ""));
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [newUnitName, setNewUnitName] = useState("");
  const [newUnitAcronym, setNewUnitAcronym] = useState("");

  if (!department) {
    return (
      <AppLayout breadcrumbs={[{ label: "Departments", href: "/departments" }, { label: "Not Found" }]}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Department not found</p>
          <Button variant="link" onClick={() => navigate("/departments")}>
            Back to Departments
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleCreateUnit = () => {
    if (!newUnitName.trim()) return;
    
    const newUnit: Unit = {
      id: `unit-${Date.now()}`,
      name: newUnitName,
      acronym: newUnitAcronym.trim() || undefined,
      departmentId: department.id,
      departmentName: department.name,
      usersCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: "Current Admin",
    };
    
    setUnits([...units, newUnit]);
    setNewUnitName("");
    setNewUnitAcronym("");
    setIsCreateOpen(false);
    toast.success(`Unit "${newUnitName}" created successfully`);
  };

  const handleEditUnit = () => {
    if (!editingUnit || !newUnitName.trim()) return;
    
    setUnits(units.map(u => 
      u.id === editingUnit.id 
        ? { ...u, name: newUnitName, acronym: newUnitAcronym.trim() || undefined } 
        : u
    ));
    setIsEditOpen(false);
    setEditingUnit(null);
    setNewUnitName("");
    setNewUnitAcronym("");
    toast.success("Unit updated successfully");
  };

  const handleDeleteUnit = (unit: Unit) => {
    setUnits(units.filter(u => u.id !== unit.id));
    toast.success(`Unit "${unit.name}" deleted successfully`);
  };

  const openEditDialog = (unit: Unit) => {
    setEditingUnit(unit);
    setNewUnitName(unit.name);
    setNewUnitAcronym(unit.acronym || "");
    setIsEditOpen(true);
  };

  return (
    <AppLayout
      breadcrumbs={[
        { label: "Departments", href: "/departments" },
        { label: department.name }
      ]}
      showBreadcrumbs={true}
    >
      <div className="space-y-6">
        {/* Department Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{department.name}</h1>
              <p className="text-muted-foreground">{department.abbreviation}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            Read-only (managed externally)
          </Badge>
        </div>

        {/* Stats */}
        <Card className="max-w-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <Link 
                to={`/users?department=${department.id}`}
                className="text-2xl font-bold text-green-600 hover:text-green-700 hover:underline transition-colors"
              >
                {department.usersCount}
              </Link>
              <div className="text-sm text-muted-foreground">Users</div>
            </div>
          </CardContent>
        </Card>

        {/* Units Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Units ({units.length})</h2>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Unit</DialogTitle>
                  <DialogDescription>
                    Add a new unit to {department.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit-name">Unit Name</Label>
                    <Input
                      id="unit-name"
                      placeholder="e.g., Dublin City Council"
                      value={newUnitName}
                      onChange={(e) => setNewUnitName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit-acronym">Acronym (optional)</Label>
                    <Input
                      id="unit-acronym"
                      placeholder="e.g., DCC"
                      value={newUnitAcronym}
                      onChange={(e) => setNewUnitAcronym(e.target.value)}
                      maxLength={10}
                    />
                    <p className="text-xs text-muted-foreground">
                      A short abbreviation for the unit name
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateUnit}>Create Unit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unit Name</TableHead>
                  <TableHead>Acronym</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No units found. Create one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  units.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.name}</TableCell>
                      <TableCell>
                        {unit.acronym ? (
                          <Badge variant="outline" className="text-xs">
                            {unit.acronym}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link 
                          to={`/users?department=${department.id}&unit=${unit.id}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          {unit.usersCount} users
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </TableCell>
                      <TableCell>{unit.createdAt}</TableCell>
                      <TableCell>{unit.createdBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(unit)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Unit</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{unit.name}"? This action cannot be undone.
                                  {unit.usersCount > 0 && (
                                    <span className="block mt-2 text-destructive">
                                      Warning: This unit has {unit.usersCount} users who will lose access.
                                    </span>
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDeleteUnit(unit)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Unit</DialogTitle>
              <DialogDescription>
                Update the unit details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-unit-name">Unit Name</Label>
                <Input
                  id="edit-unit-name"
                  value={newUnitName}
                  onChange={(e) => setNewUnitName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-unit-acronym">Acronym (optional)</Label>
                <Input
                  id="edit-unit-acronym"
                  placeholder="e.g., DCC"
                  value={newUnitAcronym}
                  onChange={(e) => setNewUnitAcronym(e.target.value)}
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  A short abbreviation for the unit name
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditUnit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
