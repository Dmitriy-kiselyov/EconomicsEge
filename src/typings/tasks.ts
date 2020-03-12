export interface ITasksCollection {
    exams: IExam[];
    tests: ITest[];
}

export interface IExam {
    title: string;
    tasks: ITask[];
}

export interface ITest {
    title: string;
    levels: ILevel[];
}

export interface ILevel {
    id: string;
    title: string;
    tasks: ITask[];
}

export interface ITask {
    title: string;
    path: string;
    text: string | null;
}
