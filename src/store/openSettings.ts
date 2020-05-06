import { IActionOpenSettings, ACTION_TYPES } from '../typings/actions';

export function openSettings(): IActionOpenSettings {
    return {
        type: ACTION_TYPES.OPEN_SETTINGS,
    }
}
