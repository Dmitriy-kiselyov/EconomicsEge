export interface IMultiLang {
    none: string;
    one: string;
    some: string;
    many: string;
}

export function multiLang(number: number, dict: IMultiLang): string {
    if (number === 0) {
        return dict.none;
    }
    if (number % 100 >= 5 && number % 100 <= 20) {
        return dict.many;
    }
    if (number % 10 === 1) {
        return dict.one;
    }
    if (number % 10 >= 2 && number % 10 <= 4) {
        return dict.some;
    }

    return dict.many;
}
