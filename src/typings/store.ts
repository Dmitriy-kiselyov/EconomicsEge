import { ITasksCollection } from './tasks';

export interface IStore  {
    tasks: ITasksCollection | null;
    openedLevel: string | null;
    openedTask: string | null;
}
