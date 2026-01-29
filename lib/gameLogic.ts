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
