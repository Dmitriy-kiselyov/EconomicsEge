export interface IAllTasks {
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
    title: string;
    tasks: ITask[];
}

export interface ITask {
    title: string;
    text: string | null;
}
