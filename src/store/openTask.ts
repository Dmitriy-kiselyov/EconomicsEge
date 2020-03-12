import { ACTION_TYPES, IActionOpenTask } from '../typings/actions';
import { ITask } from '../typings/tasks';

export function openTasks(task: ITask): IActionOpenTask {
    return {
        type: ACTION_TYPES.OPEN_TASK,
        task
    };
}
