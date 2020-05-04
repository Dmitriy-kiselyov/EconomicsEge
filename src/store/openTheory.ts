import { ACTION_TYPES, IActionOpenTheory } from '../typings/actions';

export function openTheory(theoryPath: string, levelId: string): IActionOpenTheory {
    return {
        type: ACTION_TYPES.OPEN_THEORY,
        theoryPath,
        levelId
    };
}
