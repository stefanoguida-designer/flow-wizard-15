import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { teams } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, ChevronRight } from "lucide-react";

export default function TeamsPage() {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Teams"
    >
      <p className="text-muted-foreground mb-6">
        View teams and manage their units. Teams are managed externally and displayed here for reference.
      </p>

      <div className="grid gap-4">
        {teams.map((t) => (
          <Card
            key={t.id}
            className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
            onClick={() => navigate(`/teams/${t.id}`)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.abbreviation}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" />
                    {t.usersCount} users
                  </Badge>
                  {t.unitsCount > 0 && (
                    <Badge variant="outline" className="gap-1">
                      <Building2 className="h-3 w-3" />
                      {t.unitsCount} units
                    </Badge>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
