"use client";

import { useState, useCallback } from "react";
import { Ball, ChaseItem } from "@/types/game";
import { generateBalls, shuffleArray } from "@/lib/gameLogic";

const TOTAL_PACKS = 50;
const TOTAL_CHASES = 12;

const INITIAL_CHASES: ChaseItem[] = Array.from({ length: TOTAL_CHASES }, (_, i) => ({
    id: `chase-${i}`,
    name: `Chase Prize ${i + 1}`,
    isPulled: false,
}));

export function useGame() {
    const [balls, setBalls] = useState<Ball[]>([]);
    const [chaseItems, setChaseItems] = useState<ChaseItem[]>(INITIAL_CHASES);
    const [isRevealing, setIsRevealing] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    // Computed
    const packsRemaining = TOTAL_PACKS - balls.filter((b) => b.isRevealed).length;
    const chasesRemaining = chaseItems.filter((c) => !c.isPulled).length;
    const odds = packsRemaining > 0 ? Math.round((chasesRemaining / packsRemaining) * 100) : 0;
    const packsOpened = TOTAL_PACKS - packsRemaining;

    const shuffle = useCallback(() => {
        if (isShuffling) return;

        // Start shuffle sequence: Trigger exit animation
        setIsShuffling(true);

        // Wait for exit animation (e.g. 500ms)
        setTimeout(() => {
            const newBalls = generateBalls(TOTAL_PACKS);
            setBalls(newBalls);
            setIsInitialized(true);
            setIsRevealing(false); // Reset revealing state if any

            // Allow re-entry
            // We give a small buffer for the state update to settle before "un-shuffling" visual
            setTimeout(() => {
                setIsShuffling(false);
            }, 50);
        }, 500);
    }, [isShuffling]);

    const resetRound = useCallback(() => {
        setBalls([]);
        setChaseItems(INITIAL_CHASES.map(c => ({ ...c, isPulled: false })));
        setIsInitialized(false);
    }, []);

    const revealBall = useCallback((id: number) => {
        if (isRevealing) return;
        setBalls((prev) =>
            prev.map((b) => (b.id === id ? { ...b, isRevealed: true } : b))
        );
    }, [isRevealing]);

    const toggleChase = useCallback((id: string) => {
        setChaseItems((prev) =>
            prev.map((c) => (c.id === id ? { ...c, isPulled: !c.isPulled } : c))
        );
    }, []);

    const updateChaseName = useCallback((id: string, name: string) => {
        setChaseItems((prev) =>
            prev.map((c) => (c.id === id ? { ...c, name } : c))
        );
    }, []);

    return {
        balls,
        packsRemaining,
        chaseItems,
        chasesRemaining,
        odds,
        packsOpened,
        isInitialized,
        isRevealing,
        isShuffling,
        shuffle,
        resetRound,
        revealBall,
        toggleChase,
        updateChaseName,
    };
}
