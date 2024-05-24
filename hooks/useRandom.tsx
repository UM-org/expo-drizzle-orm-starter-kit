import Chance from 'chance';
import React from 'react';

const chance = new Chance();

const useRandom = () => {
    function getRandomInt(min: number, max: number): number {
        return chance.integer({ min, max });
    }
    function pickRandomElement<T>(array: T[]): T {
        return chance.pickone(array);
    }
    function pickRandomElementWithProbability<T>(array: T[], winProbability: number): T | null {
        const randomValue = Math.random();
        if (randomValue < winProbability && array.length > 0) {
            return chance.pickone(array)
        }
        return null
    }
    return {
        getRandomInt,
        pickRandomElement,
        pickRandomElementWithProbability
    };
}
export default useRandom;