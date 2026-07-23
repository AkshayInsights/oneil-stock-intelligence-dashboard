import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const { theme, toggle } = useTheme();
  const today = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  return (
    <header className="border-b-2 border-accent/40 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Logo className="h-10 w-auto sm:h-11" />
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:inline">
            {today}
          </span>
          <span className="hidden rounded-full border border-accent/30 bg-gold-highlight px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent sm:inline">
            Powered by CAN SLIM&reg;
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            aria-label="Toggle dark mode"
            data-testid="button-theme-toggle"
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
