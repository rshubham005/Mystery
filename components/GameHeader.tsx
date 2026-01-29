"use client";

import { Play, RotateCcw, Eye, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameHeaderProps {
    onShuffle: () => void;
    onReset: () => void;
    isRevealMode: boolean; // Assuming we might want a toggle for "Reveal Mode" later, or just use it for visual state
    toggleRevealMode: () => void;
    isInitialized: boolean;
}

export function GameHeader({ onShuffle, onReset, isRevealMode, toggleRevealMode, isInitialized }: GameHeaderProps) {
    return (
        <header className="w-full h-24 px-6 flex items-center justify-between metallic-surface relative z-20">
            {/* Logo */}
            <div className="flex items-center">
                <h1 className="text-3xl md:text-5xl font-russo text-[#fbbf24] drop-shadow-[0_4px_0_rgba(0,0,0,1)] tracking-wide filter"
                    style={{
                        textShadow: "0 4px 0 #000, -1px -1px 0 #1e3a8a, 1px -1px 0 #1e3a8a, -1px 1px 0 #1e3a8a, 1px 1px 0 #1e3a8a",
                        WebkitTextStroke: "1px #1e3a8a"
                    }}>
                    Mystery Slab Shuffle
                </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">

                {/* Shuffle Button */}
                <button
                    onClick={onShuffle}
                    className="group relative px-6 py-2 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-800 rounded-lg border-2 border-blue-400/50 shadow-[0_4px_0_rgb(30,58,138),0_0_10px_rgba(37,99,235,0.3)] active:shadow-[0_2px_0_rgb(30,58,138)] active:translate-y-[2px] transition-all hover:brightness-110"
                >
                    <div className="flex items-center gap-2 font-bold text-white text-shadow-sm">
                        {isInitialized ? <RefreshCw size={18} className={isInitialized ? "group-hover:rotate-180 transition-transform duration-500" : ""} /> : <Play size={18} />}
                        <span>{isInitialized ? "Shuffle" : "Start"}</span>
                    </div>
                </button>

                {/* Reset Round Button */}
                <button
                    onClick={onReset}
                    className="relative px-6 py-2 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-900 rounded-lg border-2 border-slate-500/50 shadow-[0_4px_0_rgb(15,23,42),0_0_10px_rgba(15,23,42,0.5)] active:shadow-[0_2px_0_rgb(15,23,42)] active:translate-y-[2px] transition-all hover:brightness-110"
                >
                    <div className="flex items-center gap-2 font-bold text-white text-shadow-sm">
                        <RotateCcw size={18} />
                        <span>Reset Round</span>
                    </div>
                </button>

                {/* Reveal Mode Toggle (Visual Only for now as requested by UI) */}
                <div className="flex items-center bg-black/60 rounded-lg overflow-hidden border-2 border-slate-600 ml-2 shadow-inner">
                    <div className="px-3 py-1.5 text-xs font-bold text-gray-300 uppercase tracking-wider bg-gradient-to-b from-slate-700 to-slate-800 border-r border-slate-600">
                        Reveal Mode
                    </div>
                    <button
                        onClick={toggleRevealMode}
                        className={cn(
                            "px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 min-w-[50px] text-center shadow-inner",
                            isRevealMode
                                ? "bg-gradient-to-b from-green-500 to-green-700 text-white text-shadow-sm"
                                : "bg-gradient-to-b from-slate-700 to-slate-900 text-gray-500"
                        )}>
                        {isRevealMode ? "ON" : "OFF"}
                    </button>
                </div>
            </div>
        </header>
    );
}
