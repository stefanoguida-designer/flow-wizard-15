import { TableHead } from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc" | null;

interface SortableTableHeadProps {
  children: React.ReactNode;
  sortKey: string;
  currentSortKey: string | null;
  currentSortDirection: SortDirection;
  onSort: (key: string) => void;
  className?: string;
}

export function SortableTableHead({
  children,
  sortKey,
  currentSortKey,
  currentSortDirection,
  onSort,
  className
}: SortableTableHeadProps) {
  const isActive = currentSortKey === sortKey;

  return (
    <TableHead 
      className={cn("cursor-pointer select-none hover:bg-muted/50 transition-colors", className)}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {children}
        {isActive ? (
          currentSortDirection === "asc" ? (
            <ArrowUp className="h-3.5 w-3.5 text-primary" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5 text-primary" />
          )
        ) : (
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground opacity-50" />
        )}
      </div>
    </TableHead>
  );
}

export function useSorting<T>(
  items: T[],
  sortKey: string | null,
  sortDirection: SortDirection,
  getSortValue: (item: T, key: string) => string | number
): T[] {
  if (!sortKey || !sortDirection) return items;
  
  return [...items].sort((a, b) => {
    const aVal = getSortValue(a, sortKey);
    const bVal = getSortValue(b, sortKey);
    
    if (typeof aVal === "string" && typeof bVal === "string") {
      const comparison = aVal.localeCompare(bVal);
      return sortDirection === "asc" ? comparison : -comparison;
    }
    
    const comparison = (aVal as number) - (bVal as number);
    return sortDirection === "asc" ? comparison : -comparison;
  });
}

export function toggleSort(
  key: string,
  currentKey: string | null,
  currentDirection: SortDirection
): { key: string; direction: SortDirection } {
  if (currentKey !== key) {
    return { key, direction: "asc" };
  }
  if (currentDirection === "asc") {
    return { key, direction: "desc" };
  }
  return { key: null, direction: null };
}
