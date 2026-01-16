import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { activityLogs, type ActivityLog } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  UserPlus, 
  UserMinus, 
  Building2, 
  Pencil, 
  Trash2, 
  ShieldCheck,
  ShieldPlus,
  ShieldMinus,
  KeyRound,
  History,
  CalendarIcon,
  X
} from "lucide-react";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

const actionIcons: Record<ActivityLog['action'], React.ReactNode> = {
  user_invited: <UserPlus className="h-4 w-4" />,
  user_removed: <UserMinus className="h-4 w-4" />,
  unit_created: <Building2 className="h-4 w-4" />,
  unit_renamed: <Pencil className="h-4 w-4" />,
  unit_deleted: <Trash2 className="h-4 w-4" />,
  access_granted: <ShieldPlus className="h-4 w-4" />,
  access_revoked: <ShieldMinus className="h-4 w-4" />,
  admin_invited: <ShieldCheck className="h-4 w-4" />,
  admin_removed: <ShieldMinus className="h-4 w-4" />,
  whitelist_added: <KeyRound className="h-4 w-4" />,
  whitelist_removed: <KeyRound className="h-4 w-4" />,
};

const actionColors: Record<ActivityLog['action'], string> = {
  user_invited: "bg-success/10 text-success",
  user_removed: "bg-destructive/10 text-destructive",
  unit_created: "bg-success/10 text-success",
  unit_renamed: "bg-warning/10 text-warning",
  unit_deleted: "bg-destructive/10 text-destructive",
  access_granted: "bg-success/10 text-success",
  access_revoked: "bg-warning/10 text-warning",
  admin_invited: "bg-primary/10 text-primary",
  admin_removed: "bg-destructive/10 text-destructive",
  whitelist_added: "bg-success/10 text-success",
  whitelist_removed: "bg-destructive/10 text-destructive",
};

const actionLabels: Record<ActivityLog['action'], string> = {
  user_invited: "User Invited",
  user_removed: "User Removed",
  unit_created: "Unit Created",
  unit_renamed: "Unit Renamed",
  unit_deleted: "Unit Deleted",
  access_granted: "Access Granted",
  access_revoked: "Access Revoked",
  admin_invited: "Admin Invited",
  admin_removed: "Admin Removed",
  whitelist_added: "Domain Added",
  whitelist_removed: "Domain Removed",
};

export default function ActivityLogsPage() {
  const [searchParams] = useSearchParams();
  const highlightLogId = searchParams.get("highlight");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [targetFilter, setTargetFilter] = useState<string>("all");

  // Scroll to highlighted log on mount
  useEffect(() => {
    if (highlightLogId) {
      setTimeout(() => {
        const element = document.getElementById(`log-${highlightLogId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("ring-2", "ring-primary", "ring-offset-2");
          setTimeout(() => {
            element.classList.remove("ring-2", "ring-primary", "ring-offset-2");
          }, 3000);
        }
      }, 100);
    }
  }, [highlightLogId]);

  const filteredLogs = useMemo(() => {
    return activityLogs
      .filter(log => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          if (
            !log.description.toLowerCase().includes(query) &&
            !log.performedBy.toLowerCase().includes(query) &&
            !log.targetName.toLowerCase().includes(query)
          ) {
            return false;
          }
        }

        // Date range filter
        if (dateRange?.from) {
          const logDate = new Date(log.timestamp);
          const from = startOfDay(dateRange.from);
          const to = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);
          if (!isWithinInterval(logDate, { start: from, end: to })) {
            return false;
          }
        }

        // Target type filter
        if (targetFilter !== "all" && log.targetType !== targetFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [searchQuery, dateRange, targetFilter]);

  return (
    <AppLayout
      title="Activity Logs"
    >
      <p className="text-muted-foreground mb-6">
        Track all activities performed on the platform by administrators.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className={cn(!dateRange && "text-muted-foreground")}>
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Date range"
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select value={targetFilter} onValueChange={setTargetFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="user">Users</SelectItem>
            <SelectItem value="unit">Units</SelectItem>
            <SelectItem value="department">Departments</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
            <SelectItem value="whitelist">Whitelist</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {(dateRange || targetFilter !== "all") && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {dateRange && (
            <Badge variant="secondary" className="gap-1">
              {dateRange.to 
                ? `${format(dateRange.from!, "LLL dd")} - ${format(dateRange.to, "LLL dd")}`
                : format(dateRange.from!, "LLL dd, y")
              }
              <button onClick={() => setDateRange(undefined)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {targetFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {targetFilter.charAt(0).toUpperCase() + targetFilter.slice(1)}s
              <button onClick={() => setTargetFilter("all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Logs Timeline */}
      <Card className="p-6">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No activity logs found matching your criteria.</p>
          </div>
        ) : (
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredLogs.map((log, index) => {
                const isNewDay = index === 0 || 
                  format(new Date(log.timestamp), 'yyyy-MM-dd') !== 
                  format(new Date(filteredLogs[index - 1].timestamp), 'yyyy-MM-dd');

                return (
                  <div key={log.id}>
                    {isNewDay && (
                      <div className="sticky top-0 bg-background py-2 mb-3">
                        <div className="text-sm font-medium text-muted-foreground">
                          {format(new Date(log.timestamp), "EEEE, MMMM d, yyyy")}
                        </div>
                      </div>
                    )}
                    
                    <div 
                      id={`log-${log.id}`}
                      className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-all"
                    >
                      <div className={`p-2 rounded-full h-fit ${actionColors[log.action]}`}>
                        {actionIcons[log.action]}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium">{log.description}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span>by {log.performedBy}</span>
                              <span>•</span>
                              <span>{format(new Date(log.timestamp), "h:mm a")}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {actionLabels[log.action]}
                          </Badge>
                        </div>
                        
                        {log.metadata && Object.keys(log.metadata).length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {Object.entries(log.metadata).map(([key, value]) => (
                              <span key={key} className="text-xs bg-muted px-2 py-1 rounded">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </Card>
    </AppLayout>
  );
}
