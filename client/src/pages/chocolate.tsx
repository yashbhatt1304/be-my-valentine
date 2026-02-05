import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function ChocolatePage() {
    const [eaten, setEaten] = useState<number[]>([]);

    // Get name
    const p = new URLSearchParams(window.location.search);
    const name = p.get("to") || "Cutie Pie";

    const chocolates = [1, 2, 3, 4, 5, 6];

    const handleEat = (id: number) => {
        if (!eaten.includes(id)) {
            setEaten([...eaten, id]);
        }
    };

    return (
        <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-black text-amber-800 mb-8">Chocolate Day 🍫</h1>
            <p className="mb-8 text-amber-700">Eat all the chocolates to continue!</p>

            {eaten.length === chocolates.length ? (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-amber-900 mb-4">You're sweeter than chocolate, {name}!</h2>
                </motion.div>
            ) : null}

            <div className="grid grid-cols-3 gap-8">
                {chocolates.map((id) => (
                    <motion.div
                        key={id}
                        initial={{ scale: 1 }}
                        animate={eaten.includes(id) ? { scale: 0, rotate: 180, opacity: 0 } : {}}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEat(id)}
                        className="w-24 h-24 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full shadow-lg flex items-center justify-center cursor-pointer border-4 border-amber-600"
                    >
                        <span className="text-4xl">🍫</span>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
