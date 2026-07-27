import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Stage({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-16 sm:px-8 lg:px-14">
      <div className={cn("mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-6", className)}>
        <header className="assemble-left" style={{ "--d": "60ms" } as React.CSSProperties}>
          <p className="label-mono">{eyebrow}</p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2.6rem] lg:leading-[1.05]">
            {title}
          </h2>
          {intro ? (
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-[0.95rem]">{intro}</p>
          ) : null}
          <div className="hairline draw-x mt-4" style={{ "--d": "260ms" } as React.CSSProperties} />
        </header>
        <div className="thin-scroll min-h-0 flex-1 overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
}

export function Panel({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("panel assemble p-4 sm:p-5", className)} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function PanelTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="label-mono">{children}</span>
      {right}
    </div>
  );
}

export function Meter({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="load-bar h-full rounded-full bg-primary"
        style={{ width: `${value}%`, "--d": `${delay}ms`, boxShadow: "0 0 12px var(--signal)" } as React.CSSProperties}
      />
    </div>
  );
}

export function Dot({ tone = "signal" }: { tone?: "signal" | "muted" | "warn" }) {
  const color = tone === "signal" ? "bg-primary" : tone === "warn" ? "bg-[var(--warn)]" : "bg-muted-foreground";
  return <span className={cn("inline-block size-1.5 rounded-full", color, tone === "signal" && "live-dot")} />;
}
