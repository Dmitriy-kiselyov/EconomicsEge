import { ACTION_TYPES, IActionOpenTheory } from '../typings/actions';

export function openTheory(theoryPath: string, testTitle: string): IActionOpenTheory {
    return {
        type: ACTION_TYPES.OPEN_THEORY,
        theoryPath,
        testTitle
    };
}
