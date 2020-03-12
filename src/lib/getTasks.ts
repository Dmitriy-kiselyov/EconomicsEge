import fs from 'react-native-fs';

import { ITask, ITasksCollection } from '../typings/tasks';

interface IDirOutput {
    path: string;
    name: string;
}

export async function getTasks(): Promise<ITasksCollection> {
    const tasksCollection: ITasksCollection = {
        exams: [
            {
                title: 'ОГЭ',
                tasks: [],
            },
            {
                title: 'ЕГЭ',
                tasks: [],
            }
        ],
        tests: [],
    };
    const tests = await getDirOutput('tasks/tests');

    for (const test of tests) {
        const levels = await getDirOutput(test.path);
        const tasksLevels = [];

        for (const level of levels) {
            const tasks = await getFileOutput(level.path);

            tasksLevels.push({
                title: level.name,
                tasks,
                id: level.path,
            });
        }

        tasksCollection.tests.push({
            title: test.name,
            levels: tasksLevels,
        });
    }

    return tasksCollection;
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

export async function getFileOutput(path: string): Promise<ITask[]> {
    const files = await fs.readDirAssets(path);

    return files
        .filter(file => file.isFile())
        .map(file => ({
            title: getFileName(file.name),
            path: file.path,
            text: null,
        }))
        .sort((a, b) => +a.title - +b.title);
}

function getFileName(fileName: string): string {
    return fileName.split('.')[0];
}
