import type { MarketRegime } from "@shared/schema";
import { Activity } from "lucide-react";

export function MarketRegimeBanner({ regime }: { regime: MarketRegime }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[#0A1830] bg-gradient-to-br from-[#173863] via-[#122A4E] to-[#0A1830] text-[#F4F2EC] shadow-lg dark:border-[#2A3550]"
      data-testid="section-market-regime"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #D7B44E 0%, transparent 35%), radial-gradient(circle at 85% 90%, #D7B44E 0%, transparent 40%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#D7B44E] via-[#F0D48A] to-[#D7B44E]" />
      <div className="relative flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#D7B44E]/50 bg-[#D7B44E]/10">
              <Activity className="h-3 w-3 text-[#D7B44E]" aria-hidden />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F4F2EC]/70">
              Market Regime &middot; O&apos;Neil Methodology &middot; {regime.asOf}
            </span>
          </div>
          <p className="font-display text-sm font-bold text-[#D7B44E] sm:text-base" data-testid="text-market-status">
            {regime.status}
          </p>
          <p className="max-w-3xl text-xs leading-relaxed text-[#F4F2EC]/85 sm:text-sm" data-testid="text-market-summary">
            {regime.summary}
          </p>
        </div>
        <div className="flex gap-4 rounded-lg bg-white/5 p-3 md:gap-5">
          {regime.indices.map((idx, i) => (
            <div
              key={idx.name}
              className={`text-right ${i > 0 ? "border-l border-white/10 pl-4" : ""}`}
              data-testid={`text-index-${idx.name.replace(/\s+/g, "-")}`}
            >
              <p className="text-[10px] uppercase tracking-wide text-[#F4F2EC]/60">{idx.name}</p>
              <p className="font-mono text-sm font-semibold tabular-nums">{idx.level}</p>
              <p className={`font-mono text-xs tabular-nums ${idx.changePct.startsWith("-") ? "text-rose-300" : "text-emerald-300"}`}>
                {idx.changePct}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
