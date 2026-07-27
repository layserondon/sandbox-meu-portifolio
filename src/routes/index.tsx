import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { enterClass, exitClass, useDeck, type CameraMove } from "@/components/os/useDeck";
import { isAudioEnabled, setAudioEnabled } from "@/lib/deck-audio";
import { BootSection } from "@/components/os/sections/BootSection";
import { DiagnosticsSection } from "@/components/os/sections/DiagnosticsSection";
import { RoadmapSection } from "@/components/os/sections/RoadmapSection";
import { StackSection } from "@/components/os/sections/StackSection";
import { ProjectsSection } from "@/components/os/sections/ProjectsSection";
import { ProcessSection } from "@/components/os/sections/ProcessSection";
import { ServicesSection } from "@/components/os/sections/ServicesSection";
import { StatusSection } from "@/components/os/sections/StatusSection";
import { ContactSection } from "@/components/os/sections/ContactSection";

const TITLE = "Layse Rondon — Desenvolvedora de Software";
const DESCRIPTION =
  "Portfólio interativo de Layse Rondon: Python, React, automação com IA e aplicações web apresentados como uma interface de software.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Screen = {
  id: string;
  nav: string;
  move: CameraMove;
  render: () => React.ReactNode;
};

const SCREENS: Screen[] = [
  { id: "inicio", nav: "Início", move: "zoom", render: () => <BootSection /> },
  { id: "perfil", nav: "Perfil", move: "pan", render: () => <DiagnosticsSection /> },
  { id: "trajetoria", nav: "Trajetória", move: "pan", render: () => <RoadmapSection /> },
  { id: "tecnologias", nav: "Tecnologias", move: "zoom", render: () => <StackSection /> },
  { id: "projetos", nav: "Projetos", move: "zoom", render: () => <ProjectsSection /> },
  { id: "processo", nav: "Processo", move: "pan", render: () => <ProcessSection /> },
  { id: "servicos", nav: "Serviços", move: "pan", render: () => <ServicesSection /> },
  { id: "status", nav: "Status", move: "pan", render: () => <StatusSection /> },
  { id: "contato", nav: "Contato", move: "zoom", render: () => <ContactSection /> },
];

function Index() {
  const { index, prev, dir, moving, go } = useDeck(SCREENS.length);
  const [sound, setSound] = useState(true);

  useEffect(() => {
    setAudioEnabled(sound);
  }, [sound]);

  const current = SCREENS[index];

  return (
    <main className="volumetric relative h-dvh w-full overflow-hidden bg-background">
      <div
        className={cn(
          "grid-field grid-drift pointer-events-none absolute inset-0 transition-opacity duration-700",
          moving ? "opacity-40" : "opacity-100",
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 45%, oklch(0.12 0.02 245 / 78%) 100%)",
        }}
      />

      {/* top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="live-dot inline-block size-1.5 rounded-full bg-primary" />
          <span className="label-mono">layse rondon</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-4">
          <span className="label-mono hidden sm:inline">
            {String(index + 1).padStart(2, "0")} / {String(SCREENS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => setSound((s) => !s)}
            aria-pressed={sound}
            aria-label={sound ? "Desativar som da interface" : "Ativar som da interface"}
            className="panel-flat px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            som {isAudioEnabled() && sound ? "on" : "off"}
          </button>
        </div>
      </div>

      {/* camera stage */}
      <div className="absolute inset-0" style={{ perspective: "1500px" }}>
        {prev !== null ? (
          <div
            key={`prev-${prev}`}
            className={cn("absolute inset-0 will-change-transform", exitClass(current.move, dir))}
            aria-hidden
          >
            {SCREENS[prev].render()}
          </div>
        ) : null}
        <section
          key={`cur-${index}`}
          id={current.id}
          aria-label={current.nav}
          className={cn("absolute inset-0 will-change-transform", enterClass(current.move, dir))}
        >
          {current.render()}
        </section>
      </div>

      {/* navigation rail */}
      <nav
        aria-label="Navegação da interface"
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      >
        {SCREENS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            aria-current={i === index}
            aria-label={s.nav}
            className="group flex items-center justify-end gap-2"
          >
            <span
              className={cn(
                "font-mono text-[0.6rem] uppercase tracking-[0.16em] transition-all duration-300",
                i === index
                  ? "text-primary opacity-100"
                  : "text-muted-foreground opacity-0 group-hover:opacity-100",
              )}
            >
              {s.nav}
            </span>
            <span
              className={cn(
                "block h-[2px] rounded-full transition-all duration-400",
                i === index ? "w-7 bg-primary shadow-[0_0_12px_var(--signal)]" : "w-3.5 bg-muted-foreground/40",
              )}
            />
          </button>
        ))}
      </nav>

      {/* bottom hud */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <span className="label-mono hidden sm:inline">
          {moving ? "câmera em movimento" : "aguardando comando"}
        </span>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="h-[2px] w-full min-w-24 overflow-hidden rounded-full bg-secondary sm:w-40">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-[var(--ease-cine)]"
              style={{ width: `${((index + 1) / SCREENS.length) * 100}%` }}
            />
          </div>
          <span className="label-mono whitespace-nowrap">role para avançar</span>
        </div>
      </div>
    </main>
  );
}
