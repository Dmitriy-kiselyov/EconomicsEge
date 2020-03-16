import { createStore } from 'redux';

import { IStore, IStoreExam, IStoreLevels, IStoreTasks, IStoreTest } from '../typings/store';
import {
    ACTION_TYPES, IActionOpenLevel, IActionOpenTask, IActions, IActionSetTasks, IActionSetTaskText
} from '../typings/actions';

function reducer(state: IStore | undefined, action: IActions): IStore {
    if (!state) {
        return initialStore; // хз, зачем это, тайпинги
    }

    switch (action.type) {
        case ACTION_TYPES.SET_TASKS:
            return reduceSetTasks(state, action);
        case ACTION_TYPES.OPEN_LEVEL:
            return reduceOpenLevel(state, action);
        case ACTION_TYPES.CLOSE_LEVEL:
            return reduceCloseLevel(state);
        case ACTION_TYPES.SET_TASK_TEXT:
            return reduceSetTaskText(state, action);
        case ACTION_TYPES.OPEN_TASK:
            return reduceOpenTask(state, action);
        case ACTION_TYPES.CLOSE_TASK:
            return reduceCloseTask(state);
        default:
            return state;
    }
}

function reduceSetTasks(state: IStore, action: IActionSetTasks): IStore {
    const { tasksCollection } = action;

    const exams: IStoreExam[] = tasksCollection.exams.map(exam => ({
        title: exam.title,
        tasks: exam.tasks.map(task => task.path)
    }));
    const tests: IStoreTest[] = tasksCollection.tests.map(test => ({
        title: test.title,
        levels: test.levels.map(level => level.id)
    }));
    const levels: IStoreLevels = {};
    const tasks: IStoreTasks = {};

    for (const exam of tasksCollection.exams) {
        for (const task of exam.tasks) {
            tasks[task.path] = task;
        }
    }
    for (const test of tasksCollection.tests) {
        for (const level of test.levels) {
            levels[level.id] = {
                id: level.id,
                title: level.title,
                testTitle: test.title,
                tasks: level.tasks.map(task => task.path)
            };

            for (const task of level.tasks) {
                tasks[task.path] = task;
            }
        }
    }

    return {
        ...state,
        exams,
        tests,
        levels,
        tasks
    };
}

function reduceOpenLevel(state: IStore, action: IActionOpenLevel): IStore {
    return {
        ...state,
        openedLevel: action.openedLevel
    }
}

function reduceCloseLevel(state: IStore): IStore {
    return {
        ...state,
        openedLevel: null
    }
}

function reduceSetTaskText(state: IStore, action: IActionSetTaskText): IStore {
    if (!state.tasks) {
        return state;
    }

    const task = state.tasks[action.path];
    const newTask = { ...task, text: action.text };

    return {
        ...state,
        tasks: {
            ...state.tasks,
            [action.path]: newTask
        }
    };
}

function reduceOpenTask(state: IStore, action: IActionOpenTask): IStore {
    return {
        ...state,
        openedTask: action.task.path,
    }
}

function reduceCloseTask(state: IStore): IStore {
    return {
        ...state,
        openedTask: null
    }
}

const initialStore: IStore = {
    exams: null,
    tests: null,
    levels: null,
    tasks: null,

    openedLevel: null,
    openedTask: null,
};

export const store = createStore(
    reducer,
    initialStore,
);
