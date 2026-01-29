"use client";

interface SidebarProps {
    onViewChases: () => void;
    packsOpened: number;
    totalPacks: number;
}

export function Sidebar({ onViewChases, packsOpened, totalPacks }: SidebarProps) {
    const progressPercent = Math.min((packsOpened / totalPacks) * 100, 100);

    return (
        <div className="w-full lg:w-[360px] flex flex-col gap-6 p-4 z-10">
            {/* View Chase Prizes Button */}
            <button
                onClick={onViewChases}
                className="w-full py-4 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 rounded-lg border-2 border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.4),0_4px_0_#1e3a8a] hover:scale-[1.02] active:scale-[0.98] active:translate-y-[2px] active:shadow-[0_2px_0_#1e3a8a] transition-all group"
            >
                <div className="flex flex-col items-center">
                    <span className="text-xl font-russo text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] tracking-wide">
                        View Chase Prizes
                    </span>
                </div>
            </button>

            {/* Packs Opened Panel */}
            <div className="metallic-surface p-1 rounded-xl shadow-2xl">
                <div className="bg-[#0f172a]/50 p-4 rounded-lg border border-white/5">
                    <div className="flex justify-between items-end mb-2">
                        <span className="font-bold text-gray-300 text-sm uppercase tracking-wider">Packs Opened:</span>
                        <span className="font-mono text-yellow-400 font-bold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {packsOpened} <span className="text-gray-600 text-lg">/ {totalPacks}</span>
                        </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-8 bg-black/80 rounded-full border border-slate-700/50 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                        {/* Progress Bar Fill */}
                        <div
                            className="h-full bg-gradient-to-b from-yellow-300 via-yellow-500 to-orange-600 rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(234,179,8,0.3)] relative"
                            style={{ width: `${progressPercent}%` }}
                        >
                            {/* Shine Effect */}
                            <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/60 to-transparent rounded-t-full" />
                            {/* Bottom Shadow */}
                            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-black/20 rounded-b-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Placeholder for future sidebar items (e.g. History, Stats) */}
            <div className="metallic-surface flex-1 rounded-xl min-h-[400px] border-t border-white/10 p-4">
                {/* This would be the content area */}
            </div>
        </div>
    );
}
