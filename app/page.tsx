"use client";

import { useState } from "react";
import { useGame } from "@/hooks/useGame";
import { GameGrid } from "@/components/GameGrid";
import { GameHeader } from "@/components/GameHeader";
import { StatsBar } from "@/components/StatsBar";
import { Sidebar } from "@/components/Sidebar";
import { ChaseModal } from "@/components/ChaseModal";

export default function Home() {
  const {
    balls,
    packsRemaining,
    chaseItems,
    chasesRemaining,
    isInitialized,
    isShuffling,
    shuffle,
    resetRound,
    revealBall,
    toggleChase,
  } = useGame();

  const [isChaseModalOpen, setIsChaseModalOpen] = useState(false);
  const [isRevealMode, setIsRevealMode] = useState(false);

  const totalPacks = 50; // Hardcoded strictly based on the game logic usually being 50
  const packsOpened = totalPacks - packsRemaining;

  return (
    <main className="min-h-screen text-white overflow-x-hidden relative flex flex-col">
      {/* Background is handled in globals.css */}

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Top Header */}
        <GameHeader
          onShuffle={shuffle}
          onReset={resetRound}
          isRevealMode={isRevealMode}
          toggleRevealMode={() => setIsRevealMode(!isRevealMode)}
          isInitialized={isInitialized}
        />

        {/* Stats Bar */}
        <StatsBar
          chasesRemaining={chasesRemaining}
          totalChases={chaseItems.length}
          packsRemaining={packsRemaining}
          totalPacks={totalPacks}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-[1920px] mx-auto w-full">

          {/* LEFT: Game Board Area */}
          <div className="flex-1 glass-panel rounded-xl p-4 md:p-8 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)_inset]">

            {/* Grid Container */}
            <div className="w-full max-w-7xl mx-auto">
              {!isInitialized ? (
                <div className="flex flex-col items-center justify-center gap-8 py-20">
                  <h2 className="text-4xl md:text-6xl font-russo text-transparent bg-clip-text bg-gradient-to-t from-blue-400 to-cyan-300 drop-shadow-2xl text-center">
                    Ready to Shuffle?
                  </h2>
                  <button
                    onClick={shuffle}
                    className="px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-2xl font-bold font-russo shadow-[0_0_30px_rgba(8,145,178,0.6)] hover:scale-110 active:scale-95 transition-all"
                  >
                    START GAME
                  </button>
                </div>
              ) : (
                <GameGrid balls={balls} onReveal={revealBall} isShuffling={isShuffling} />
              )}
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:w-[350px] flex-shrink-0">
            <Sidebar
              onViewChases={() => setIsChaseModalOpen(true)}
              packsOpened={packsOpened}
              totalPacks={totalPacks}
            />
          </div>

        </div>
      </div>

      <ChaseModal
        isOpen={isChaseModalOpen}
        onClose={() => setIsChaseModalOpen(false)}
        chaseItems={chaseItems}
        onToggleChase={toggleChase}
      />
    </main>
  );
}
