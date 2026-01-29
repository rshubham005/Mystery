"use client";

import { Box, Target } from "lucide-react";

interface StatsBarProps {
    chasesRemaining: number;
    totalChases: number;
    packsRemaining: number;
    totalPacks: number;
}

export function StatsBar({ chasesRemaining, totalChases, packsRemaining, totalPacks }: StatsBarProps) {
    return (
        <div className="w-full bg-[#0f172a]/90 border-b border-white/10 backdrop-blur-sm shadow-md z-10">
            <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center justify-center gap-12 text-sm md:text-base font-bold text-white">

                {/* Chases Stats */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-lg">
                        <Target size={16} className="text-white" />
                    </div>
                    <span className="text-gray-300">Chases Remaining:</span>
                    <span className="text-xl text-yellow-400 filter drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
                        {chasesRemaining} <span className="text-gray-500 text-lg">/ {totalChases}</span>
                    </span>
                </div>

                {/* Separator */}
                <div className="w-px h-6 bg-white/10" />

                {/* Packs Stats */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-600 border-2 border-white flex items-center justify-center shadow-lg">
                        <Box size={16} className="text-white" />
                    </div>
                    <span className="text-gray-300">Packs Remaining:</span>
                    <span className="text-xl text-yellow-400 filter drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
                        {packsRemaining} <span className="text-gray-500 text-lg">/ {totalPacks}</span>
                    </span>
                </div>

            </div>
        </div>
    );
}
