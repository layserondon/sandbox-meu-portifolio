import { useCallback, useEffect, useRef, useState } from "react";
import { playClick, playWhoosh } from "@/lib/deck-audio";

export type CameraMove = "zoom" | "pan";

const DURATION = 900;

export function useDeck(total: number) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [moving, setMoving] = useState(false);
  const lock = useRef(false);
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (lock.current) return;
      const clamped = Math.max(0, Math.min(total - 1, next));
      setIndex((current) => {
        if (clamped === current) return current;
        lock.current = true;
        setDir(clamped > current ? 1 : -1);
        setPrev(current);
        setMoving(true);
        playWhoosh();
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
          lock.current = false;
          setMoving(false);
          setPrev(null);
          playClick();
        }, DURATION);
        return clamped;
      });
    },
    [total],
  );

  useEffect(() => {
    let wheelAccum = 0;
    let wheelReset: number | null = null;

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      const scroller = target?.closest<HTMLElement>(".thin-scroll");
      if (scroller) {
        const atTop = scroller.scrollTop <= 0;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
      }
      e.preventDefault();
      if (lock.current) return;
      wheelAccum += e.deltaY;
      if (wheelReset) window.clearTimeout(wheelReset);
      wheelReset = window.setTimeout(() => (wheelAccum = 0), 220);
      if (Math.abs(wheelAccum) > 26) {
        const delta = wheelAccum > 0 ? 1 : -1;
        wheelAccum = 0;
        setIndex((c) => {
          go(c + delta);
          return c;
        });
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const forward = ["ArrowDown", "ArrowRight", "PageDown", " "];
      const back = ["ArrowUp", "ArrowLeft", "PageUp"];
      if (forward.includes(e.key)) {
        e.preventDefault();
        setIndex((c) => {
          go(c + 1);
          return c;
        });
      } else if (back.includes(e.key)) {
        e.preventDefault();
        setIndex((c) => {
          go(c - 1);
          return c;
        });
      } else if (e.key === "Home") {
        go(0);
      } else if (e.key === "End") {
        go(total - 1);
      }
    };

    let startY = 0;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      const dx = startX - e.changedTouches[0].clientX;
      const move = Math.abs(dy) > Math.abs(dx) ? dy : dx;
      if (Math.abs(move) < 46) return;
      const target = e.target as HTMLElement | null;
      const scroller = target?.closest<HTMLElement>(".thin-scroll");
      if (scroller && Math.abs(dy) > Math.abs(dx)) {
        const atTop = scroller.scrollTop <= 0;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        if ((move < 0 && !atTop) || (move > 0 && !atBottom)) return;
      }
      setIndex((c) => {
        go(c + (move > 0 ? 1 : -1));
        return c;
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (wheelReset) window.clearTimeout(wheelReset);
    };
  }, [go, total]);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return { index, prev, dir, moving, go };
}

export function enterClass(move: CameraMove, dir: 1 | -1) {
  if (move === "zoom") return dir === 1 ? "cam-zoom-in-enter" : "cam-zoom-out-enter";
  return dir === 1 ? "cam-pan-next-enter" : "cam-pan-prev-enter";
}

export function exitClass(move: CameraMove, dir: 1 | -1) {
  if (move === "zoom") return dir === 1 ? "cam-zoom-in-exit" : "cam-zoom-out-exit";
  return dir === 1 ? "cam-pan-next-exit" : "cam-pan-prev-exit";
}
