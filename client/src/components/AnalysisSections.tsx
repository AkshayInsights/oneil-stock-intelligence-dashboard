import type { ComponentType } from "react";
import { ChevronRight } from "lucide-react";
import type { LinkedSegment } from "@shared/schema";

export function Section({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  tone?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-1.5">
      <h4 className={`flex items-center gap-1.5 text-xs font-semibold ${tone ?? "text-foreground"}`}>
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {title}
      </h4>
      {children}
    </section>
  );
}

/** Clickable row shown in the card body; opens the section's detail dialog on click. */
export function SectionLink({
  icon: Icon,
  title,
  tone,
  onClick,
  testId,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  tone?: string;
  onClick: () => void;
  testId: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-1 rounded-sm px-1.5 py-1 text-left text-[11px] font-medium leading-tight transition-colors hover:bg-muted/70 ${tone ?? "text-primary"}`}
      data-testid={testId}
    >
      <span className="flex min-w-0 items-center gap-1">
        <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
        <span className="whitespace-nowrap">{title}</span>
      </span>
      <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 opacity-60" aria-hidden />
    </button>
  );
}

function capitalize(s: string) {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

/** Bullet list of plain (non-linked) claims. */
export function BulletList({ items, testId }: { items: LinkedSegment[]; testId: string }) {
  return (
    <ul className="space-y-1.5" data-testid={testId}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-1.5 text-xs leading-relaxed text-foreground/90">
          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
          <span data-testid={`${testId}-${i}`}>{item.text}.</span>
        </li>
      ))}
    </ul>
  );
}

/** Flowing paragraph reassembled from clauses, rendered as plain text. */
export function LinkedParagraph({ segments, testId }: { segments: LinkedSegment[]; testId: string }) {
  const text = segments.map((seg) => capitalize(seg.text)).join(". ") + ".";
  return (
    <p className="text-xs leading-relaxed text-foreground/90" data-testid={testId}>
      {text}
    </p>
  );
}
