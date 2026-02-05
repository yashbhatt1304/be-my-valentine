import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

export default function RosePage() {
    const [flowerCount, setFlowerCount] = useState(0);

    // Get name from query
    const p = new URLSearchParams(window.location.search);
    const name = p.get("to") || "Cutie Pie";

    // Generate random roses
    const roses = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
    }));

    const handleGiveRose = () => {
        setFlowerCount(c => c + 1);
    };

    const isComplete = flowerCount > 4;

    return (
        <main className="min-h-screen bg-red-50 overflow-hidden relative flex flex-col items-center justify-center p-4">
            {/* Falling Roses */}
            {roses.map((rose) => (
                <motion.div
                    key={rose.id}
                    initial={{ y: -100, x: `${rose.x}vw`, rotate: 0 }}
                    animate={{ y: "110vh", rotate: 360 }}
                    transition={{
                        duration: rose.duration,
                        repeat: Infinity,
                        delay: rose.delay,
                        ease: "linear"
                    }}
                    className="fixed text-red-500 opacity-60 z-0"
                >
                    <Flower2 size={32 + Math.random() * 20} />
                </motion.div>
            ))}

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-red-200 z-10 text-center max-w-lg w-full"
            >
                <h1 className="text-4xl font-black text-red-600 mb-6">Happy Rose Day! 🌹</h1>
                <p className="text-lg text-gray-700 mb-8">
                    A rose for the most beautiful person I know.
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8 h-24 items-center">
                    {Array.from({ length: flowerCount }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            <Flower2 size={40} className="text-red-500 fill-red-500" />
                        </motion.div>
                    ))}
                </div>

                {!isComplete ? (
                    <motion.button
                        onClick={handleGiveRose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-red-600 transition-colors"
                    >
                        Give a Rose 🌹
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl font-bold text-red-600"
                    >
                        Happy Rose Day, {name}! 🌹
                    </motion.div>
                )}

                <p className="mt-4 text-sm text-gray-400">
                    {!isComplete ? "(Click 5 times to proceed!)" : "You have collected all the roses!"}
                </p>
            </motion.div>
        </main>
    );
}
