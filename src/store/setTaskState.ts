import { ACTION_TYPES, IActionSetTaskState } from '../typings/actions';
import { IStoreTaskState } from '../typings/store';

export function setTaskState(taskPath: string, state: IStoreTaskState): IActionSetTaskState {
    return {
        type: ACTION_TYPES.SET_TASK_STATE,
        path: taskPath,
        state
    };
}
