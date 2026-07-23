export function formatMarketCap(m: number): string {
  // input is in $M
  if (m >= 1000) return `$${(m / 1000).toFixed(1)}B`;
  return `$${m.toFixed(0)}M`;
}

export function formatDollarVol(m: number): string {
  // input is in $M
  return `$${m.toFixed(1)}M`;
}

export function formatVolume(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return `${v}`;
}

export function formatPct(v: number, decimals = 1): string {
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(decimals)}%`;
}

export function formatPrice(v: number): string {
  return `$${v.toFixed(2)}`;
}
