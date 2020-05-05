import { ACTION_TYPES, IActionOpenTheory } from '../typings/actions';

export function openTheory(levelId: string): IActionOpenTheory {
    return {
        type: ACTION_TYPES.OPEN_THEORY,
        levelId
    };
}
