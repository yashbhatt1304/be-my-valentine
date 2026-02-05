import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";

export default function HomePage() {
    const links = [
        { to: "/rose", label: "Rose Day", color: "bg-red-500", delay: 0 },
        { to: "/propose", label: "Propose Day", color: "bg-blue-500", delay: 0.1 },
        { to: "/chocolate", label: "Chocolate Day", color: "bg-amber-700", delay: 0.2 },
        { to: "/teddy", label: "Teddy Day", color: "bg-orange-300", delay: 0.3 },
        { to: "/promise", label: "Promise Day", color: "bg-purple-500", delay: 0.4 },
        { to: "/kiss", label: "Kiss Day", color: "bg-red-600", delay: 0.5 },
        { to: "/valentine", label: "Be My Valentine", color: "bg-pink-500", delay: 0.6 },
    ];

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-8 gap-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl"
            >
                <h1 className="text-5xl font-black text-pink-600 mb-4">
                    Valentine Week
                    <Heart className="inline-block ml-4 fill-pink-600 animate-pulse" />
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Create and share special interactive pages for your someone special.
                </p>

                <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">How it works</h2>
                    <ol className="text-left space-y-2 list-decimal list-inside text-gray-600">
                        <li>Choose a day from the cards below</li>
                        <li>Add <code className="bg-gray-100 px-2 py-1 rounded text-pink-600">?to=Name</code> to the URL</li>
                        <li>Share the link with your special one!</li>
                    </ol>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                {links.map((link) => (
                    <Link key={link.to} href={link.to}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: link.delay }}
                            whileHover={{ scale: 1.05, rotate: -2 }}
                            className={`${link.color} p-6 rounded-xl shadow-lg cursor-pointer text-white flex flex-col justify-between h-32 relative overflow-hidden group`}
                        >
                            <h3 className="text-2xl font-bold relative z-10">{link.label}</h3>
                            <ArrowRight className="absolute bottom-4 right-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-12 -mt-12" />
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
