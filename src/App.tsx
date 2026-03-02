import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentDetailPage from "./pages/DepartmentDetailPage";
import UsersPage from "./pages/UsersPage";
import ActivityLogsPage from "./pages/ActivityLogsPage";
import AllowListPage from "./pages/AllowListPage";
import AdminManagementPage from "./pages/AdminManagementPage";
import NotFound from "./pages/NotFound";
import PermissionsReferencePage from "./pages/PermissionsReferencePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/flow-wizard-15">
          <Routes>
            <Route path="/" element={<RoleSelectionPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/:id" element={<DepartmentDetailPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/activity-logs" element={<ActivityLogsPage />} />
            <Route path="/allow-list" element={<AllowListPage />} />
            <Route path="/admin-management" element={<AdminManagementPage />} />
            <Route path="/permissions" element={<PermissionsReferencePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
