import { useState } from "react";
import { Stage } from "../primitives";
import { cn } from "@/lib/utils";

const MODULES = [
  { id: "prog", title: "Programação", items: ["Python", "JavaScript"] },
  { id: "front", title: "Frontend", items: ["React", "HTML", "CSS"] },
  { id: "back", title: "Backend", items: ["FastAPI", "Flask"] },
  { id: "db", title: "Bancos de Dados", items: ["SQLite", "PostgreSQL"] },
  { id: "auto", title: "Automação", items: ["Selenium", "Playwright", "APIs REST"] },
  { id: "ia", title: "Inteligência Artificial", items: ["OpenAI API", "Prompt Engineering", "Agentes de IA"] },
  { id: "tools", title: "Ferramentas", items: ["Git", "GitHub", "VS Code"] },
];

export function StackSection() {
  const [open, setOpen] = useState<string[]>(["prog", "front"]);
  const [active, setActive] = useState<string | null>("Python");

  const toggle = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <Stage
      eyebrow="módulos técnicos"
      title="Ciclo de tecnologias que eu ativo gradualmente"
      intro="Abra um módulo para inspecionar o conjunto de ferramentas correspondente."
    >
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-2">
          {MODULES.map((m, i) => {
            const expanded = open.includes(m.id);
            return (
              <div
                key={m.id}
                className="panel assemble overflow-hidden"
                style={{ "--d": `${140 + i * 70}ms` } as React.CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => toggle(m.id)}
                  aria-expanded={expanded}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40"
                >
                  <span className="font-mono text-[0.7rem] text-primary">{expanded ? "▾" : "▸"}</span>
                  <span className="text-sm font-medium">{m.title}</span>
                  <span className="ml-auto font-mono text-[0.65rem] text-muted-foreground">
                    {String(m.items.length).padStart(2, "0")} un
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-cine)]"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-2 px-4 pb-4">
                      {m.items.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setActive(item)}
                          className={cn(
                            "panel-flat px-3 py-1.5 font-mono text-[0.7rem] transition-all duration-300",
                            active === item
                              ? "glow-edge border-primary/60 text-primary"
                              : "text-foreground/75 hover:text-foreground",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="panel assemble h-fit p-5 lg:sticky lg:top-0"
          style={{ "--d": "260ms" } as React.CSSProperties}
        >
          <span className="label-mono">unidade selecionada</span>
          <p className="signal-text mt-3 text-2xl font-semibold tracking-tight">{active ?? "—"}</p>
          <div className="hairline my-4" />
          <dl className="space-y-3 font-mono text-[0.7rem]">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">estado</dt>
              <dd className="text-primary">ativo</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">uso</dt>
              <dd>projetos práticos/em construção</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">módulos totais</dt>
              <dd>{MODULES.reduce((a, m) => a + m.items.length, 0)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Stage>
  );
}
