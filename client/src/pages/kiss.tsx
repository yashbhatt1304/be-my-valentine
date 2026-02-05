import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function KissPage() {
    const [kisses, setKisses] = useState<{ id: number, x: number, y: number }[]>([]);

    // Get name
    const p = new URLSearchParams(window.location.search);
    const name = p.get("to") || "Cutie Pie";

    const handleKiss = (e: React.MouseEvent) => {
        const newKiss = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY
        };
        setKisses([...kisses, newKiss]);
    };

    const isComplete = kisses.length > 5;

    return (
        <main
            className="min-h-screen bg-pink-100 cursor-crosshair overflow-hidden relative"
            onClick={handleKiss}
        >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="text-center">
                    <h1 className="text-5xl font-black text-pink-600 mb-4">Kiss Day 💋</h1>
                    {isComplete ? (
                        <motion.h2
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-3xl font-bold text-pink-700 mt-4"
                        >
                            Lots of kisses for you, {name}! 😘
                        </motion.h2>
                    ) : (
                        <p className="text-xl text-pink-500">Tap anywhere to send a kiss!</p>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {kisses.map((kiss) => (
                    <motion.div
                        key={kiss.id}
                        initial={{ scale: 0, x: kiss.x, y: kiss.y, opacity: 1 }}
                        animate={{ scale: 2, y: kiss.y - 100, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed text-4xl pointer-events-none"
                    >
                        💋
                    </motion.div>
                ))}
            </AnimatePresence>
        </main>
    );
}
