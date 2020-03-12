import { ILevel, ITest } from '../typings/tasks';
import { IStore } from '../typings/store';

export interface IFindLevelResult {
    level: ILevel;
    test: ITest;
}

export function findLevel(store: IStore, levelId: string): IFindLevelResult | null {
    if (!store.tasks || !store.tasks.tests) {
        return null;
    }

    for (const test of store.tasks.tests) {
        for (const level of test.levels) {
            if (level.id === levelId) {
                return { level, test };
            }
        }
    }

    return null;
}
