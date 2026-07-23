import type { Stock } from "@shared/schema";

function ratingTone(value: number): string {
  if (value >= 90) return "text-success";
  if (value >= 70) return "text-foreground";
  return "text-destructive";
}

// Group rank is a rank out of ~197 industry groups — lower is better.
function groupRankTone(value: number): string {
  if (value <= 20) return "text-success";
  if (value <= 75) return "text-foreground";
  return "text-muted-foreground";
}

function Cell({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-sm bg-muted/60 py-1.5" data-testid={`rating-${label.toLowerCase()}`}>
      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className={`font-mono text-sm font-semibold tabular-nums ${tone ?? "text-foreground"}`}>{value}</span>
    </div>
  );
}

export function RatingGrid({ stock }: { stock: Stock }) {
  return (
    <div className="grid grid-cols-6 gap-1.5">
      <Cell label="Comp" value={String(stock.compositeRating)} tone={ratingTone(stock.compositeRating)} />
      <Cell label="EPS" value={String(stock.epsRating)} tone={ratingTone(stock.epsRating)} />
      <Cell label="Grp Rnk" value={String(stock.groupRank)} tone={groupRankTone(stock.groupRank)} />
      <Cell label="RS" value={String(stock.rsRating)} tone={ratingTone(stock.rsRating)} />
      <Cell
        label="SMR"
        value={stock.smrRating === null ? "N/A" : String(stock.smrRating)}
        tone={stock.smrRating === null ? "text-muted-foreground" : ratingTone(stock.smrRating)}
      />
      <Cell label="A/D" value={stock.adRating} />
    </div>
  );
}
