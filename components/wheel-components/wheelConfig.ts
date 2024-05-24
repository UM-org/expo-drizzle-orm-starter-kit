interface GiftMap {
    name: string;
    keywords: string[];
    degrees: number[];
}

export const GIFTS_MAP: GiftMap[] = [
    {
        name: "Galet Parfumé",
        keywords: ["galet", "parfumé"],
        degrees: [120],
    },
    {
        name: "Machine à laver",
        keywords: ["machine", "laver"],
        degrees: [0],
    },
    {
        name: "Nadhif Complet",
        keywords: ["nadhif", "complet"],
        degrees: [240],
    },
]

export const NO_GIFT_MAP: number[] = [60, 180, 300]

// Default SPIN_DURATION in milliseconds
export const SPIN_DURATION: number = 2000

export const WIN_PROBABILITY: number = 0.1