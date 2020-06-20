import { IFulfilledStore, IStoreTest } from '../typings/store';

export function findTest(state: IFulfilledStore, testTitle: string): IStoreTest | null {
    for (const test of state.tests) {
        if (test.title === testTitle) {
            return test;
        }
    }

    return null;
}
