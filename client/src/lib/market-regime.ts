import type { MarketRegime } from "@shared/schema";

// Hardcoded daily market-direction call per William O'Neil / IBM methodology.
// Updated manually each trading day by the research desk.
export const marketRegime: MarketRegime = {
  asOf: "July 23, 2026 (close)",
  status: "Uptrend Under Pressure",
  summary:
    "Thursday's session marked the market's worst loss in a month: the Nasdaq Composite sank 2.15% to 25,137.69 on heavy tech selling led by Alphabet and Tesla, the S&P 500 dropped 1.21% to 7,408.30, and the Dow fell 0.97% to 51,711.65. Rising oil prices on Middle East tensions added pressure. With a fresh distribution day stacking onto recent supply, the tape remains an uptrend under pressure until a strong rally confirms on expanding volume.",
  indices: [
    { name: "S&P 500", level: "7,408", changePct: "-1.21%" },
    { name: "Nasdaq Composite", level: "25,138", changePct: "-2.15%" },
    { name: "Dow Jones", level: "51,712", changePct: "-0.97%" },
  ],
};
