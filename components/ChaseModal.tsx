"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy } from "lucide-react";
import { ChaseItem } from "@/types/game";
import { cn } from "@/lib/utils";

interface ChaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    chaseItems: ChaseItem[];
    onToggleChase: (id: string) => void;
}

export function ChaseModal({ isOpen, onClose, chaseItems, onToggleChase }: ChaseModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-cyan-500/50 rounded-2xl p-6 w-full max-w-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                        >
                            <div className="flex justify-between items-center mb-6 border-b border-cyan-500/20 pb-4">
                                <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                    Chase Prizes
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {chaseItems.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => onToggleChase(item.id)}
                                        className={cn(
                                            "p-4 rounded-lg border flex items-center justify-between transition-colors cursor-pointer hover:bg-slate-700/50",
                                            item.isPulled
                                                ? "bg-slate-800/50 border-slate-700 text-gray-500 line-through"
                                                : "bg-slate-800 border-cyan-500/30 text-white shadow-sm"
                                        )}
                                    >
                                        <span className="font-medium">{item.name}</span>
                                        {item.isPulled && (
                                            <span className="text-xs uppercase font-bold bg-red-900/50 text-red-400 px-2 py-1 rounded">
                                                Pulled
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                Prizes are hidden behind random mystery balls!
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
