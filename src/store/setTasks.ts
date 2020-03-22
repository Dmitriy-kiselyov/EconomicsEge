import { ACTION_TYPES, IActionSetTasks } from '../typings/actions';
import { IStoreFulfillData } from '../typings/store';

export function setTasks(data: IStoreFulfillData): IActionSetTasks {
    return {
        type: ACTION_TYPES.SET_TASKS,
        data,
    }
}
