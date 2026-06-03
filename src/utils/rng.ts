function getRandom(minimum : number, maximum : number) : number  {
    const minCeil = Math.ceil(minimum);
    const maxFloor = Math.floor(maximum);
    return Math.floor(Math.random()*(maxFloor - minCeil + 1) + minCeil);
}

export function generateList(size : number, minimum : number, maximum : number, consecutive : boolean) : number[] {
    const list : Array<number> = [];

    for (let i = 0; i < size; i++) {
        if (i == 0 && consecutive) {
            list.push(getRandom(minimum, maximum));
        }
        else {
            let num : number;
            do {
                num = getRandom(minimum, maximum);
            } while(num == list[i-1]);
            list.push(num);
        }
    }
    return list;
}