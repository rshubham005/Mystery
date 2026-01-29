"use client";

import { RefreshCw, Play, RotateCcw, PenSquare, Trophy } from "lucide-react";
import { ChaseItem } from "@/types/game";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
    onShuffle: () => void;
    onReset: () => void;
    packsRemaining: number;
    totalPacks: number;
    chasesRemaining: number;
    totalChases: number;
    isInitialized: boolean;
    onOpenChaseList: () => void;
    chaseItems: ChaseItem[];
    onToggleChase: (id: string) => void;
}

export function ControlPanel({
    onShuffle,
    onReset,
    packsRemaining,
    totalPacks,
    chasesRemaining,
    totalChases,
    isInitialized,
    onOpenChaseList,
    chaseItems,
    onToggleChase,
}: ControlPanelProps) {
    const packsOpened = totalPacks - packsRemaining;
    const progressPercent = (packsOpened / totalPacks) * 100;
    const odds = packsRemaining > 0 ? Math.round((chasesRemaining / packsRemaining) * 100) : 0;

    return (
        <div className="p-4 bg-slate-900/80 backdrop-blur border-b border-white/10 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Title / Status */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Mystery Slab Shuffle
                    </h2>
                    <div className="text-sm text-gray-400 flex gap-4 mt-1">
                        <span>Packs: <span className="text-white font-mono">{packsRemaining}/{totalPacks}</span></span>
                        <span>Chases: <span className="text-yellow-400 font-mono">{chasesRemaining}/{totalChases}</span></span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 w-full max-w-md mx-4 hidden md:block">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progressPercent)}%</span>
                        <span>Odds: {odds}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    {!isInitialized && (
                        <button
                            onClick={onShuffle}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg shadow-green-900/20 transition-all hover:scale-105"
                        >
                            <Play className="w-4 h-4" /> Start
                        </button>
                    )}

                    {isInitialized && (
                        <button
                            onClick={onShuffle}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
                        >
                            <RefreshCw className="w-4 h-4" /> Shuffle
                        </button>
                    )}

                    <button
                        onClick={onOpenChaseList}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-lg shadow-purple-900/20 transition-all hover:scale-105"
                    >
                        <Trophy className="w-4 h-4" /> Prizes
                    </button>

                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-red-900/80 text-white rounded-lg font-bold transition-all"
                    >
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                </div>
            </div>

            {/* Quick Admin Chase Toggle (Optional / Expandable?) */}
            {/* For livestream, having this visible might be good or bad. 
          Usually admin wants to quickly mark a chase as pulled without opening a modal? 
          Or maybe inside the modal is safer to avoid accidental clicks.
          Let's stick to modal for edit, but maybe a small "Quick Actions" row? 
          The user said: "Automatically decrease chase count when admin manually marks a chase as pulled"
          Let's put the checklist in a side panel or just rely on the modal.
          I'll add a small "Admin Chase Toggles" section here if needed, but Modal is cleaner.
          Let's just use the Modal for toggling.
      */}
        </div>
    );
}
