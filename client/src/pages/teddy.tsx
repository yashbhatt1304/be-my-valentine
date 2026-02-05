import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function TeddyPage() {
    const [hugged, setHugged] = useState(false);

    // Get name
    const p = new URLSearchParams(window.location.search);
    const name = p.get("to") || "Cutie Pie";

    const handleHug = () => {
        setHugged(true);
    };

    return (
        <main className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-black text-orange-600 mb-12">Teddy Day 🧸</h1>

            {hugged ? (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-orange-900 mb-4">Sending you a big bear hug, {name}! 🫂</h2>
                </motion.div>
            ) : (
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={handleHug}
                >
                    <div className="text-[150px] leading-none select-none filter drop-shadow-xl hover:scale-110 transition-transform">
                        🧸
                    </div>
                </motion.div>
            )}

            <div className="mt-12 text-center">
                <p className="text-2xl font-bold text-orange-800">Free Hugs!</p>
                <p className="text-orange-600">(Click the teddy)</p>
            </div>
        </main>
    );
}
