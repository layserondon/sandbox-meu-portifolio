import { useEffect, useState } from "react";
import { Meter, Panel, Stage } from "../primitives";

const CAPABILITIES = [
  { name: "Raciocínio Lógico", value: 92, note: "decomposição de problemas em etapas verificáveis" },
  { name: "Resolução de Problemas", value: 88, note: "hipótese, teste, ajuste, documentação" },
  { name: "Atenção aos Detalhes", value: 90, note: "revisão de estados, bordas e exceções" },
  { name: "Mentalidade de Automação", value: 86, note: "tarefas repetitivas viram scripts" },
  { name: "Aprendizado Rápido e Contínuo", value: 95, note: "ciclo diário de estudo e aplicação" },
  { name: "Código Limpo", value: 80, note: "nomes claros, funções curtas, baixo acoplamento" },
  { name: "Adaptabilidade", value: 89, note: "troca de contexto sem perda de qualidade" },
  { name: "Percepção de UI/UX", value: 76, note: "decisões de interface funcionais para uso real" },
];

export function DiagnosticsSection() {
  const [scanned, setScanned] = useState(0);

  useEffect(() => {
    const ids = CAPABILITIES.map((_, i) => window.setTimeout(() => setScanned(i + 1), 260 + i * 110));
    return () => ids.forEach(window.clearTimeout);
  }, []);

  return (
    <Stage
      eyebrow="diagnóstico operacional"
      title="Como eu penso enquanto construo"
      intro="Leitura em tempo real das características de trabalho aplicadas em cada projeto."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {CAPABILITIES.map((c, i) => (
          <Panel key={c.name} delay={140 + i * 70} className="group">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium">{c.name}</span>
              <span className="font-mono text-[0.68rem] text-primary">
                {scanned > i ? `${c.value}` : "··"}
              </span>
            </div>
            <div className="mt-3">
              <Meter value={scanned > i ? c.value : 0} delay={200 + i * 70} />
            </div>
            <p className="mt-2.5 font-mono text-[0.66rem] leading-relaxed text-muted-foreground">{c.note}</p>
          </Panel>
        ))}
      </div>
    </Stage>
  );
}
