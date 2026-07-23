import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export function LeadershipBadge({ flag }: { flag: "Leader" | "Laggard" }) {
  const isLeader = flag === "Leader";
  return (
    <Badge
      variant="outline"
      className={
        isLeader
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-muted-foreground/30 bg-muted text-muted-foreground"
      }
      data-testid="badge-leadership"
    >
      {flag}
    </Badge>
  );
}

export function ChartActionBadge({ flag }: { flag: string }) {
  const isBuyZone = flag.toLowerCase().includes("buy");
  return (
    <Badge
      variant="outline"
      className={
        isBuyZone
          ? "border-success/30 bg-success/10 text-success"
          : "border-accent/40 bg-accent/10 text-accent"
      }
      data-testid="badge-chart-action"
    >
      {flag}
    </Badge>
  );
}

export function PriceVolActionTag({ action }: { action: string }) {
  const lower = action.toLowerCase();
  const isUp = lower.includes("up in price");
  const isDown = lower.includes("down");
  const Icon = isDown ? TrendingDown : isUp ? TrendingUp : BarChart3;
  const tone = isDown ? "text-destructive" : isUp ? "text-success" : "text-accent";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${tone}`} data-testid="tag-price-vol-action">
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {action}
    </span>
  );
}
