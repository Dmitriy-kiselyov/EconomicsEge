import { ACTION_TYPES, IActionCloseLevel } from '../typings/actions';

export function closeLevel(): IActionCloseLevel {
    return {
        type: ACTION_TYPES.CLOSE_LEVEL
    }
}
