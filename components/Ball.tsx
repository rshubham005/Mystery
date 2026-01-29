"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Ball as BallType } from "@/types/game";

interface BallProps {
    ball: BallType;
    onClick: () => void;
    disabled?: boolean;
    index: number;
}

const ballVariants: Variants = {
    hidden: {
        scale: 0,
        opacity: 0,
        y: 50
    },
    show: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }
};

export function Ball({ ball, onClick, disabled, index }: BallProps) {
    return (
        <motion.button
            layout
            variants={ballVariants}
            onClick={onClick}
            disabled={disabled || ball.isRevealed}
            whileHover={!ball.isRevealed ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={!ball.isRevealed ? { scale: 0.9 } : {}}
            className={cn(
                "relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 border-none overflow-hidden hover:z-10",
                ball.isRevealed
                    ? "bg-slate-900 shadow-[0_0_25px_rgba(34,211,238,0.5),inset_0_0_10px_rgba(34,211,238,0.2)]"
                    : "bg-red-600 shadow-[0_5px_15px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.2),inset_0_-2px_5px_rgba(0,0,0,0.2)]"
            )}
        >
            {/* Floating Wrapper for inner content */}
            <motion.div
                className="w-full h-full absolute inset-0 flex items-center justify-center"
                animate={{
                    y: ball.isRevealed ? 0 : [0, -6, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1 // Deterministic delay based on index
                }}
            >
                {/* Closed State (Monster Ball Design) */}
                {
                    !ball.isRevealed && (
                        <div className="absolute inset-0 w-full h-full pointer-events-none">
                            {/* Main Red Top / White Bottom gradient base */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#dc2626] to-[#b91c1c] via-[#ef4444] rounded-full" />

                            {/* Bottom White Half */}
                            <div className="absolute bottom-[2%] left-0 w-full h-[46%] bg-gradient-to-b from-[#e2e8f0] to-[#cbd5e1] rounded-b-full border-t-[3px] border-slate-900/10" />

                            {/* Glossy Overlay (Top Shine) */}
                            <div className="absolute top-[5%] left-[10%] w-[80%] h-[40%] bg-gradient-to-b from-white/40 to-transparent rounded-t-full opacity-80" />

                            {/* Hard Reflection Spot */}
                            <div className="absolute top-[15%] left-[25%] w-[15%] h-[10%] bg-white blur-[2px] rounded-full opacity-70" />

                            {/* Center Belt */}
                            <div className="absolute top-1/2 left-0 w-full h-[12%] bg-[#1e293b] transform -translate-y-1/2 shadow-inner z-10" />

                            {/* Center Button */}
                            <div className="absolute top-1/2 left-1/2 w-[28%] h-[28%] bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_2px_5px_rgba(0,0,0,0.4)] flex items-center justify-center border-[3px] border-[#1e293b]">
                                <div className="w-[40%] h-[40%] bg-white rounded-full border border-gray-300 shadow-inner" />
                                <div className="absolute inset-0 rounded-full shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)]" />
                            </div>
                        </div>
                    )
                }

                {/* Reveal Flash Effect */}
                {
                    ball.isRevealed && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 bg-white rounded-full z-20 pointer-events-none"
                            />

                            {/* Number */}
                            <motion.span
                                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="z-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] font-mono text-3xl tracking-tighter"
                            >
                                {ball.assignedNumber}
                            </motion.span>

                            {/* Inner Glow Ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-pulse" />
                        </>
                    )
                }
            </motion.div>
        </motion.button>
    );
}
