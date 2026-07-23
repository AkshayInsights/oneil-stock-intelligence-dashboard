import type { Stock } from "@shared/schema";
import raw from "./stocks-data.json";

// Daily stock intelligence feed — refreshed each trading day from the firm's
// proprietary screen export plus AI-driven research. Cast through unknown
// because the JSON literal types are wider than the string-literal unions.
export const stocks: Stock[] = raw as unknown as Stock[];

export function getStockByTicker(ticker: string): Stock | undefined {
  return stocks.find((s) => s.ticker === ticker);
}
