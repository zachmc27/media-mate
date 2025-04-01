
export async function findMatches(array: any[], array2: any[]): Promise<any[]> {
    const matches = array.filter((item, index) => item === array2[index]);
    return matches;
}

//input: [ 'a', 'b', 'c' ,'f','6'], [ 'a', '6', 'c' ]
//output: [ 'a', 'c' ]