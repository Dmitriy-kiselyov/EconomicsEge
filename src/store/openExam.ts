import { ACTION_TYPES, IActionOpenExam } from '../typings/actions';

export function openExam(title: string): IActionOpenExam {
    return {
        type: ACTION_TYPES.OPEN_EXAM,
        title
    }
}
