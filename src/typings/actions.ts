import { ITasksCollection } from './tasks';

export enum ACTION_TYPES {
    SET_TASKS = 'SET_TASKS',
    OPEN_LEVEL = 'OPEN_LEVEL',
    CLOSE_LEVEL = 'CLOSE_LEVEL'
}

export interface IActionSetTasks {
    type: ACTION_TYPES.SET_TASKS;
    tasksCollection: ITasksCollection;
}

export interface IActionOpenLevel {
    type: ACTION_TYPES.OPEN_LEVEL;
    openedLevel: string;
}

export interface IActionCloseLevel {
    type: ACTION_TYPES.CLOSE_LEVEL;
}

export type IActions = IActionSetTasks | IActionOpenLevel | IActionCloseLevel;
