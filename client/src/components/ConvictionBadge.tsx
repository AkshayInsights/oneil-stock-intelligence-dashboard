import type { ConvictionLevel } from "@shared/schema";

const LEVEL_STYLE: Record<ConvictionLevel, string> = {
  High: "bg-success/10 text-success border-success/30",
  Medium: "bg-accent/15 text-accent border-accent/30",
  Low: "bg-destructive/10 text-destructive border-destructive/30",
};

export function ConvictionBadge({
  score,
  level,
  compact = false,
}: {
  score: number;
  level: ConvictionLevel;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div
        className={`flex w-full min-w-0 items-center justify-center gap-1 overflow-hidden rounded-sm border px-1.5 py-1 text-[11px] ${LEVEL_STYLE[level]}`}
        data-testid="badge-conviction"
      >
        <span className="whitespace-nowrap text-[9px] font-medium uppercase opacity-80">Conv.</span>
        <span className="whitespace-nowrap font-mono font-bold tabular-nums">{score.toFixed(1)}</span>
        <span className="whitespace-nowrap font-semibold">{level}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-2.5 py-1 ${LEVEL_STYLE[level]}`}
      data-testid="badge-conviction"
    >
      <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">Conviction</span>
      <span className="font-mono text-sm font-bold tabular-nums">{score.toFixed(1)}</span>
      <span className="text-xs font-semibold">{level}</span>
    </div>
  );
}
