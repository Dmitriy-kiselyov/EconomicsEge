import { createStore } from 'redux';

import { IFulfilledStore, IStore } from '../typings/store';
import {
    ACTION_TYPES,
    IActionCloseTheory,
    IActionOpenExam,
    IActionOpenLevel,
    IActionOpenSample,
    IActionOpenTask,
    IActionOpenTheory,
    IActions,
    IActionSetTasks,
    IActionSetTaskState,
    IActionSetTaskText
} from '../typings/actions';
import { findTest } from './findTest';

function reducer(state: IStore | undefined, action: IActions): IStore {
    if (!state) {
        return initialStore; // хз, зачем это, тайпинги
    }

    switch (action.type) {
        case ACTION_TYPES.SET_TASKS:
            return reduceSetTasks(state, action);
        case ACTION_TYPES.OPEN_LEVEL:
            return reduceOpenLevel(state as IFulfilledStore, action);
        case ACTION_TYPES.CLOSE_LEVEL:
            return reduceCloseLevel(state);
        case ACTION_TYPES.SET_TASK_TEXT:
            return reduceSetTaskText(state, action);
        case ACTION_TYPES.OPEN_TASK:
            return reduceOpenTask(state, action);
        case ACTION_TYPES.CLOSE_TASK:
            return reduceCloseTask(state);
        case ACTION_TYPES.OPEN_THEORY:
            return reduceOpenTheory(state as IFulfilledStore, action);
        case ACTION_TYPES.CLOSE_THEORY:
            return reduceCloseTheory(state, action);
        case ACTION_TYPES.OPEN_SAMPLE:
            return reduceOpenSample(state as IFulfilledStore, action);
        case ACTION_TYPES.CLOSE_SAMPLE:
            return reduceCloseSample(state as IFulfilledStore);
        case ACTION_TYPES.SET_TASK_STATE:
            return reduceSetTaskState(state as IFulfilledStore, action);
        case ACTION_TYPES.OPEN_SETTINGS:
            return reduceOpenSettings(state);
        case ACTION_TYPES.CLOSE_SETTINGS:
            return reduceCloseSettings(state);
        case ACTION_TYPES.OPEN_EXAM:
            return reduceOpenExam(state, action);
        case ACTION_TYPES.CLOSE_EXAM:
            return reduceCloseExam(state);
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

function reduceOpenLevel(state: IFulfilledStore, action: IActionOpenLevel): IStore {
    return {
        ...state,
        openedLevel: action.openedLevel,
        openedTest: state.levels[action.openedLevel].testTitle,
    }
}

function reduceCloseLevel(state: IStore): IStore {
    return {
        ...state,
        openedLevel: null,
        openedTest: null,
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

function reduceOpenTheory(state: IFulfilledStore, action: IActionOpenTheory): IStore {
    const test = findTest(state, action.testTitle);

    if (!test || !test.theory) {
        return state;
    }

    return {
        ...state,
        openedTheory: test.theory,
        openedTest: action.testTitle,
    }
}

function reduceCloseTheory(state: IStore, action: IActionCloseTheory): IStore {
    const newState = {
        ...state,
        openedTheory: null,
    };

    if (action.closeLevel) {
        newState.openedTest = null;
        newState.openedLevel = null;
        newState.openedTask = null;
    }

    return newState;
}

function reduceOpenSample(state: IFulfilledStore, action: IActionOpenSample): IFulfilledStore {
    const openedLevel = state.levels[action.levelId];

    if (!openedLevel.sample) {
        return state;
    }

    return {
        ...state,
        openedTest: openedLevel.testTitle,
        openedLevel: openedLevel.id,
        openedSample: openedLevel.sample,
    }
}

function reduceCloseSample(state: IFulfilledStore): IFulfilledStore {
    return {
        ...state,
        openedSample: null,
    }
}

function reduceSetTaskState(state: IFulfilledStore, action: IActionSetTaskState): IStore {
    const task = state.tasks[action.path];
    const newTask = { ...task, state: action.state };

    return {
        ...state,
        tasks: {
            ...state.tasks,
            [action.path]: newTask
        }
    };
}

function reduceOpenSettings(state: IStore): IStore {
    return {
        ...state,
        openedSettings: true
    }
}

function reduceCloseSettings(state: IStore): IStore {
    return {
        ...state,
        openedSettings: false
    };
}

function reduceOpenExam(state: IStore, action: IActionOpenExam): IStore {
    return {
        ...state,
        openedExam: action.title
    }
}

function reduceCloseExam(state: IStore): IStore {
    return {
        ...state,
        openedExam: null
    }
}

const initialStore: IStore = {
    exams: null,
    tests: null,
    levels: null,
    tasks: null,

    openedTest: null,
    openedExam: null,
    openedLevel: null,
    openedTask: null,
    openedTheory: null,
    openedSample: null,
    openedSettings: false,
};

export const store = createStore(
    reducer,
    initialStore,
);
