// Brand mark for William O'Neil + Co. — a laurel-wreath medallion seal
// (navy field, gold wreath and ring, crimson ribbon) beside the wordmark
// "WILLIAM O'NEIL+CO." with O'NEIL set bold in crimson. Medallion colors
// are fixed (brand-consistent across light/dark mode), not theme tokens.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline">
          <span
            className="text-muted-foreground"
            style={{ font: "500 15px var(--font-display)", letterSpacing: "0.01em" }}
          >
            WILLIAM&nbsp;
          </span>
          <span className="text-destructive" style={{ font: "800 15px var(--font-display)" }}>
            O&apos;NEIL
          </span>
          <span className="text-muted-foreground" style={{ font: "500 15px var(--font-display)" }}>
            +CO.
          </span>
        </div>
        <span
          className="text-muted-foreground/70"
          style={{ font: "500 8.5px var(--font-sans)", letterSpacing: "0.16em" }}
        >
          INSTITUTIONAL EQUITY RESEARCH
        </span>
      </div>
    </div>
  );
}
