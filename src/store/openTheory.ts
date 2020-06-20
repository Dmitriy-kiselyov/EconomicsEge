import { ACTION_TYPES, IActionOpenTheory } from '../typings/actions';

export function openTheory(testTitle: string): IActionOpenTheory {
    return {
        type: ACTION_TYPES.OPEN_THEORY,
        testTitle
    };
}
