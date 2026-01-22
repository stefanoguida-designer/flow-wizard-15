import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { whitelistedDomains, departments, type WhitelistedDomain } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Plus, Trash2, Globe, ShieldCheck, Pencil, Building2 } from "lucide-react";
import { toast } from "sonner";

// Domain Modal Component for Add/Edit
function DomainModal({ 
  domain, 
  isOpen, 
  onClose, 
  onSave,
  mode
}: { 
  domain?: WhitelistedDomain; 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (data: { domain: string; name: string; departmentIds: string[] }) => void;
  mode: 'add' | 'edit';
}) {
  const [domainValue, setDomainValue] = useState(domain?.domain || "");
  const [nameValue, setNameValue] = useState(domain?.name || "");
  const [selectedDepts, setSelectedDepts] = useState<Set<string>>(new Set(domain?.departmentIds || []));

  const toggleDepartment = (deptId: string) => {
    const newDepts = new Set(selectedDepts);
    if (newDepts.has(deptId)) {
      newDepts.delete(deptId);
    } else {
      newDepts.add(deptId);
    }
    setSelectedDepts(newDepts);
  };

  const handleSave = () => {
    if (!domainValue.trim() || !nameValue.trim() || selectedDepts.size === 0) return;
    onSave({
      domain: domainValue.toLowerCase(),
      name: nameValue,
      departmentIds: Array.from(selectedDepts)
    });
  };

  const isValid = domainValue.includes('.') && nameValue.trim() && selectedDepts.size > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Whitelisted Domain' : 'Edit Domain'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Add a new email domain to allow users with that domain to be invited to specific departments.'
              : 'Update the domain details and department associations.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4 flex-shrink-0">
            <div className="space-y-2">
              <Label htmlFor="domain-name">Domain Name</Label>
              <Input
                id="domain-name"
                placeholder="e.g., Housing Department"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">@</span>
                <Input
                  id="domain"
                  placeholder="e.g., housing.gov.ie"
                  value={domainValue}
                  onChange={(e) => setDomainValue(e.target.value)}
                  disabled={mode === 'edit'}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 space-y-3">
            <Label className="flex-shrink-0">Department Access</Label>
            <p className="text-sm text-muted-foreground flex-shrink-0">
              Select which departments users with this domain can be invited to.
            </p>
            
            <ScrollArea className="h-[250px] rounded-md border p-4">
              <div className="space-y-2">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`dept-${dept.id}`}
                      checked={selectedDepts.has(dept.id)}
                      onCheckedChange={() => toggleDepartment(dept.id)}
                    />
                    <label 
                      htmlFor={`dept-${dept.id}`}
                      className="text-sm cursor-pointer flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4 text-primary" />
                      {dept.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            {mode === 'add' ? 'Add Domain' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function WhitelistingPage() {
  const [domains, setDomains] = useState<WhitelistedDomain[]>(whitelistedDomains);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<WhitelistedDomain | null>(null);
  const [domainToDelete, setDomainToDelete] = useState<WhitelistedDomain | null>(null);

  const getDepartmentNames = (departmentIds: string[]) => {
    return departmentIds
      .map(id => departments.find(d => d.id === id))
      .filter(Boolean)
      .map(d => d!.abbreviation);
  };

  const handleAddDomain = (data: { domain: string; name: string; departmentIds: string[] }) => {
    if (domains.some(d => d.domain.toLowerCase() === data.domain.toLowerCase())) {
      toast.error("This domain is already whitelisted");
      return;
    }

    const newDomainEntry: WhitelistedDomain = {
      id: `wl-${Date.now()}`,
      domain: data.domain,
      name: data.name,
      departmentIds: data.departmentIds,
      addedAt: new Date().toISOString().split('T')[0],
      addedBy: "Current Admin",
    };

    setDomains([...domains, newDomainEntry]);
    setIsAddOpen(false);
    toast.success(`Domain "${data.domain}" added to whitelist`);
  };

  const handleEditDomain = (data: { domain: string; name: string; departmentIds: string[] }) => {
    if (!editingDomain) return;
    
    setDomains(domains.map(d => 
      d.id === editingDomain.id 
        ? { ...d, name: data.name, departmentIds: data.departmentIds }
        : d
    ));
    setEditingDomain(null);
    toast.success(`Domain "${data.domain}" updated`);
  };

  const handleRemoveDomain = (domain: WhitelistedDomain) => {
    setDomains(domains.filter(d => d.id !== domain.id));
    setDomainToDelete(null);
    toast.success(`Domain "${domain.domain}" removed from whitelist`);
  };

  return (
    <AppLayout
      breadcrumbs={[{ label: "Whitelisting" }]}
      title="Email Whitelisting"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">About Whitelisting</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Only users with email addresses from whitelisted domains can be invited to the platform. 
              Each domain is associated with specific departments that users can be granted access to.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Whitelisted Domains</h2>
            <p className="text-sm text-muted-foreground">
              {domains.length} domain{domains.length !== 1 ? 's' : ''} currently whitelisted
            </p>
          </div>
          
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Domain
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Departments</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No domains whitelisted. Add one to allow user invitations.
                  </TableCell>
                </TableRow>
              ) : (
                domains.map((domain) => {
                  const deptAbbrs = getDepartmentNames(domain.departmentIds);
                  return (
                    <TableRow key={domain.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">@{domain.domain}</span>
                        </div>
                      </TableCell>
                      <TableCell>{domain.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {deptAbbrs.length <= 3 ? (
                            deptAbbrs.map((abbr, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {abbr}
                              </Badge>
                            ))
                          ) : (
                            <>
                              {deptAbbrs.slice(0, 2).map((abbr, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {abbr}
                                </Badge>
                              ))}
                              <Badge variant="secondary" className="text-xs">
                                +{deptAbbrs.length - 2} more
                              </Badge>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setEditingDomain(domain)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDomainToDelete(domain)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Add Domain Modal */}
      <DomainModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAddDomain}
        mode="add"
      />

      {/* Edit Domain Modal */}
      {editingDomain && (
        <DomainModal
          domain={editingDomain}
          isOpen={!!editingDomain}
          onClose={() => setEditingDomain(null)}
          onSave={handleEditDomain}
          mode="edit"
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!domainToDelete} onOpenChange={() => setDomainToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Domain</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "@{domainToDelete?.domain}" from the whitelist? 
              Users with this domain will no longer be able to be invited to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => domainToDelete && handleRemoveDomain(domainToDelete)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}