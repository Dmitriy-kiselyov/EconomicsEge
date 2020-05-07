import { ACTION_TYPES, IActionCloseExam } from '../typings/actions';

export function closeExam(): IActionCloseExam {
    return {
        type: ACTION_TYPES.CLOSE_EXAM
    }
}
