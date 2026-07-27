import { useState } from "react";
import { Stage } from "../primitives";
import { cn } from "@/lib/utils";

const PHASES = [
  { id: "01", title: "Descoberta", detail: "Entender o processo real, quem usa e onde o tempo se perde." },
  { id: "02", title: "Planejamento", detail: "Definir escopo mínimo viável, prioridades e critérios de pronto." },
  { id: "03", title: "Arquitetura", detail: "Escolher camadas, dados e integrações antes de escrever a primeira linha." },
  { id: "04", title: "Desenvolvimento", detail: "Entregas curtas, código legível e revisão contínua." },
  { id: "05", title: "Testes", detail: "Casos de borda, falhas previstas e validação com uso real." },
  { id: "06", title: "Publicação", detail: "Ambiente configurado, versionamento e rollback possível." },
  { id: "07", title: "Melhoria contínua", detail: "Métricas de uso alimentam o próximo ciclo de ajuste." },
];

export function ProcessSection() {
  const [active, setActive] = useState("01");

  return (
    <Stage
      eyebrow="fluxo de engenharia"
      title="Da conversa inicial até a melhoria contínua"
      intro="Selecione uma etapa para inspecionar o que acontece nela."
    >
      <div className="relative pb-2">
        <div
          className="hairline draw-x absolute left-4 right-4 top-[38px] hidden lg:block"
          style={{ "--d": "240ms" } as React.CSSProperties}
        />
        <div className="thin-scroll flex gap-3 overflow-x-auto pb-3 lg:grid lg:grid-cols-7 lg:overflow-visible">
          {PHASES.map((p, i) => {
            const on = active === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                aria-pressed={on}
                className={cn(
                  "panel assemble-right relative min-w-[168px] shrink-0 p-4 text-left transition-all duration-400",
                  on ? "glow-edge border-primary/60 lg:-translate-y-1" : "hover:border-primary/35",
                )}
                style={{ "--d": `${160 + i * 80}ms` } as React.CSSProperties}
              >
                <span className="font-mono text-[0.65rem] text-primary">{p.id}</span>
                <span
                  className={cn(
                    "mt-3 block size-2 rounded-full",
                    on ? "live-dot bg-primary" : "bg-muted-foreground/40",
                  )}
                />
                <p className="mt-3 text-sm font-medium leading-tight">{p.title}</p>
              </button>
            );
          })}
        </div>

        <div
          className="panel assemble mt-4 p-5"
          style={{ "--d": "460ms" } as React.CSSProperties}
          aria-live="polite"
        >
          <span className="label-mono">etapa {active}</span>
          <p className="mt-2 text-base text-foreground/90 sm:text-lg">
            {PHASES.find((p) => p.id === active)?.detail}
          </p>
        </div>
      </div>
    </Stage>
  );
}
