import { Panel, Stage } from "../primitives";

const COLUMNS = [
  {
    key: "done",
    title: "Consolidado",
    mark: "✔",
    tone: "text-primary",
    items: [
      "Fundamentos de Python",
      "Desenvolvimento Web",
      "HTML",
      "CSS",
      "Fundamentos de JavaScript",
      "Git & GitHub",
      "Design Responsivo",
    ],
  },
  {
    key: "wip",
    title: "Em construção",
    mark: "◉",
    tone: "text-[var(--warn)]",
    items: [
      "React",
      "Backend com Python",
      "FastAPI",
      "Inteligência Artificial",
      "Agentes de IA",
      "Integrações de API",
    ],
  },
  {
    key: "next",
    title: "Próximos objetivos",
    mark: "◎",
    tone: "text-muted-foreground",
    items: [
      "Deploy em nuvem",
      "Docker",
      "PostgreSQL",
      "Aplicações em produção",
      "Projetos freelance",
      "Primeira experiência profissional",
    ],
  },
];

export function RoadmapSection() {
  return (
    <Stage
      eyebrow="trajetória em execução"
      title="Uma rota de evolução, atualizada em tempo real"
      intro="Nada de listas fechadas: o percurso mostra o que já está sólido, o que está em progresso e o que vem a seguir."
    >
      <div className="relative">
        <div
          className="hairline draw-x absolute left-0 right-0 top-9 hidden lg:block"
          style={{ "--d": "220ms" } as React.CSSProperties}
        />
        <div className="grid gap-3 lg:grid-cols-3">
          {COLUMNS.map((col, ci) => (
            <Panel key={col.key} delay={160 + ci * 130} className="relative">
              <div className="flex items-center justify-between">
                <span className="label-mono">{col.title}</span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  {String(col.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="hairline my-3" />
              <ul className="space-y-2">
                {col.items.map((item, i) => (
                  <li
                    key={item}
                    className="assemble-right flex items-center gap-3 rounded-[var(--radius-sm)] px-2 py-1.5 transition-colors hover:bg-secondary/60"
                    style={{ "--d": `${300 + ci * 130 + i * 55}ms` } as React.CSSProperties}
                  >
                    <span className={`font-mono text-xs ${col.tone}`}>{col.mark}</span>
                    <span className="text-sm text-foreground/90">{item}</span>
                    {col.key === "wip" ? (
                      <span className="ml-auto h-[2px] w-10 overflow-hidden rounded-full bg-secondary">
                        <span
                          className="load-bar block h-full rounded-full bg-[var(--warn)]"
                          style={{ width: `${45 + i * 7}%`, "--d": `${420 + i * 60}ms` } as React.CSSProperties}
                        />
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </div>
    </Stage>
  );
}
