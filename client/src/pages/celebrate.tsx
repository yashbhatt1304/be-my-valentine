import { motion } from "framer-motion";
import { Heart, Sparkles, Stars } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

function getNameFromQuery() {
  const p = new URLSearchParams(window.location.search);
  const raw = (p.get("to") || "").trim();
  return raw.length ? raw : "Cutie Pie";
}

const CELEBRATION_GIFS = [
  "https://giphy.com/embed/gFi7V9CRBQVW0",
  "https://giphy.com/embed/ktU8kAKsyIauRSOoZs",
  "https://giphy.com/embed/doPrWYzSG1Vao",
  "https://giphy.com/embed/QlvPwCTw59B2E",
  "https://giphy.com/embed/Na33dsU2umStO"
];

export default function CelebratePage() {
  const toName = getNameFromQuery();
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 4500); // Wait for some gif celebration time
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen baby-pattern bg-primary overflow-hidden relative flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 0], rotate: 360 }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          >
            <Heart fill="currentColor" size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      {!showCard ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl relative z-10 p-4">
          {CELEBRATION_GIFS.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2, type: "spring" }}
              className="rounded-3xl overflow-hidden border-8 border-white/30 shadow-2xl"
            >
              <iframe src={src} width="100%" height="300" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="col-span-full text-center text-white font-black text-3xl mt-8 animate-pulse"
          >
            GET READY...
          </motion.div>
        </div>
      ) : (
        <motion.div 
          className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-lg relative z-10 border-8 border-white/50"
          initial={{ scale: 0.5, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="inline-block text-primary mb-6"
          >
            <Sparkles size={64} />
          </motion.div>

          <h1 className="text-5xl font-serif font-black text-primary mb-4">
            Yay!
          </h1>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Love you <span className="text-primary italic">{toName}</span>
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            <motion.img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp4MG8zbjN0ZzZneHhyZWgxZzZneHhyZWgxZzZneHhyZWgxZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/X88nB71Qc2C5G/giphy.gif"
              alt="Celebrating baby"
              className="w-24 h-24 rounded-full border-4 border-primary"
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>

          <Link
            href={`/?to=${encodeURIComponent(toName)}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary/20 transition"
          >
            <Stars size={18} /> Restart Magic
          </Link>
        </motion.div>
      )}
    </main>
  );
}
