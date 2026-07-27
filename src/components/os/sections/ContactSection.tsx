import { useEffect, useState } from "react";
import { Stage } from "../primitives";

const CHANNELS = [
  { id: "email", label: "E-mail", value: "layse.srondon02@gmail.com", href: "mailto:layse.srondon02@gmail.com" },
  { id: "linkedin", label: "LinkedIn", value: "/in/layserondon", href: "https://www.linkedin.com/in/layse-rondon" },
  { id: "github", label: "GitHub", value: "@layserondon", href: "https://github.com/layserondon" },
  { id: "whatsapp", label: "WhatsApp", value: "Mensagem direta", href: "https://wa.me/11997980272" },
];

const HANDSHAKE = ["negociando conexão", "verificando chave", "canal aberto"];

export function ContactSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const ids = HANDSHAKE.map((_, i) => window.setTimeout(() => setStep(i + 1), 320 + i * 260));
    return () => ids.forEach(window.clearTimeout);
  }, []);

  const ready = step >= HANDSHAKE.length;

  return (
    <Stage
      eyebrow="canal de comunicação"
      title="Vamos conversar sobre seu projeto."
      intro="Escolha o canal de contato que preferir. Responderei pelo mesmo meio."
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr]">
        <div className="panel assemble p-5" style={{ "--d": "140ms" } as React.CSSProperties}>
          <span className="label-mono">estabelecendo conexão</span>
          <ul className="mt-4 space-y-2 font-mono text-[0.72rem]">
            {HANDSHAKE.map((h, i) => (
              <li key={h} className="flex items-center gap-3">
                <span className="text-primary">{i < step ? "›" : "·"}</span>
                <span className={i < step ? "text-foreground/85" : "text-muted-foreground/50"}>{h}</span>
                <span className="ml-auto text-[0.62rem] text-muted-foreground">{i < step ? "ok" : "…"}</span>
              </li>
            ))}
          </ul>
          <div className="hairline my-4" />
          <p className="text-base leading-relaxed text-foreground/90">
            Pronta para construir seu software inteligente.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Vamos criar soluções que automatizam, simplificam e melhoram seu fluxo de trabalho.
          </p>
          <div
            className="mt-5 flex items-center gap-2 font-mono text-[0.68rem]"
            aria-live="polite"
          >
            <span className={`size-1.5 rounded-full ${ready ? "live-dot bg-primary" : "bg-muted-foreground/50"}`} />
            <span className={ready ? "signal-text" : "text-muted-foreground"}>
              {ready ? "canal de comunicação pronto" : "aguardando confirmação"}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {CHANNELS.map((c, i) => (
            <a
              key={c.id}
              href={c.href}
              target="_blank"
              rel="noreferrer noopener"
              className="panel assemble group p-5 transition-all duration-300 hover:border-primary/55 hover:shadow-[var(--glow-signal)]"
              style={{ "--d": `${220 + i * 90}ms` } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="label-mono">{c.label}</span>
                <span className="font-mono text-[0.65rem] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  conectar
                </span>
              </div>
              <p className="mt-3 break-all text-sm text-foreground/90">{c.value}</p>
              <div className="hairline draw-x mt-4" style={{ "--d": `${360 + i * 90}ms` } as React.CSSProperties} />
            </a>
          ))}
        </div>
      </div>
    </Stage>
  );
}
