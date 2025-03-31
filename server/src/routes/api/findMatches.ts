

export function findMatches(array: any[], array2: any[]): Promise<any[]> {
    const matches: any[] = [];

    for (let i = 0; i < Math.min(array.length, array2.length); i++) {
        if (array[i] === array2[i]) {
            matches.push(array[i]);
        }
    }

    return Promise.resolve(matches);
}