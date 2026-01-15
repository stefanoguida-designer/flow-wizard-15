import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { departments, getUnitsByDepartmentId, getDepartmentById, getUsersByDepartmentId, type Unit } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Building2, Users, ChevronRight } from "lucide-react";

export default function DepartmentsPage() {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Departments"
    >
      <p className="text-muted-foreground mb-6">
        View government departments and manage their units. Departments are managed externally and displayed here for reference.
      </p>

      <div className="grid gap-4">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
            onClick={() => navigate(`/departments/${dept.id}`)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{dept.name}</div>
                  <div className="text-sm text-muted-foreground">{dept.abbreviation}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" />
                    {dept.usersCount} users
                  </Badge>
                  {dept.unitsCount > 0 && (
                    <Badge variant="outline" className="gap-1">
                      <Building2 className="h-3 w-3" />
                      {dept.unitsCount} units
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
