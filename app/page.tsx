"use client";

import { useState } from "react";
import { useGame } from "@/hooks/useGame";
import { GameGrid } from "@/components/GameGrid";
import { GameHeader } from "@/components/GameHeader";
import { StatsBar } from "@/components/StatsBar";
import { Sidebar } from "@/components/Sidebar";
import { ChaseModal } from "@/components/ChaseModal";
import { ConfigModal } from "@/components/ConfigModal";

export default function Home() {
  const [isChaseModalOpen, setIsChaseModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isRevealMode, setIsRevealMode] = useState(false);
  const [gameTitle, setGameTitle] = useState("RetroZiah Slab Batch");

  const [config, setConfig] = useState<{
    totalPacks: number;
    totalChases: number;
    background: 'default' | 'midnight' | 'royal' | 'forest' | 'custom';
    customBackgroundImage?: string | null;
  }>({
    totalPacks: 50,
    totalChases: 12,
    background: 'default',
    customBackgroundImage: null
  });

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
    updateChaseImage,
    odds,
  } = useGame(config);

  const packsOpened = config.totalPacks - packsRemaining;

  const handleSaveConfig = (newConfig: { totalPacks: number; totalChases: number; background: 'default' | 'midnight' | 'royal' | 'forest' | 'custom'; customBackgroundImage?: string | null }) => {
    setConfig(newConfig);
  };

  // Background styles based on config
  const getBackgroundStyle = () => {
    switch (config.background) {
      case 'midnight':
        return { background: 'linear-gradient(to bottom, #000000, #0f172a)' };
      case 'royal':
        return { background: 'linear-gradient(to bottom, #1a0b2e, #3c096c, #10002b)' };
      case 'forest':
        return { background: 'linear-gradient(to bottom, #052e16, #064e3b, #022c22)' };
      case 'custom':
        if (config.customBackgroundImage) {
            return { 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${config.customBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat'
            };
        }
        return undefined; // Fallback
      case 'default':
      default:
        return undefined; // Let globals.css handle default
    }
  };

  const activeBackgroundStyle = getBackgroundStyle();

  return (
    <main 
      className="min-h-screen text-white overflow-x-hidden relative flex flex-col transition-colors duration-700 ease-in-out"
      style={activeBackgroundStyle}
    >
      {/* Overlay to ensure readability if background is too bright (though these are dark) */}
      {/* If not default, we might want to hide the global body background or just layer on top. 
          Since main is relative and z-0 (default), it should sit on top of body. 
          But body background is on <body>. Main needs to have a background to cover it.
          If activeBackgroundStyle is defined, it will cover body.
      */}
      
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Top Header */}
        <GameHeader
          onShuffle={shuffle}
          onReset={resetRound}
          isRevealMode={isRevealMode}
          toggleRevealMode={() => setIsRevealMode(!isRevealMode)}
          isInitialized={isInitialized}
          title={gameTitle}
          onTitleChange={setGameTitle}
          onOpenSettings={() => setIsConfigModalOpen(true)}
        />

        {/* Stats Bar */}
        <StatsBar
          chasesRemaining={chasesRemaining}
          totalChases={chaseItems.length}
          packsRemaining={packsRemaining}
          totalPacks={config.totalPacks}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-[1920px] mx-auto w-full">

          {/* LEFT: Game Board Area */}
          <div className="flex-1 p-4 md:p-8 flex items-center justify-center relative">

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
              totalPacks={config.totalPacks}
              chaseOdds={odds}
              chaseItems={chaseItems}
              onToggleChase={toggleChase}
            />
          </div>

        </div>
      </div>

      <ChaseModal
        isOpen={isChaseModalOpen}
        onClose={() => setIsChaseModalOpen(false)}
        chaseItems={chaseItems}
        onToggleChase={toggleChase}
        onUpdateImage={updateChaseImage}
      />

      <ConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </main>
  );
}
