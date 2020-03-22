import { IStoreFulfillData, IStoreTask } from './store';

export enum ACTION_TYPES {
    SET_TASKS = 'SET_TASKS',
    OPEN_LEVEL = 'OPEN_LEVEL',
    CLOSE_LEVEL = 'CLOSE_LEVEL',
    SET_TASK_TEXT = 'SET_TASK_TEXT',
    OPEN_TASK = 'OPEN_TASK',
    CLOSE_TASK = 'CLOSE_TASK'
}

export interface IActionSetTasks {
    type: ACTION_TYPES.SET_TASKS;
    data: IStoreFulfillData;
}

export interface IActionOpenLevel {
    type: ACTION_TYPES.OPEN_LEVEL;
    openedLevel: string;
}

export interface IActionCloseLevel {
    type: ACTION_TYPES.CLOSE_LEVEL;
}

export interface IActionSetTaskText {
    type: ACTION_TYPES.SET_TASK_TEXT;
    path: string;
    text: string;
}

export interface IActionOpenTask {
    type: ACTION_TYPES.OPEN_TASK;
    task: IStoreTask;
}

export interface IActionCloseTask {
    type: ACTION_TYPES.CLOSE_TASK;
}

export type IActions = IActionSetTasks | IActionOpenLevel | IActionCloseLevel | IActionSetTaskText | IActionOpenTask | IActionCloseTask;
