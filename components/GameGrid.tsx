"use client";

import { motion } from "framer-motion";
import { Ball as BallComponent } from "./Ball";
import { Ball as BallType } from "@/types/game";

interface GameGridProps {
    balls: BallType[];
    onReveal: (id: number) => void;
    isShuffling?: boolean;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
};

export function GameGrid({ balls, onReveal, isShuffling = false }: GameGridProps) {
    return (
        <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isShuffling ? "exit" : "show"}
                key={isShuffling ? "shuffling" : "grid"} // Force re-mount or re-animate on shuffle state change
                className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 place-items-center"
            >
                {balls.map((ball, index) => (
                    <BallComponent
                        key={ball.id}
                        ball={ball}
                        onClick={() => onReveal(ball.id)}
                        index={index}
                    />
                ))}
            </motion.div>


            {/* Footer Info */}
            <div className="w-full text-center mt-8 pb-4">
                <p className="text-slate-400 font-bold tracking-widest uppercase text-xs sm:text-sm drop-shadow-md">
                    Fair Shuffle • Randomized Every Round
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mt-4 opacity-50" />
            </div>
        </div >
    );
}
