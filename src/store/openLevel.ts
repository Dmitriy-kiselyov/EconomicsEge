import { ACTION_TYPES, IActionOpenLevel } from '../typings/actions';

export function openLevel(levelId: string): IActionOpenLevel {
    return {
        type: ACTION_TYPES.OPEN_LEVEL,
        openedLevel: levelId,
    }
}
