import { useEffect, useState } from "react";

const BOOT_LINES = [
  "verificando integridade do núcleo",
  "montando ambiente de execução",
  "carregando módulos de interface",
  "sincronizando telemetria",
  "canal de apresentação pronto",
];

export function BootSection() {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) => window.setTimeout(() => setStep(i + 1), 220 + i * 190));
    const done = window.setTimeout(() => setReady(true), 220 + BOOT_LINES.length * 190);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-16 sm:px-8">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <div
            className="assemble-left inline-flex items-center gap-2 rounded-full border border-[var(--panel-edge)] px-3 py-1"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            <span className="live-dot inline-block size-1.5 rounded-full bg-primary" />
            <span className="label-mono">portfólio interativo</span>
          </div>

          <h1
            className="assemble-left mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            Layse Rondon
          </h1>

          <p
            className="assemble-left mt-3 text-lg text-muted-foreground sm:text-xl"
            style={{ "--d": "280ms" } as React.CSSProperties}
          >
            Desenvolvedora Full Stack
          </p>

          <div
            className="hairline draw-x my-6 max-w-lg"
            style={{ "--d": "360ms" } as React.CSSProperties}
          />

          <ul className="flex flex-wrap gap-2">
            {["Python", "React", "Automação com IA", "Automação com N8N", "Aplicações Web"].map((t, i) => (
              <li
                key={t}
                className="panel-flat assemble px-3 py-1.5 font-mono text-[0.7rem] tracking-wide text-foreground/85"
                style={{ "--d": `${420 + i * 70}ms` } as React.CSSProperties}
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {["Aprender.","Construir.", "Automatizar."].map((word, i) => (
              <span
                key={word}
                className="type-in signal-text text-xl font-medium tracking-tight sm:text-2xl"
                style={{ "--d": `${720 + i * 220}ms` } as React.CSSProperties}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="panel assemble p-5" style={{ "--d": "240ms" } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <span className="label-mono">sequência de inicialização</span>
            <span className="font-mono text-[0.65rem] text-primary">
              {String(Math.round((step / BOOT_LINES.length) * 100)).padStart(3, "0")}%
            </span>
          </div>
          <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${(step / BOOT_LINES.length) * 100}%`, boxShadow: "0 0 12px var(--signal)" }}
            />
          </div>

          <ol className="mt-5 space-y-2.5">
            {BOOT_LINES.map((line, i) => {
              const active = i < step;
              return (
                <li key={line} className="flex items-center gap-3 font-mono text-[0.72rem]">
                  <span
                    className={`inline-block size-1.5 rounded-full transition-colors duration-300 ${
                      active ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <span className={active ? "text-foreground/85" : "text-muted-foreground/50"}>{line}</span>
                  <span className="ml-auto text-[0.65rem] text-muted-foreground">{active ? "ok" : "—"}</span>
                </li>
              );
            })}
          </ol>

          <div className="hairline my-4" />
          <p className="font-mono text-[0.7rem] text-muted-foreground">
            {ready ? (
              <span className="signal-text">sistema pronto · role para navegar</span>
            ) : (
              "aguardando módulos…"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
