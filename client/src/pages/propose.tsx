import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ProposePage() {
    const [isOpen, setIsOpen] = useState(false);

    // Get name
    const p = new URLSearchParams(window.location.search);
    const name = p.get("to") || "Cutie Pie";

    const handleOpenBox = () => {
        setIsOpen(true);
    };

    return (
        <main className="min-h-screen bg-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="text-center z-10 w-full max-w-lg">
                <h1 className="text-4xl font-black text-blue-600 mb-12">Propose Day 💍</h1>

                <div className="relative h-64 flex items-center justify-center cursor-pointer" onClick={handleOpenBox}>
                    <motion.div
                        className="w-40 h-40 bg-blue-800 rounded-lg shadow-xl relative z-10 flex items-center justify-center"
                        animate={{ y: isOpen ? 50 : 0 }}
                    >
                        <div className="w-full h-2 bg-blue-900 absolute top-10" />
                    </motion.div>

                    <motion.div
                        className="w-40 h-40 bg-blue-700 rounded-t-lg shadow-2xl absolute top-12 z-20 origin-top"
                        initial={{ rotateX: 0 }}
                        animate={{ rotateX: isOpen ? 120 : 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex justify-center mt-4">
                            <div className="w-8 h-8 rounded-full border-2 border-yellow-400/50" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute top-20 z-10"
                        initial={{ y: 0, opacity: 0, scale: 0.5 }}
                        animate={isOpen ? { y: -80, opacity: 1, scale: 1.5 } : {}}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <div className="text-6xl">💍</div>
                    </motion.div>
                </div>

                <p className="mt-12 text-blue-800 font-medium text-lg">
                    {isOpen ? `Will you be my Sweet Heart ,${name}? 💖` : "Tap the box to open!"}
                </p>
            </div>
        </main>
    );
}
