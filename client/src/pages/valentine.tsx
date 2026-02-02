import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function getNameFromQuery() {
  const p = new URLSearchParams(window.location.search);
  const raw = (p.get("to") || "").trim();
  return raw.length ? raw : "my love";
}

export default function ValentinePage() {
  const [, navigate] = useLocation();
  const [toName, setToName] = useState(() => getNameFromQuery());

  const playAreaRef = useRef<HTMLDivElement | null>(null);
  const [area, setArea] = useState({ w: 640, h: 320 });

  const [yesPos, setYesPos] = useState(() => ({ x: 0, y: 0 }));
  const yesSize = useMemo(() => ({ w: 148, h: 48 }), []);

  useEffect(() => {
    const el = playAreaRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setArea({ w: r.width, h: r.height });
    });

    ro.observe(el);
    const r = el.getBoundingClientRect();
    setArea({ w: r.width, h: r.height });

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setYesPos({
      x: area.w * 0.62 - yesSize.w / 2,
      y: area.h * 0.56 - yesSize.h / 2,
    });
  }, [area.h, area.w, yesSize.h, yesSize.w]);

  const moveYesSomewhereElse = () => {
    const padding = 10;

    const maxX = Math.max(0, area.w - yesSize.w - padding * 2);
    const maxY = Math.max(0, area.h - yesSize.h - padding * 2);

    const nx = padding + Math.random() * maxX;
    const ny = padding + Math.random() * maxY;

    setYesPos({ x: clamp(nx, padding, area.w - yesSize.w - padding), y: clamp(ny, padding, area.h - yesSize.h - padding) });
  };

  const onYes = () => {
    const q = new URLSearchParams();
    q.set("to", toName);
    navigate(`/celebrate?${q.toString()}`);
  };

  const onNo = () => {
    // Static button: intentionally does not move.
    // Just a playful little wiggle via native focus/active styles.
  };

  return (
    <main className="min-h-screen valentine-gradient noise">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10 sm:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-white/70 shadow-sm backdrop-blur"
              data-testid="badge-heart"
            >
              <Heart className="h-5 w-5 text-[hsl(345_83%_55%)]" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-medium text-[hsl(335_16%_35%)]" data-testid="text-tagline">
                Valentine’s micro-site
              </p>
              <p className="font-serif text-lg font-semibold tracking-tight" data-testid="text-title">
                Will you be my Valentine?
              </p>
            </div>
          </div>
          <Link
            href={`/celebrate?to=${encodeURIComponent(toName)}`}
            className="text-xs font-medium text-[hsl(335_16%_35%)] underline underline-offset-4 hover:text-[hsl(335_40%_14%)]"
            data-testid="link-skip"
          >
            Skip →
          </Link>
        </header>

        <section className="mt-8 pop-in">
          <div className="rounded-[28px] border bg-white/70 p-6 shadow-md backdrop-blur soft-glow sm:p-8">
            <div className="grid gap-6 sm:gap-8">
              <div className="grid gap-2">
                <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl" data-testid="text-heading">
                  Hey <span className="text-[hsl(345_83%_55%)]">{toName}</span>
                </h1>
                <p className="max-w-prose text-sm leading-relaxed text-[hsl(335_16%_35%)] sm:text-base" data-testid="text-subtitle">
                  I made you a tiny page with one big question. Choose wisely.
                </p>
              </div>

              <div className="grid gap-2">
                <label
                  className="text-xs font-semibold tracking-wide text-[hsl(335_16%_35%)]"
                  htmlFor="to-name"
                  data-testid="label-name"
                >
                  Dedicated to
                </label>
                <input
                  id="to-name"
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="Enter their name"
                  className="h-11 w-full rounded-2xl border bg-white/80 px-4 text-sm shadow-sm outline-none ring-offset-background transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
                  data-testid="input-name"
                />
                <p className="text-xs text-[hsl(335_16%_35%)]" data-testid="text-hint">
                  Tip: share this link with <span className="font-semibold">?to=Name</span>
                </p>
              </div>

              <div
                ref={playAreaRef}
                className="relative overflow-hidden rounded-[26px] border bg-gradient-to-b from-white/70 to-white/40 p-4 shadow-sm sm:p-5"
                data-testid="panel-buttons"
              >
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-[hsl(345_83%_55%_/_0.20)] blur-2xl" />
                  <div className="absolute -right-14 top-10 h-52 w-52 rounded-full bg-[hsl(290_85%_64%_/_0.18)] blur-2xl" />
                  <div className="absolute left-1/2 bottom-[-50px] h-56 w-56 -translate-x-1/2 rounded-full bg-[hsl(35_95%_55%_/_0.10)] blur-2xl" />
                </div>

                <p className="relative z-10 mb-3 text-xs font-semibold tracking-wide text-[hsl(335_16%_35%)]" data-testid="text-instructions">
                  Try to click “Yes”. (It’s a little shy.)
                </p>

                <div className="relative z-10 h-[220px] sm:h-[240px]" data-testid="area-play">
                  <button
                    type="button"
                    onClick={onNo}
                    className="absolute left-4 top-4 inline-flex h-12 items-center justify-center rounded-2xl border bg-white/85 px-6 text-sm font-semibold text-[hsl(335_40%_14%)] shadow-sm backdrop-blur transition active:scale-[0.98]"
                    data-testid="button-no"
                  >
                    No
                  </button>

                  <motion.button
                    type="button"
                    onClick={onYes}
                    onMouseEnter={moveYesSomewhereElse}
                    onFocus={moveYesSomewhereElse}
                    onPointerDownCapture={moveYesSomewhereElse}
                    animate={{ x: yesPos.x, y: yesPos.y }}
                    transition={{ type: "spring", stiffness: 520, damping: 26 }}
                    className="absolute inline-flex h-12 items-center justify-center rounded-2xl bg-[hsl(345_83%_55%)] px-6 text-sm font-semibold text-white shadow-md shadow-[hsl(345_83%_45%_/_0.25)] transition hover:brightness-105 active:scale-[0.98]"
                    style={{ width: yesSize.w }}
                    data-testid="button-yes"
                  >
                    Yes
                  </motion.button>

                  <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-2xl bg-white/70 px-4 py-3 text-xs text-[hsl(335_16%_35%)] shadow-sm backdrop-blur" data-testid="note-footer">
                    If the Yes button keeps escaping, try tapping it quickly.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-6 flex items-center justify-center">
            <p className="text-xs text-[hsl(335_16%_35%)]" data-testid="text-footer">
              Made with courage and a tiny bit of chaos.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
