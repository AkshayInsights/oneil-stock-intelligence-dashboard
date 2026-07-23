import { useState } from "react";
import type { Stock } from "@shared/schema";
import { computeConviction } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RatingGrid } from "@/components/RatingGrid";
import { ConvictionBadge } from "@/components/ConvictionBadge";
import { LeadershipBadge, ChartActionBadge, PriceVolActionTag } from "@/components/FlagBadges";
import { SectionLink, BulletList, LinkedParagraph } from "@/components/AnalysisSections";
import { formatMarketCap, formatDollarVol, formatPct, formatPrice, formatVolume } from "@/lib/format";
import { ArrowUpRight, ArrowDownRight, ShieldAlert, Newspaper, Users, Factory, Gavel } from "lucide-react";

interface Props {
  stock: Stock;
}

const LEVEL_ACCENT: Record<string, string> = {
  High: "before:bg-success",
  Medium: "before:bg-accent",
  Low: "before:bg-destructive",
};

type SectionKey = "bull" | "bear" | "catalysts" | "redFlags" | "narrative" | "industry" | "verdict";

const SECTION_META: Record<
  SectionKey,
  { title: string; icon: typeof ArrowUpRight; tone: string }
> = {
  bull: { title: "Bull Case", icon: ArrowUpRight, tone: "text-success" },
  bear: { title: "Bear Case", icon: ArrowDownRight, tone: "text-destructive" },
  catalysts: { title: "News Catalysts", icon: Newspaper, tone: "text-primary" },
  redFlags: { title: "Red Flag Note", icon: ShieldAlert, tone: "text-destructive" },
  narrative: { title: "Consensus Narrative", icon: Users, tone: "text-primary" },
  industry: { title: "Industry Analysis", icon: Factory, tone: "text-primary" },
  verdict: { title: "Intelligent Verdict", icon: Gavel, tone: "text-accent" },
};

// Grid order for the click-to-reveal links; Conviction is inserted as a static (non-link) cell
// right before Intelligent Verdict so the final row reads Conviction | Intelligent Verdict.
const LINK_ORDER: SectionKey[] = ["bull", "bear", "catalysts", "redFlags", "narrative", "industry"];

export function StockCard({ stock }: Props) {
  const { score, level } = computeConviction(stock);
  const isUp = stock.priceChangePct >= 0;
  const [openSection, setOpenSection] = useState<SectionKey | null>(null);
  const meta = openSection ? SECTION_META[openSection] : null;

  return (
    <Card
      className={`relative flex h-full flex-col gap-3 overflow-hidden rounded-xl p-4 pl-5 shadow-sm transition-shadow duration-200 before:absolute before:inset-y-0 before:left-0 before:w-1 before:content-[''] hover:shadow-md ${LEVEL_ACCENT[level]}`}
      data-testid={`card-stock-${stock.ticker}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold tracking-tight" data-testid={`text-ticker-${stock.ticker}`}>
              {stock.ticker}
            </span>
            <span className="truncate text-xs text-muted-foreground">{stock.name}</span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
            {stock.sector} &middot; {stock.industry}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end gap-1">
          <span className="font-mono text-lg font-semibold tabular-nums" data-testid={`text-price-${stock.ticker}`}>
            {formatPrice(stock.price)}
          </span>
          <span
            className={`font-mono text-xs font-semibold tabular-nums ${isUp ? "text-success" : "text-destructive"}`}
            data-testid={`text-change-${stock.ticker}`}
          >
            ({formatPct(stock.priceChangePct)})
          </span>
          <span
            className={`font-mono text-[10px] font-medium tabular-nums ${stock.volVsAvgPct >= 0 ? "text-success" : "text-destructive"}`}
            data-testid={`text-volvsavg-${stock.ticker}`}
          >
            VOL {formatPct(stock.volVsAvgPct, 0)}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex min-h-[52px] flex-wrap items-start gap-1.5">
        <LeadershipBadge flag={stock.leadershipFlag} />
        <ChartActionBadge flag={stock.chartActionFlag} />
        <PriceVolActionTag action={stock.priceVolAction} />
      </div>

      {/* Ratings */}
      <RatingGrid stock={stock} />

      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <div className="flex justify-between border-b border-border/60 py-1">
          <span className="text-muted-foreground">Mkt Cap</span>
          <span className="font-mono tabular-nums">{formatMarketCap(stock.marketCapM)}</span>
        </div>
        <div className="flex justify-between border-b border-border/60 py-1">
          <span className="text-muted-foreground">Avg $ Vol</span>
          <span className="font-mono tabular-nums">{formatDollarVol(stock.avgDollarVolM)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Volume</span>
          <span className="font-mono tabular-nums">{formatVolume(stock.volume)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="whitespace-nowrap text-muted-foreground">Off 52-Wk Hi</span>
          <span className="font-mono tabular-nums text-destructive">{formatPct(stock.offHighPct)}</span>
        </div>
      </div>

      <Separator />

      {/* Click-to-reveal analysis links, plus Conviction (static) and Intelligent Verdict (click-to-reveal) in the final row */}
      <div className="grid grid-cols-2 gap-0.5 rounded-md border border-border bg-muted/30 p-1" data-testid={`links-analysis-${stock.ticker}`}>
        {LINK_ORDER.map((key) => {
          const { title, icon, tone } = SECTION_META[key];
          return (
            <SectionLink
              key={key}
              icon={icon}
              title={title}
              tone={tone}
              onClick={() => setOpenSection(key)}
              testId={`link-section-${key}-${stock.ticker}`}
            />
          );
        })}
        <div className="flex min-w-0 items-center">
          <ConvictionBadge score={score} level={level} compact />
        </div>
        <SectionLink
          icon={SECTION_META.verdict.icon}
          title={SECTION_META.verdict.title}
          tone={SECTION_META.verdict.tone}
          onClick={() => setOpenSection("verdict")}
          testId={`link-section-verdict-${stock.ticker}`}
        />
      </div>

      {/* Shared detail dialog for whichever section was clicked */}
      <Dialog open={openSection !== null} onOpenChange={(open) => !open && setOpenSection(null)}>
        <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto" data-testid={`dialog-section-${stock.ticker}`}>
          {meta && (
            <>
              <DialogHeader>
                <DialogTitle className={`flex items-center gap-2 text-base ${meta.tone}`}>
                  <meta.icon className="h-4 w-4" aria-hidden />
                  {meta.title}
                  <span className="ml-1 font-mono text-sm text-muted-foreground">&middot; {stock.ticker}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="pt-1">
                {openSection === "bull" && (
                  <BulletList items={stock.analysis.bullCase} testId={`dialog-list-bull-${stock.ticker}`} />
                )}
                {openSection === "bear" && (
                  <BulletList items={stock.analysis.bearCase} testId={`dialog-list-bear-${stock.ticker}`} />
                )}
                {openSection === "catalysts" && (
                  <LinkedParagraph segments={stock.analysis.catalysts} testId={`dialog-text-catalysts-${stock.ticker}`} />
                )}
                {openSection === "redFlags" && (
                  <LinkedParagraph segments={stock.analysis.redFlags} testId={`dialog-text-redflags-${stock.ticker}`} />
                )}
                {openSection === "narrative" && (
                  <LinkedParagraph segments={stock.analysis.narrative} testId={`dialog-text-narrative-${stock.ticker}`} />
                )}
                {openSection === "industry" && (
                  <BulletList items={stock.analysis.industry} testId={`dialog-list-industry-${stock.ticker}`} />
                )}
                {openSection === "verdict" && (
                  <p
                    className="text-sm font-medium leading-relaxed text-foreground"
                    data-testid={`dialog-text-verdict-${stock.ticker}`}
                  >
                    {stock.analysis.verdict}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
