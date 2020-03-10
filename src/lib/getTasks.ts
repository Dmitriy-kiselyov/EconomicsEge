import fs from 'react-native-fs';

import { ILevel, ITasks } from '../typings/tasks';

interface IDirOutput {
    path: string;
    name: string;
}

export async function getTasks(): Promise<ITasks> {
    const tasks: ITasks = {
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

        const tasksLevels: ILevel[] = levels.map(level => ({
            title: level.name,
            tasks: [],
        }));

        tasks.tests.push({
            title: test.name,
            levels: tasksLevels,
        });
    }

    return tasks;
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
