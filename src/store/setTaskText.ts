import { ACTION_TYPES, IActionSetTaskText } from '../typings/actions';

export function setTaskText(levelId: string, path: string, text: string): IActionSetTaskText {
    return {
        type: ACTION_TYPES.SET_TASK_TEXT,
        text,
        path,
        levelId
    };
}
