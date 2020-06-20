import { IStoreFulfillData, IStoreTask, IStoreTaskState } from './store';

export enum ACTION_TYPES {
    SET_TASKS = 'SET_TASKS',
    OPEN_LEVEL = 'OPEN_LEVEL',
    CLOSE_LEVEL = 'CLOSE_LEVEL',
    SET_TASK_TEXT = 'SET_TASK_TEXT',
    OPEN_TASK = 'OPEN_TASK',
    CLOSE_TASK = 'CLOSE_TASK',
    OPEN_THEORY = 'OPEN_THEORY',
    CLOSE_THEORY = 'CLOSE_THEORY',
    SET_TASK_STATE = 'SET_TASK_STATE',
    OPEN_SETTINGS = 'OPEN_SETTINGS',
    CLOSE_SETTINGS = 'CLOSE_SETTINGS',
    OPEN_EXAM = 'OPEN_EXAM',
    CLOSE_EXAM = 'CLOSE_EXAM'
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

export interface IActionOpenTheory {
    type: ACTION_TYPES.OPEN_THEORY;
    testTitle: string;
}

export interface IActionCloseTheory {
    type: ACTION_TYPES.CLOSE_THEORY;
    closeLevel?: boolean;
}

export interface IActionSetTaskState {
    type: ACTION_TYPES.SET_TASK_STATE;
    path: string;
    state: IStoreTaskState;
}

export interface IActionOpenSettings {
    type: ACTION_TYPES.OPEN_SETTINGS;
}

export interface IActionCloseSettings {
    type: ACTION_TYPES.CLOSE_SETTINGS;
}

export interface IActionOpenExam {
    type: ACTION_TYPES.OPEN_EXAM;
    title: string;
}

export interface IActionCloseExam {
    type: ACTION_TYPES.CLOSE_EXAM;
}

export type IActions = IActionSetTasks | IActionOpenLevel | IActionCloseLevel | IActionSetTaskText | IActionOpenTask |
    IActionCloseTask | IActionOpenTheory | IActionCloseTheory | IActionSetTaskState | IActionOpenSettings |
    IActionCloseSettings | IActionOpenExam | IActionCloseExam;
