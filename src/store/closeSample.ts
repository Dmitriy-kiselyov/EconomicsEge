import { ACTION_TYPES, IActionCloseSample } from '../typings/actions';

export function closeSample(): IActionCloseSample {
    return {
        type: ACTION_TYPES.CLOSE_SAMPLE
    }
}
