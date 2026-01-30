export function groupArray(source: any[], itemCount: number): any[][] {
    if (!source || !itemCount) return [];

    if (source.length < itemCount) {
        return [source];
    }

    const groupCount = Math.ceil(source.length / itemCount);

    const result = [];
    for (let index = 0; index < groupCount; index++) {
        const cur = source?.slice(index * itemCount, index * itemCount + itemCount - 1);

        result.push(cur);

        // if (cur.length !== itemCount) {
        //     break;
        // }
    }

    return result;
}

export function concatIgnoreUndefined(...arrays: any[]) {
    return arrays.filter(x => x).flat().filter(element => element !== undefined);
}
