import fs from 'react-native-fs';

import {
    IStoreExam,
    IStoreLevels,
    IStoreTasks,
    IStoreTest,
    IStoreTask,
    IStoreFulfillData,
} from '../typings/store';

interface IDirOutput {
    path: string;
    name: string;
}

export async function getTasks(): Promise<IStoreFulfillData> {
    const tasks: IStoreTasks = {};
    const exams = await getExamTasks(tasks);
    const { tests, levels } = await getTestTasks(tasks);

    return {
        exams,
        tests,
        levels,
        tasks
    };
}

async function getExamTasks(tasks: IStoreTasks): Promise<IStoreExam[]> {
    const exams: IStoreExam[] = [];

    const dirs = await getDirOutput('tasks/exams');

    for (const dir of dirs) {
        const tasksOutput = await getFileOutput(dir.path, 'txt');

        for (const task of tasksOutput) {
            tasks[task.path] = task;
        }

        exams.push({
            title: dir.name,
            tasks: tasksOutput.map(task => task.path)
        });
    }

    return exams;
}

interface ITestTasks {
    tests: IStoreTest[];
    levels: IStoreLevels;
}

async function getTestTasks(tasks: IStoreTasks): Promise<ITestTasks> {
    const tests: IStoreTest[] = [];
    const levels: IStoreLevels = {};

    const testsOutput = await getDirOutput('tasks/tests');

    for (const test of testsOutput) {
        const levelsOutput = await getDirOutput(test.path);

        for (const level of levelsOutput) {
            const tasksOutput = await getFileOutput(level.path, 'txt');

            for (const task of tasksOutput) {
                tasks[task.path] = task;
            }

            levels[level.path] = {
                id: level.path,
                title: level.name,
                testTitle: test.name,
                tasks: tasksOutput.map(task => task.path),
                theory: await getTheoryPath(level.path)
            }
        }

        tests.push({
            title: test.name,
            levels: levelsOutput.map(level => level.path)
        });
    }

    return { tests, levels };
}

export async function getDirOutput(path: string): Promise<IDirOutput[]> {
    const tests = await fs.readDirAssets(path);

    return tests
        .filter(test => test.isDirectory())
        .map(test => ({
            path: test.path,
            name: test.name.split('.')[1]
        }));
}

export async function getFileOutput(path: string, extension: string): Promise<IStoreTask[]> {
    const files = await fs.readDirAssets(path);

    return files
        .filter(file => file.isFile() && file.name.endsWith('.' + extension))
        .map(file => ({
            title: getFileName(file.name),
            path: file.path,
            text: null,
            state: 'none' as 'none'
        }))
        .sort((a, b) => +a.title - +b.title);
}

export async function getTheoryPath(levelPath: string): Promise<string | undefined> {
    const theoryPath = levelPath + '/теория.pdf';
    const hasTheory = await fs.existsAssets(theoryPath);

    return hasTheory ? theoryPath : undefined;
}

function getFileName(fileName: string): string {
    return fileName.split('.')[0];
}
