import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Baby, Sparkles } from "lucide-react";

function getNameFromQuery() {
  const p = new URLSearchParams(window.location.search);
  const raw = (p.get("to") || "").trim();
  return raw.length ? raw : "Cutie Pie";
}

export default function ValentinePage() {
  const [, navigate] = useLocation(); // Keep navigate if needed for other things, but we removed it. Actually I can remove useLocation if unused. But let's keep it safe.
  const [toName] = useState(() => getNameFromQuery());
  const playAreaRef = useRef<HTMLDivElement | null>(null);
  const [area, setArea] = useState({ w: 0, h: 0 });
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isCelebrated, setIsCelebrated] = useState(false);
  const [gifUrl, setGifUrl] = useState("/gifs/celebration_GIF_1770055379647.gif");

  const gifs = [
    "/gifs/Celebrate_Happy_Birthday_GIF_by_Sesame_Street_1770055379648.gif",
    "/gifs/Cry_More_Real_Madrid_GIF_1770055379648.gif",
    "/gifs/Fuck_Yeah_Reaction_GIF_1770055379648.gif",
    "/gifs/celebration_GIF_1770055379647.gif"
  ];

  useEffect(() => {
    const updateArea = () => {
      if (playAreaRef.current) {
        const r = playAreaRef.current.getBoundingClientRect();
        setArea({ w: r.width, h: r.height });
      }
    };
    window.addEventListener("resize", updateArea);
    updateArea();
    return () => window.removeEventListener("resize", updateArea);
  }, []);

  const moveNoButton = () => {
    const padding = 20;
    const btnW = 100;
    const btnH = 40;
    // Move rapidly and stay on top (z-index handled in JSX)
    const nx = Math.random() * (area.w - btnW - padding * 2) + padding;
    const ny = Math.random() * (area.h - btnH - padding * 2) + padding;
    setNoPos({ x: nx, y: ny });
  };

  const handleYes = () => {
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    setGifUrl(randomGif);
    setIsCelebrated(true);
  };

  return (
    <main className="min-h-screen baby-pattern bg-[hsl(var(--background))] overflow-hidden relative">
      <div className="fixed top-4 left-4 w-12 h-12 text-primary opacity-40"><Baby size={48} /></div>
      <div className="fixed top-4 right-4 w-12 h-12 text-primary opacity-40 rotate-12"><Heart size={48} /></div>
      <div className="fixed bottom-4 left-4 w-12 h-12 text-primary opacity-40 -rotate-12"><Baby size={48} /></div>
      <div className="fixed bottom-4 right-4 w-12 h-12 text-primary opacity-40"><Sparkles size={48} /></div>

      <div className="max-w-xl mx-auto min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div
          className="bg-white/90 backdrop-blur-md border-4 border-primary/20 p-8 rounded-[3rem] shadow-2xl text-center w-full relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <AnimatePresence>
            {isCelebrated && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center bg-primary"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                animate={{ clipPath: "circle(150% at 50% 50%)" }}
                transition={{ duration: 0.8, ease: "easeIn" }}
              >
                <div className="text-white text-4xl font-bold flex flex-col items-center gap-4 text-center p-4">
                  <motion.img
                    src={gifUrl}
                    alt="Celebration"
                    className="w-full max-w-sm h-auto object-contain rounded-xl border-4 border-white/50 mb-4"
                    animate={{ scale: [0.95, 1.05, 1] }}
                  />
                  <motion.div animate={{ rotate: 360, scale: [1, 2, 1] }} transition={{ duration: 0.5 }}>✨ 💥 ✨</motion.div>
                  <p className="font-serif italic text-2xl">You're My Heart, My Soul, My Valentine, {toName}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="waddle inline-block mb-4">
            <img
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmF0MzZpNG05cWR2MzdzdXhjZjdmNjVnbjVyNXN4MzBoOXlpMno1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7vDoUoDZHoUQxMPkd7/giphy.gif"
              alt="Cute baby"
              className="w-32 h-32 object-contain rounded-full border-4 border-primary/10"
            />
          </motion.div>

          <h1 className="text-4xl font-serif font-black text-foreground mb-2">
            Hello, <span className="text-primary italic">{toName}</span>!
          </h1>
          <h2 className="text-xl font-bold text-primary mb-8">Will you be my valentine?</h2>

          <div
            ref={playAreaRef}
            className="h-64 border-2 border-dashed border-primary/20 rounded-[2rem] bg-primary/5 relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center gap-8">
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-primary text-white text-2xl font-black rounded-full shadow-lg z-10"
                data-testid="button-yes"
              >
                YES!
              </motion.button>
            </div>

            <motion.button
              onMouseEnter={moveNoButton}
              onFocus={moveNoButton}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: "spring", stiffness: 1500, damping: 15 }} // More sensitive/rapid
              className="absolute pointer-events-auto px-6 py-2 bg-slate-200 text-slate-500 rounded-full font-bold cursor-not-allowed opacity-90 z-30" // Higher z-index than Yes
              style={{ top: 0, left: 0 }}
              data-testid="button-no"
            >
              No
            </motion.button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground italic">
            (P.S. There is only one right answer!)
          </p>
        </motion.div>
      </div>
    </main>
  );
}
