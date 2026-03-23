import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Check, X, Eye } from 'lucide-react';

interface PermissionRow {
  category: string;
  action: string;
  superAdmin: 'full' | 'read' | 'none';
  admin: 'full' | 'read' | 'none';
  readOnly: 'full' | 'read' | 'none';
}

const permissions: PermissionRow[] = [
  { category: 'Teams', action: 'View teams and units', superAdmin: 'full', admin: 'full', readOnly: 'full' },
  { category: 'Teams', action: 'Add new units', superAdmin: 'full', admin: 'full', readOnly: 'none' },
  { category: 'Teams', action: 'Edit units', superAdmin: 'full', admin: 'full', readOnly: 'none' },
  { category: 'Teams', action: 'Delete units', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Users', action: 'View users and permissions', superAdmin: 'full', admin: 'full', readOnly: 'full' },
  { category: 'Users', action: 'Invite users', superAdmin: 'full', admin: 'full', readOnly: 'none' },
  { category: 'Users', action: 'Edit user roles', superAdmin: 'full', admin: 'full', readOnly: 'none' },
  { category: 'Users', action: 'Remove users', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Allow List', action: 'View allowed domains', superAdmin: 'full', admin: 'read', readOnly: 'read' },
  { category: 'Allow List', action: 'Add domains', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Allow List', action: 'Edit domains', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Allow List', action: 'Delete domains', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Team Overview', action: 'View administrators', superAdmin: 'full', admin: 'read', readOnly: 'read' },
  { category: 'Team Overview', action: 'Invite administrators', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Team Overview', action: 'Edit administrator roles', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Team Overview', action: 'Disable/enable administrators', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Team Overview', action: 'Delete administrators', superAdmin: 'full', admin: 'none', readOnly: 'none' },
  { category: 'Activity Logs', action: 'View activity logs', superAdmin: 'full', admin: 'full', readOnly: 'full' },
];

function AccessIcon({ level }: { level: 'full' | 'read' | 'none' }) {
  if (level === 'full') return <Check className="h-4 w-4 text-primary mx-auto" />;
  if (level === 'read') return <Eye className="h-4 w-4 text-muted-foreground mx-auto" />;
  return <X className="h-4 w-4 text-destructive mx-auto" />;
}

export default function PermissionsReferencePage() {
  let lastCategory = '';

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to role selection
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-2">Permissions Reference</h1>
        <p className="text-muted-foreground mb-8">
          A complete overview of what each role can do across the platform.
        </p>

        <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" /> Full access</span>
          <span className="flex items-center gap-1.5"><Eye className="h-4 w-4 text-muted-foreground" /> View only</span>
          <span className="flex items-center gap-1.5"><X className="h-4 w-4 text-destructive" /> No access</span>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Section</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-center w-[120px]">Super Admin</TableHead>
                <TableHead className="text-center w-[120px]">Admin</TableHead>
                <TableHead className="text-center w-[120px]">Read Only</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((row, idx) => {
                const showCategory = row.category !== lastCategory;
                lastCategory = row.category;
                return (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {showCategory ? row.category : ''}
                    </TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell className="text-center"><AccessIcon level={row.superAdmin} /></TableCell>
                    <TableCell className="text-center"><AccessIcon level={row.admin} /></TableCell>
                    <TableCell className="text-center"><AccessIcon level={row.readOnly} /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
