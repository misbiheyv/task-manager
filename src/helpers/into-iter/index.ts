import Range from "../range";

export function intoIter(obj: undefined | null) : IterableIterator<undefined>;

export function intoIter(obj: boolean): IterableIterator<number>;

export function intoIter(obj: number) : IterableIterator<number>;

export function intoIter(obj: string) : IterableIterator<string>;

export function intoIter<T = unknown>(obj: T[]) : IterableIterator<T>;

export function intoIter<T = Iterable<any>>(obj: T) : IterableIterator<T>;

export function intoIter(obj: unknown): IterableIterator<unknown>  {

    if (obj === true) {
        return new Range(1, Infinity).values();
    }

    if (obj === false) {
        return new Range(-Infinity, -1).reverse();
    }

    if (typeof obj === 'number') {
        if (obj === 0) return [].values();

        const sign = obj / Math.abs(obj);

        if (sign === -1) return new Range(obj, 1 * sign).reverse();

        if (sign === 1) return new Range(1 * sign, obj).values();
    }

    if (typeof obj === 'string') {
        return obj[Symbol.iterator]();
    }

    if (obj instanceof Array) {
        return obj.values();
    }

    if (Symbol.iterator in Object(obj)) {
        const iter = Object(obj)[Symbol.iterator]();

        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                return iter.next()
            }
        }
    }

    return [].values();
}
