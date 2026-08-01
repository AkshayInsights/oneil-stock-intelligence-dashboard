import type { MarketRegime } from "@shared/schema";

// Hardcoded daily market-direction call per William O'Neil / IBM methodology.
// Updated manually each trading day by the research desk.
export const marketRegime: MarketRegime = {
  asOf: "July 31, 2026 (close)",
  status: "Downtrend",
  summary:
    "Friday's session was a broad, Amazon-led rally that snapped the Dow's three-week losing streak: the S&P 500 rose 0.70% to 7,489.72, the Nasdaq Composite gained 1.00% to 25,373.85, and the Dow climbed 0.53% (up more than 410 points intraday) to 52,485.03. For the week the Dow added over 1%, the Nasdaq nearly 1.6% and the S&P close to 1.1%, and cooling June PCE inflation alongside a still-solid 2.1% annualized Q2 GDP print gave investors room to buy the dip. The bounce follows the prior week's sharp, Fed-driven selloff that briefly pushed the Nasdaq more than 10% below its record and remains unconfirmed as a new uptrend under the O'Neil/IBD methodology -- market direction stays Downtrend until a decisive volume-backed follow-through session appears. Leadership is narrow and rotational: mega-cap AI beneficiaries (Apple, Amazon) and select biotech/security names are leading, while the Nasdaq 100 is still down roughly 5% for the month and small-caps (Russell 2000 -0.5% Friday) lag. With the trend still technically broken despite the rally, the tape continues to favor completed bases with real earnings acceleration at reduced position size over broad index exposure until a confirmed uptrend signal arrives.",
  indices: [
    { name: "S&P 500", level: "7,489.72", changePct: "+0.70%" },
    { name: "Nasdaq Composite", level: "25,373.85", changePct: "+1.00%" },
    { name: "Dow Jones", level: "52,485.03", changePct: "+0.53%" },
  ],
};
