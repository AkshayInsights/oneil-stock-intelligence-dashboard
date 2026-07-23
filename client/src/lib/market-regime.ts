import type { MarketRegime } from "@shared/schema";

// Hardcoded daily market-direction call per William O'Neil / IBM methodology.
// Updated manually each trading day by the research desk.
export const marketRegime: MarketRegime = {
  asOf: "July 22, 2026 (close)",
  status: "Uptrend Under Pressure",
  summary:
    "The one-day rally attempt that lifted major indices on July 21 lost steam a session later: the S&P 500 eased to 7,498.96, the Nasdaq Composite gave back 0.57% to 25,690.90, and the Dow Jones held roughly flat near 52,218.58. The S&P 500 remains about 1% below its July 15 close, leaving the index still working through overhead supply after last week's slide. Until a clean rally day emerges on expanding volume, free of a fresh distribution day, the tape stays an uptrend under pressure rather than a confirmed advance.",
  indices: [
    { name: "S&P 500", level: "7,499", changePct: "-0.14%" },
    { name: "Nasdaq Composite", level: "25,691", changePct: "-0.57%" },
    { name: "Dow Jones", level: "52,219", changePct: "-0.01%" },
  ],
};
