import { Panel, Stage } from "../primitives";

const SERVICES = [
  { code: "SV-01", title: "Sites Institucionais", value: "Presença digital clara, rápida e fácil de atualizar." },
  { code: "SV-02", title: "Landing Pages", value: "Páginas focadas em conversão, com mensagem e ação diretas." },
  { code: "SV-03", title: "Aplicações Web Modernas", value: "Interfaces reativas para operações do dia a dia." },
  { code: "SV-04", title: "Sistemas para Negócios", value: "Cadastro, controle e relatórios no lugar de planilhas soltas." },
  { code: "SV-05", title: "Automação e Integrações com IA", value: "Tarefas repetitivas executadas sem intervenção humana." },
  { code: "SV-06", title: "Integrações de API", value: "Sistemas diferentes trocando dados sem retrabalho." },
  { code: "SV-07", title: "Interfaces Responsivas", value: "Mesma qualidade de uso em celular, tablet e desktop." },
  { code: "SV-08", title: "Otimização de Performance", value: "Menos espera, mais retenção e melhor posicionamento." },
];

export function ServicesSection() {
  return (
    <Stage
      eyebrow="módulos de atuação"
      title="Sluções que gerem resultado"
      intro="Cada módulo resolve um problema real do seu negócio e contribui para reduzir trabalho manual e aumentar a eficiência."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {SERVICES.map((s, i) => (
          <Panel
            key={s.code}
            delay={140 + i * 65}
            className="group transition-colors duration-300 hover:border-primary/45"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] text-primary">{s.code}</span>
              <span className="size-1.5 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-primary" />
            </div>
            <p className="mt-3 text-sm font-medium leading-tight">{s.title}</p>
            <div className="hairline my-3" />
            <p className="text-[0.78rem] leading-relaxed text-muted-foreground">{s.value}</p>
          </Panel>
        ))}
      </div>
    </Stage>
  );
}
