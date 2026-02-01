export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function generateBalls(count: number = 50): { id: number; assignedNumber: number; isRevealed: boolean }[] {
    // Generate numbers 1 to count
    const numbers = Array.from({ length: count }, (_, i) => i + 1);
    const shuffledNumbers = shuffleArray(numbers);

    const balls = Array.from({ length: count }, (_, i) => ({
        id: i, // fixed distinct identity for React key
        assignedNumber: shuffledNumbers[i],
        isRevealed: false
    }));

    // Shuffle balls array so visual positions are random
    return shuffleArray(balls);
}

export function reshuffleBalls(currentBalls: { id: number; assignedNumber: number | null; isRevealed: boolean }[]): { id: number; assignedNumber: number | null; isRevealed: boolean }[] {
    // Separate revealed and unrevealed
    const revealed = currentBalls.filter(b => b.isRevealed);
    const unrevealed = currentBalls.filter(b => !b.isRevealed);

    // Shuffle the unrevealed balls only
    // IMPORTANT: logic check - do we shuffle the POSITIONS of the unrevealed balls, or do we shuffle the ASSIGNED NUMBERS?
    // User asked: "When I hit shuffle, can the opened balls remain so it doesn’t also reset the game."
    // Usually "shuffle" means mixing the remaining unopened balls around the grid OR mixing the prizes behind them.
    // Use Case: User doesn't like the spot valid on; shakes the box.
    // Implementation: We will shuffle the positions of the unrevealed balls. The `assignedNumber` stays with the `id` (the ball physically moves) OR the prizes move?
    // In a digital game, "shuffling" usually means "re-arranging the grid".

    // Strategy: We want the GRID to change.
    // So we take ALL balls (revealed and unrevealed) and shuffle their ORDER in the array.
    // BUT, we want to keep the revealed ones "Opened". (Which they are, by `isRevealed` prop).

    // Wait, if we just shuffle the array, the revealed balls move to random spots too.
    // User might want revealed balls to STAY PUT? "can the opened balls remain"
    // "remain" -> stay on screen? or stay in place?
    // "displayed... row/line" implies position matters.

    // Let's assume the user wants the remaining UNREVEALED balls to be shuffled around, OR just a pure shuffle of the whole board effectively but keeping state.
    // Standard "Shuffle" behavior in these games: Everything mixes up. Opened spots move too.
    // If I just call `shuffleArray(currentBalls)`, the opened balls will move to new indices.
    // This seems correct for "Shuffle".

    return shuffleArray([...currentBalls]);
}
