"use client";

import { useState, useCallback } from "react";
import { Ball, ChaseItem } from "@/types/game";
import { generateBalls, shuffleArray, reshuffleBalls } from "@/lib/gameLogic";

const TOTAL_PACKS = 50;
const TOTAL_CHASES = 12;

const INITIAL_CHASES: ChaseItem[] = Array.from({ length: TOTAL_CHASES }, (_, i) => ({
    id: `chase-${i}`,
    name: `Chase Prize ${i + 1}`,
    isPulled: false,
}));

export interface GameConfig {
    totalPacks: number;
    totalChases: number;
}

export function useGame(config: GameConfig) {
    const [balls, setBalls] = useState<Ball[]>([]);

    // Initialize chase items based on config
    const [chaseItems, setChaseItems] = useState<ChaseItem[]>([]);

    // Effect to initialize chase items when config changes
    // We only want to do this initially or when config drastically changes (which might be handled by parent reset)
    // For now, let's lazy init or effect init.
    // Better yet, let's use a ref to track if we need to sync, OR just sync when reset is called.

    // Actually, when config changes, we probably want to reset the game or at least the chases if the count mismatches.
    const prevConfigRef = useState(config)[0]; // simplistic check (might need deep compare if obj changes ref often)

    const [isRevealing, setIsRevealing] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    // Initial setup for chases if empty
    if (chaseItems.length === 0 && config.totalChases > 0) {
        const initialChases = Array.from({ length: config.totalChases }, (_, i) => ({
            id: `chase-${i}`,
            name: `Chase Prize ${i + 1}`,
            isPulled: false,
        }));
        setChaseItems(initialChases);
    }

    // Computed
    const packsRemaining = config.totalPacks - balls.filter((b) => b.isRevealed).length;
    const chasesRemaining = chaseItems.filter((c) => !c.isPulled).length;
    const odds = packsRemaining > 0 ? Math.round((chasesRemaining / packsRemaining) * 100) : 0;
    const packsOpened = config.totalPacks - packsRemaining;

    const shuffle = useCallback(() => {
        // Allow shuffle if initialized (reshuffle) or if not initialized (start)
        if (isShuffling) return;

        // Start shuffle sequence: Trigger exit animation
        setIsShuffling(true);

        // Wait for exit animation (e.g. 500ms)
        setTimeout(() => {
            let newBalls;
            if (isInitialized) {
                // Reshuffle existing balls (keeps opened ones open)
                newBalls = reshuffleBalls(balls);
            } else {
                // First start: generate new balls
                newBalls = generateBalls(config.totalPacks);
            }

            setBalls(newBalls);
            setIsInitialized(true);
            setIsRevealing(false); // Reset revealing state if any

            // Allow re-entry
            // We give a small buffer for the state update to settle before "un-shuffling" visual
            setTimeout(() => {
                setIsShuffling(false);
            }, 50);
        }, 500);
    }, [isShuffling, isInitialized, balls, config.totalPacks]);

    const resetRound = useCallback(() => {
        setBalls([]);
        // Re-generate chases based on current config
        const newChases = Array.from({ length: config.totalChases }, (_, i) => ({
            id: `chase-${i}`,
            name: `Chase Prize ${i + 1}`,
            isPulled: false,
        }));
        setChaseItems(newChases);
        setIsInitialized(false);
    }, [config.totalChases]);

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

    const updateChaseImage = useCallback((id: string, imageUrl: string) => {
        setChaseItems((prev) =>
            prev.map((c) => (c.id === id ? { ...c, imageUrl } : c))
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
        updateChaseImage,
    };
}
