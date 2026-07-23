// William O'Neil + Co. — Daily Stock Intelligence data model.
// Data is refreshed daily from the firm's proprietary screen (Excel export) plus
// AI-driven research. No persistent database is used — this file defines the
// shapes; the actual daily values live in client/src/lib/stock-data.ts.

export type Rating = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E";

export type LeadershipFlag = "Leader" | "Laggard";

export type ConvictionLevel = "High" | "Medium" | "Low";

export interface SourceLink {
  label: string;
  url: string;
}

export interface LinkedSegment {
  /** clause or bullet text, with trailing punctuation stripped */
  text: string;
  /** source URL backing this specific claim; undefined when no confident match */
  url?: string | null;
}

export interface StockAnalysis {
  /** 3 bullets, each individually sourced */
  bullCase: LinkedSegment[];
  /** 3 bullets, each individually sourced */
  bearCase: LinkedSegment[];
  /** news catalysts, split into sourced clauses */
  catalysts: LinkedSegment[];
  /** red flag notes, split into sourced clauses */
  redFlags: LinkedSegment[];
  /** consensus / social / analyst narrative, split into sourced clauses */
  narrative: LinkedSegment[];
  /** 3 bullets, each individually sourced — thematic/sectoral tailwinds & headwinds */
  industry: LinkedSegment[];
  /** 40-50 words — synthesized verdict, shown in full, unlinked */
  verdict: string;
  sources: SourceLink[];
}

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  industry: string;

  marketCapM: number; // $M
  avgDollarVolM: number; // average $ volume, $M

  price: number;
  priceChangePct: number; // daily % change
  volume: number; // shares, today
  volVsAvgPct: number; // volume vs. average, %

  epsRating: number; // 1-99
  rsRating: number; // 1-99
  smrRating: number | null; // 1-99 (Sales+Margins+ROE composite score); null when not yet rated (e.g. base still forming)
  adRating: Rating; // Accumulation/Distribution letter
  compositeRating: number; // 1-99
  groupRank: number; // industry group rank (lower is better)
  offHighPct: number; // % off 52-week high (negative value)

  baseStatus: string; // e.g. "Complete"
  weeksInBase: number;
  pivotChangePct: number; // % change vs. pivot price

  leadershipFlag: LeadershipFlag;
  chartActionFlag: string; // e.g. "Buy Zone" | "Profit Booking Zone"
  priceVolAction: string; // e.g. "Up in Price" | "Down in Price" | "Up on Volume"

  analysis: StockAnalysis;
}

export interface MarketRegime {
  asOf: string; // human readable date
  status: string; // hardcoded daily O'Neil-methodology market direction call
  summary: string; // 40-50 words
  indices: {
    name: string;
    level: string;
    changePct: string;
  }[];
}

const RATING_SCORE: Record<Rating, number> = {
  "A+": 97,
  A: 93,
  "A-": 90,
  "B+": 87,
  B: 83,
  "B-": 80,
  "C+": 77,
  C: 73,
  "C-": 70,
  "D+": 67,
  D: 63,
  "D-": 60,
  E: 50,
};

/**
 * Conviction Score: transparent average of the five William O'Neil
 * methodology ratings (EPS, RS, Composite, SMR, and A/D converted to a
 * numeric score). Conviction Level buckets the score into High/Medium/Low.
 * Computed on the fly from the daily ratings — never hardcoded.
 */
export function computeConviction(stock: Stock): { score: number; level: ConvictionLevel } {
  const adScore = RATING_SCORE[stock.adRating] ?? 70;
  const inputs = [stock.epsRating, stock.rsRating, stock.compositeRating, adScore];
  if (stock.smrRating !== null) inputs.push(stock.smrRating);
  const score = inputs.reduce((sum, v) => sum + v, 0) / inputs.length;
  const rounded = Math.round(score * 10) / 10;
  const level: ConvictionLevel = rounded >= 88 ? "High" : rounded >= 70 ? "Medium" : "Low";
  return { score: rounded, level };
}
