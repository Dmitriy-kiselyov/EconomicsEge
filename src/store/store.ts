import { createStore } from 'redux';

import { IStore } from '../typings/store';
import { ACTION_TYPES, IActionOpenLevel, IActions, IActionSetTasks, IActionSetTaskText } from '../typings/actions';
import { ILevel, ITask, ITasksCollection, ITest } from '../typings/tasks';
import { findLevel, IFindLevelResult } from '../lib/storeHelpers';

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
        default:
            return state;
    }
}

function reduceSetTasks(state: IStore, action: IActionSetTasks): IStore {
    return {
        ...state,
        tasks: action.tasksCollection
    }
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
    const { test, level } = findLevel(state, action.levelId) as IFindLevelResult;

    for (const task of level.tasks) {
        if (task.path === action.path) {
            const newTask = {
                ...task,
                text: action.text
            };

            return cloneTask(state, test, level, task, newTask);
        }
    }

    return state;
}

// TODO: передалать store в плоский список
function cloneTask(state: IStore, test: ITest, level: ILevel, oldTask: ITask, newTask: ITask): IStore {
    const clonedTasks = cloneArray(level.tasks, oldTask, newTask);
    const clonedLevel: ILevel = { ...level, tasks: clonedTasks };

    const clonedLevels = cloneArray(test.levels, level, clonedLevel);
    const clonedTest: ITest = { ...test, levels: clonedLevels };

    const clonedTests = cloneArray(state.tasks?.tests as ITest[], test, clonedTest);

    return {
        ...state,
        tasks: {
            ...state.tasks as ITasksCollection,
            tests: clonedTests
        }
    };
}

function cloneArray<T>(array: T[], oldObject: T, newObject: T): T[] {
    const pos = array.indexOf(oldObject);
    const newArray = array.slice();

    newArray[pos] = newObject;

    return newArray;
}

const initialStore: IStore = {
    tasks: null,
    openedLevel: null
};

export const store = createStore(
    reducer,
    initialStore,
);
