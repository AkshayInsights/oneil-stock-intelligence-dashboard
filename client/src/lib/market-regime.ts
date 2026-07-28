import type { MarketRegime } from "@shared/schema";

// Hardcoded daily market-direction call per William O'Neil / IBM methodology.
// Updated manually each trading day by the research desk.
export const marketRegime: MarketRegime = {
  asOf: "July 27, 2026 (close)",
  status: "Mixed / Rotational",
  summary:
    "Monday's session was a rotational split: the Dow rose 0.51% to 52,210.08 as oil retreated (Brent -6.3% to $85.87) on paused US-Iran tensions, while the Nasdaq slipped 0.18% to 24,932.08 on chip-sector weakness -- Nvidia -5% and the SOX index down ~20% this month -- and AMD-specific profit-taking ahead of its Aug 4 earnings. The S&P 500 was flat (+0.02% to 7,413.18), snapping a 4-session losing streak. With leadership rotating away from semis while cyclicals and travel names firm up, the tape favors selective stock-picking over broad index exposure.",
  indices: [
    { name: "S&P 500", level: "7,413", changePct: "+0.02%" },
    { name: "Nasdaq Composite", level: "24,932", changePct: "-0.18%" },
    { name: "Dow Jones", level: "52,210", changePct: "+0.51%" },
  ],
};
