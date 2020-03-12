import { ACTION_TYPES, IActionCloseTask } from '../typings/actions';

export function closeTask(): IActionCloseTask {
    return {
        type: ACTION_TYPES.CLOSE_TASK
    };
}
