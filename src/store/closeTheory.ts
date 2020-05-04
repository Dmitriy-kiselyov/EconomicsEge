import { ACTION_TYPES, IActionCloseTheory } from '../typings/actions';

export function closeTheory(closeLevel?: boolean): IActionCloseTheory {
    return {
        type: ACTION_TYPES.CLOSE_THEORY,
        closeLevel
    };
}
