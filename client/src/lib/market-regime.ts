import type { MarketRegime } from "@shared/schema";

// Hardcoded daily market-direction call per William O'Neil / IBM methodology.
// Updated manually each trading day by the research desk.
export const marketRegime: MarketRegime = {
  asOf: "July 29, 2026 (close)",
  status: "Downtrend",
  summary:
    "Wednesday's session confirmed a Nasdaq-led correction: the Dow plunged 1,153.18 points (-2.19%) to 51,594.14 -- its worst decline since April 2025 -- the S&P 500 fell 1.52% to 7,316.15 (a one-month low), and the Nasdaq Composite dropped 1.74% to 24,442.94, more than 10% off its record. A hawkish Fed hold at 3.50-3.75% (three of twelve members dissented for a hike, citing elevated inflation) sent the 30-year yield above 5.2% -- the highest since 2007 -- while renewed US-Iran hostilities pushed crude up 6.4% to $84.30/bbl, reinforcing inflation concerns. AI-linked hardware names were liquidated on capex worries (SK Hynix -10%, Vertiv -17%, Meta -7-9% after hours) even as Microsoft rose 8-9% after hours on a strong Azure beat. Breadth deteriorated badly (decliners led advancers 1.8-to-1, 230 new lows vs 121 new highs) with only energy and consumer defensives higher. Offsetting the damage, Q2 S&P 500 earnings are tracking +40% y/y and the index now trades near its 10-year average forward multiple. With the trend broken but earnings still strong, the tape favors completed bases with real earnings acceleration at reduced size over broad index exposure.",
  indices: [
    { name: "S&P 500", level: "7,316.15", changePct: "-1.52%" },
    { name: "Nasdaq Composite", level: "24,442.94", changePct: "-1.74%" },
    { name: "Dow Jones", level: "51,594.14", changePct: "-2.19%" },
  ],
};
