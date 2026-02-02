import { motion } from "framer-motion";
import { Heart, Sparkles, Stars } from "lucide-react";
import { Link } from "wouter";

function getNameFromQuery() {
  const p = new URLSearchParams(window.location.search);
  const raw = (p.get("to") || "").trim();
  return raw.length ? raw : "Cutie Pie";
}

export default function CelebratePage() {
  const toName = getNameFromQuery();

  return (
    <main className="min-h-screen baby-pattern bg-primary overflow-hidden relative flex items-center justify-center p-4">
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

      <motion.div 
        className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-lg relative z-10 border-8 border-white/50"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
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
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHp4MG8zbjN0ZzZneHhyZWgxZzZneHhyZWgxZzZneHhyZWgxZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/X88nB71Qc2C5G/giphy.gif"
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
    </main>
  );
}
