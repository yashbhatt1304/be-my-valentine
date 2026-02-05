import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function PromisePage() {
    const [promised, setPromised] = useState(false);

    // Get name
    const p = new URLSearchParams(window.location.search);
    const name = p.get("to") || "Cutie Pie";

    const handlePromise = () => {
        setPromised(true);
    };

    return (
        <main className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-black text-purple-600 mb-12">Promise Day 🤝</h1>

            <motion.div
                className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-2 border-purple-200"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <p className="text-xl text-purple-900 mb-8 font-serif italic">
                    "I promise to always be there for you, through thick and thin, laughter and tears."
                </p>

                {promised ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-4"
                    >
                        <p className="text-lg font-bold text-green-600 mb-4">Promise kept for {name}! 🤞</p>
                    </motion.div>
                ) : null}

                <motion.button
                    onClick={handlePromise}
                    disabled={promised}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-3 rounded-full font-bold text-lg transition-colors ${promised
                        ? "bg-green-500 text-white"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                >
                    {promised ? "Promise Kept! 🤞" : "I Promise 🤞"}
                </motion.button>
            </motion.div>
        </main>
    );
}
