import { createStore } from 'redux';

import { IStore } from '../typings/store';
import { ACTION_TYPES, IActionOpenLevel, IActions, IActionSetTasks } from '../typings/actions';

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
        default:
            return state;
    }
}

function reduceSetTasks(state: IStore, action: IActionSetTasks): IStore {
    return {
        ...state,
        tasks: action.tasksCollection,
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

const initialStore: IStore = {
    tasks: null,
    openedLevel: null
};

export const store = createStore(
    reducer,
    initialStore,
);
