import { ACTION_TYPES, IActionSetTasks } from '../typings/actions';
import { ITasksCollection } from '../typings/tasks';

export function setTasks(tasksCollection: ITasksCollection): IActionSetTasks {
    return {
        type: ACTION_TYPES.SET_TASKS,
        tasksCollection,
    }
}
