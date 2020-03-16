import { IStore } from '../typings/store';
import { ILevel } from '../typings/tasks';

export function getLevelFromStore(state: IStore, levelId: string): ILevel | null {
    if (!state.levels) {
        return null;
    }

    const storeLevel = state.levels[levelId];

    return {
        id: storeLevel.id,
        title: storeLevel.title,
        tasks: storeLevel.tasks.map(path => state.tasks[path])
    };
}
