import { useNavigate, Link } from 'react-router-dom';
import { useAuth, simulatedUsers } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Shield, Eye, ChevronRight, Building2 } from 'lucide-react';

const roleConfig = {
  super_admin: {
    icon: Crown,
    label: 'Super Admin',
    color: 'bg-primary text-primary-foreground',
    description: 'Full access to all features including admin management and allow list configuration.',
    capabilities: [
      'Manage all users and permissions',
      'Add, edit, and delete units',
      'Configure allow list domains',
      'Manage other administrators',
      'View all activity logs',
    ],
  },
  admin: {
    icon: Shield,
    label: 'Admin',
    color: 'bg-secondary text-secondary-foreground',
    description: 'Can modify data but cannot delete. Allow list is read-only.',
    capabilities: [
      'Manage users and permissions',
      'Add and edit units (no delete)',
      'View allow list (read-only)',
      'Cannot manage administrators',
      'View activity logs',
    ],
  },
  read_only: {
    icon: Eye,
    label: 'Read Only',
    color: 'bg-muted text-muted-foreground',
    description: 'View-only access across the platform. Cannot modify any data.',
    capabilities: [
      'View all users and permissions',
      'View departments and units',
      'View allow list (read-only)',
      'Cannot invite or modify users',
      'View activity logs',
    ],
  },
};

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleSelectUser = (user: typeof simulatedUsers[0]) => {
    setCurrentUser(user);
    navigate('/departments');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">OGCIO Form Management Platform</h1>
          <p className="text-muted-foreground text-lg">
            Select a user role to simulate different permission levels
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {simulatedUsers.map((user) => {
            const config = roleConfig[user.role];
            const Icon = config.icon;

            return (
              <Card
                key={user.id}
                className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => handleSelectUser(user)}
              >
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-3">
                    <div className={`p-4 rounded-full ${config.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {user.email}
                  </CardDescription>
                  <Badge className={`mt-2 ${config.color}`}>
                    {config.label}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    {config.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {config.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">{cap}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground"
                    variant="outline"
                  >
                    Enter as {user.name.split(' ')[0]}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          This is a demonstration of role-based access control. Select a user to explore their permissions.
        </p>
        <p className="text-center mt-3">
          <Link to="/permissions" className="text-sm text-primary hover:underline">
            View full permissions reference →
          </Link>
        </p>
      </div>
    </div>
  );
}
