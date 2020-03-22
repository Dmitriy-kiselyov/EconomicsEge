interface ICommonStore {
    openedLevel: string | null;
    openedTask: string | null;
}

export interface IEmptyStore extends ICommonStore {
    exams: null;
    tests: null;
    levels: null;
    tasks: null;
}

export interface IStoreFulfillData {
    exams: IStoreExam[];
    tests: IStoreTest[];
    levels: IStoreLevels;
    tasks: IStoreTasks;
}

export type IFulfilledStore = ICommonStore & IStoreFulfillData;

export type IStore = IEmptyStore | IFulfilledStore;

export interface IStoreExam {
    title: string;
    tasks: string[];
}

export interface IStoreTest {
    title: string;
    levels: string[];
}

export type IStoreLevels = Record<string, IStoreLevel>;
export interface IStoreLevel {
    id: string;
    title: string;
    testTitle: string;
    tasks: string[];
}

export type IStoreTasks = Record<string, IStoreTask>;
export interface IStoreTask {
    title: string;
    path: string;
    text: string | null;
}
