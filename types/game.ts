export interface Ball {
    id: number;          // Unique ID for the ball (0-49)
    assignedNumber: number | null; // The hidden number (1-50)
    isRevealed: boolean; // Whether the ball has been clicked/revealed
}

export interface ChaseItem {
    id: string;
    name: string;
    isPulled: boolean;
}

export interface GameState {
    balls: Ball[];
    packsRemaining: number;
    chaseItems: ChaseItem[];
    isRevealing: boolean; // For preventing clicks during animations
}
