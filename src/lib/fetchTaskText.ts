import { Dispatch } from 'redux';
import fs from 'react-native-fs';

import { setTaskText } from '../store/setTaskText';

const pathMemo = new Set<string>();

export async function fetchTaskText(dispatch: Dispatch, path: string) {
    if (pathMemo.has(path)) {
        return;
    }
    pathMemo.add(path);

    const text = await fs.readFileAssets(path);

    dispatch(setTaskText(path, text));
}
