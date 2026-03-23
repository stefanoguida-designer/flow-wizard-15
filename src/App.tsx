import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import TeamsPage from "./pages/TeamsPage";
import TeamDetailPage from "./pages/TeamDetailPage";
import UsersPage from "./pages/UsersPage";
import ActivityLogsPage from "./pages/ActivityLogsPage";
import AllowListPage from "./pages/AllowListPage";
import AdminManagementPage from "./pages/AdminManagementPage";
import NotFound from "./pages/NotFound";
import PermissionsReferencePage from "./pages/PermissionsReferencePage";

const queryClient = new QueryClient();

/** Old bookmarks: `/departments` → `/teams` (same id). */
function RedirectLegacyTeamsListOrDetail() {
  const { id } = useParams();
  return <Navigate to={id ? `/teams/${id}` : "/teams"} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/flow-wizard-15">
          <Routes>
            <Route path="/" element={<RoleSelectionPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDetailPage />} />
            <Route path="/departments" element={<Navigate to="/teams" replace />} />
            <Route path="/departments/:id" element={<RedirectLegacyTeamsListOrDetail />} />
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