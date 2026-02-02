import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Link } from "wouter";

function getNameFromQuery() {
  const p = new URLSearchParams(window.location.search);
  const raw = (p.get("to") || "").trim();
  return raw.length ? raw : "my love";
}

export default function CelebratePage() {
  const toName = getNameFromQuery();

  return (
    <main className="min-h-screen valentine-gradient noise">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10 sm:px-8">
        <section className="mt-10 pop-in">
          <div className="relative overflow-hidden rounded-[30px] border bg-white/70 p-7 shadow-lg backdrop-blur sm:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-80">
              <div className="absolute -left-14 -top-16 h-64 w-64 rounded-full bg-[hsl(345_83%_55%_/_0.22)] blur-3xl" />
              <div className="absolute -right-14 top-10 h-72 w-72 rounded-full bg-[hsl(290_85%_64%_/_0.20)] blur-3xl" />
              <div className="absolute left-1/2 bottom-[-90px] h-80 w-80 -translate-x-1/2 rounded-full bg-[hsl(35_95%_55%_/_0.12)] blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(345_83%_55%)] text-white shadow-md"
                  data-testid="badge-celebrate"
                >
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[hsl(335_16%_35%)]" data-testid="text-celebrate-kicker">
                    Celebration mode
                  </p>
                  <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl" data-testid="text-celebrate-title">
                    Yay!!
                  </h1>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[hsl(335_16%_35%)] sm:text-base" data-testid="text-celebrate-message">
                Dear <span className="font-semibold text-[hsl(335_40%_14%)]">{toName}</span>,
                <br />
                thank you for being my Valentine. You make ordinary days feel like something worth celebrating.
              </p>

              <div className="mt-6 grid gap-3 sm:flex sm:items-center">
                <Link
                  href={`/`}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border bg-white/85 px-5 text-sm font-semibold text-[hsl(335_40%_14%)] shadow-sm backdrop-blur transition hover:bg-white"
                  data-testid="link-back"
                >
                  Back
                </Link>
                <span className="inline-flex items-center gap-2 text-xs text-[hsl(335_16%_35%)]" data-testid="text-heartline">
                  <Heart className="h-4 w-4 text-[hsl(345_83%_55%)]" />
                  Officially adorable.
                </span>
              </div>

              <motion.div
                className="mt-8 grid grid-cols-5 gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                data-testid="grid-confetti"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-10 rounded-2xl"
                    style={{
                      background:
                        i % 3 === 0
                          ? "linear-gradient(135deg, hsl(345 83% 55% / .95), hsl(290 85% 64% / .95))"
                          : i % 3 === 1
                            ? "linear-gradient(135deg, hsl(35 95% 55% / .90), hsl(345 83% 55% / .85))"
                            : "linear-gradient(135deg, hsl(210 90% 56% / .65), hsl(290 85% 64% / .70))",
                    }}
                    animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 2.4, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
                    data-testid={`confetti-${i}`}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
