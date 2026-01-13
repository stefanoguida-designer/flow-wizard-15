import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { whitelistedDomains, type WhitelistedDomain } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Trash2, Globe, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function WhitelistingPage() {
  const [domains, setDomains] = useState<WhitelistedDomain[]>(whitelistedDomains);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  const handleAddDomain = () => {
    if (!newDomain.trim()) return;

    // Basic validation
    if (!newDomain.includes('.')) {
      toast.error("Please enter a valid domain (e.g., gov.ie)");
      return;
    }

    if (domains.some(d => d.domain.toLowerCase() === newDomain.toLowerCase())) {
      toast.error("This domain is already whitelisted");
      return;
    }

    const newDomainEntry: WhitelistedDomain = {
      id: `wl-${Date.now()}`,
      domain: newDomain.toLowerCase(),
      addedAt: new Date().toISOString().split('T')[0],
      addedBy: "Current Admin",
    };

    setDomains([...domains, newDomainEntry]);
    setNewDomain("");
    setIsAddOpen(false);
    toast.success(`Domain "${newDomain}" added to whitelist`);
  };

  const handleRemoveDomain = (domain: WhitelistedDomain) => {
    setDomains(domains.filter(d => d.id !== domain.id));
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
              This ensures that only authorized government personnel can access form submissions.
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
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Domain
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Whitelisted Domain</DialogTitle>
                <DialogDescription>
                  Add a new email domain to allow users with that domain to be invited.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">@</span>
                    <Input
                      id="domain"
                      placeholder="e.g., gov.ie"
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Users with emails ending in @{newDomain || 'domain.ie'} will be able to receive invitations.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDomain}>Add Domain</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Added On</TableHead>
                <TableHead>Added By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                domains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">@{domain.domain}</span>
                      </div>
                    </TableCell>
                    <TableCell>{domain.addedAt}</TableCell>
                    <TableCell>{domain.addedBy}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Domain</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove "@{domain.domain}" from the whitelist? 
                              Users with this domain will no longer be able to be invited to the platform.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleRemoveDomain(domain)}
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
}
