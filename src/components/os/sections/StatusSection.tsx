import { useEffect, useState } from "react";
import { Meter, Panel, Stage } from "../primitives";

const AVAILABILITY = ["Aberta para estágio", "Aberta para freelance", "Aberta para colaborações"];
const FOCUS = [
  { label: "Python", value: 88 },
  { label: "React", value: 74 },
  { label: "Automação com IA", value: 81 },
  { label: "Desenvolvimento Full Stack", value: 66 },
  { label: "Inteligência Artificial", value: 71 },
];

export function StatusSection() {
  const [clock, setClock] = useState("--:--:--");
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const tick = () => {
      setClock(new Date().toLocaleTimeString("pt-BR", { hour12: false }));
      setUptime((u) => u + 1);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Stage
      eyebrow="painel operacional"
      title="Status atual e disponibilidade"
      intro="Leitura viva do que estou praticando agora e de como podemos trabalhar juntos."
    >
      <div className="grid gap-3 lg:grid-cols-3">
        <Panel delay={140} className="lg:col-span-1">
          <span className="label-mono">estado do sistema</span>
          <div className="mt-4 flex items-center gap-3">
            <span className="live-dot inline-block size-2.5 rounded-full bg-primary" />
            <span className="signal-text text-3xl font-semibold tracking-tight">ONLINE</span>
          </div>
          <div className="hairline my-4" />
          <dl className="space-y-2.5 font-mono text-[0.7rem]">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">horário local</dt>
              <dd>{clock}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">sessão ativa</dt>
              <dd>{String(uptime).padStart(4, "0")}s</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">resposta média</dt>
              <dd className="text-primary">&lt; 24h</dd>
            </div>
          </dl>
        </Panel>

        <Panel delay={230}>
          <span className="label-mono">disponibilidade</span>
          <ul className="mt-4 space-y-2.5">
            {AVAILABILITY.map((a, i) => (
              <li
                key={a}
                className="panel-flat assemble-right flex items-center gap-3 px-3 py-2.5"
                style={{ "--d": `${330 + i * 90}ms` } as React.CSSProperties}
              >
                <span className="live-dot size-1.5 rounded-full bg-primary" />
                <span className="text-sm">{a}</span>
                <span className="ml-auto font-mono text-[0.62rem] text-primary">livre</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel delay={320}>
          <span className="label-mono">foco atual</span>
          <ul className="mt-4 space-y-3">
            {FOCUS.map((f, i) => (
              <li key={f.label}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm">{f.label}</span>
                  <span className="font-mono text-[0.65rem] text-muted-foreground">{f.value}%</span>
                </div>
                <div className="mt-1.5">
                  <Meter value={f.value} delay={420 + i * 80} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Stage>
  );
}
