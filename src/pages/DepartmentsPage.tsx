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
import { Building2, Users, ChevronRight, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

export default function DepartmentsPage() {
  const navigate = useNavigate();

  return (
    <AppLayout
      breadcrumbs={[{ label: "Departments" }]}
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
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-medium">{dept.unitsCount} units</div>
                  <div className="text-xs text-muted-foreground">{dept.usersCount} users</div>
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
