import { createStore } from 'redux';

import { IStore } from '../typings/store';
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
    const { data } = action;

    return {
        ...state,
        ...data
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
