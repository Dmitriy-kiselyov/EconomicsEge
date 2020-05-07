import { ACTION_TYPES, IActionOpenTask } from '../typings/actions';
import { IStoreTask } from '../typings/store';

export function openTask(task: IStoreTask): IActionOpenTask {
    return {
        type: ACTION_TYPES.OPEN_TASK,
        task
    };
}
