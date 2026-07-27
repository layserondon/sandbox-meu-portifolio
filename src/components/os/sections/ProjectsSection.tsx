import { useState } from "react";
import { Stage } from "../primitives";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    id: "financeiro",
    name: "ControleBrasil",
    short: "Software de planejamento financeiro pessoal e familiar do brasileiro.",
    problem: "A falta de controle e visão sobre gastos simples e aumento de dívidas desnecessárias e imprevisíveis.",
    tech: ["Python","React", "PostgreSQL"],
    architecture: "Cadastrar Receita → React → API (FastAPI) → Validação → PostgreSQL → Atualizar Dashboard → Exibir Novo Saldo",
    features: ["Dashboard • Controle de Receitas e Despesas • Metas Financeiras • Relatórios"],
  }
];

export function ProjectsSection() {
  const [openId, setOpenId] = useState<string>("atlas");

  return (
    <Stage
      eyebrow="registros de construção"
      title="Projetos abertos como janelas de software"
      intro="Cada janela expõe o problema real, a arquitetura e as decisões técnicas por trás da solução."
    >
      <div className="space-y-3">
        {PROJECTS.map((p, i) => {
          const open = openId === p.id;
          return (
            <article
              key={p.id}
              className="panel assemble overflow-hidden"
              style={{ "--d": `${140 + i * 100}ms` } as React.CSSProperties}
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? "" : p.id)}
                className="flex w-full items-center gap-3 border-b border-[var(--panel-edge)] bg-secondary/30 px-4 py-2.5 text-left"
              >
                <span className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-muted-foreground/50" />
                  <span className="size-2 rounded-full bg-muted-foreground/50" />
                  <span className={cn("size-2 rounded-full", open ? "bg-primary" : "bg-muted-foreground/50")} />
                </span>
                <span className="font-mono text-[0.7rem] text-muted-foreground">{p.id}.app</span>
                <span className="ml-auto font-mono text-[0.65rem] text-primary">
                  {open ? "minimizar" : "abrir"}
                </span>
              </button>

              <div className="px-4 py-4 sm:px-5">
                <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.short}</p>

                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-cine)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-4 pt-4 md:grid-cols-2">
                      <div>
                        <p className="label-mono">problema resolvido</p>
                        <p className="mt-1.5 text-sm text-foreground/85">{p.problem}</p>
                        <p className="label-mono mt-4">arquitetura</p>
                        <p className="mt-1.5 font-mono text-[0.7rem] leading-relaxed text-foreground/80">
                          {p.architecture}
                        </p>
                      </div>
                      <div>
                        <p className="label-mono">recursos principais</p>
                        <ul className="mt-1.5 space-y-1.5">
                          {p.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-foreground/85">
                              <span className="size-1 rounded-full bg-primary" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <p className="label-mono mt-4">tecnologias</p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {p.tech.map((t) => (
                            <span key={t} className="panel-flat px-2 py-1 font-mono text-[0.65rem]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href="https://github.com/layserondon/Portifolio-Meu-Primeiro-Software"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="panel-flat px-3 py-2 font-mono text-[0.7rem] text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        repositório
                      </a>
                      <a
                        href=""
                        target="_blank"
                        rel="noreferrer noopener"
                        className="panel-flat glow-edge px-3 py-2 font-mono text-[0.7rem] text-primary"
                      >
                        abrir app
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Stage>
  );
}
