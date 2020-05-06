import { ACTION_TYPES, IActionCloseSettings } from '../typings/actions';

export function closeSettings(): IActionCloseSettings {
    return {
        type: ACTION_TYPES.CLOSE_SETTINGS
    }
}
