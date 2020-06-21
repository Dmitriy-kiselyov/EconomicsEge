import { ACTION_TYPES, IActionOpenSample } from '../typings/actions';

export function openSample(levelId: string): IActionOpenSample {
    return {
        type: ACTION_TYPES.OPEN_SAMPLE,
        levelId
    }
}
