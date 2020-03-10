export type IMods = Record<string, string | boolean | undefined>;

export function getStyleWithMod(style: object, styleName: string, mods: IMods) {
    const styleMods = [styleName];

    Object.keys(mods).forEach(key => {
        const value = mods[key];

        if (typeof value === 'string') {
            styleMods.push(styleName + firstUpper(key) + firstUpper(value));
        } else if (value) {
            styleMods.push(styleName + firstUpper(key));
        }
    });

    // @ts-ignore
    return styleMods.map(mod => style[mod]);
}

function firstUpper(s: string): string {
    return s.slice(0, 1).toUpperCase() + s.slice(1);
}
