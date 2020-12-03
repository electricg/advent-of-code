import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileStringNumbers(fileName, import.meta.url);

const op = {
    1: (a, b) => a + b,
    2: (a, b) => a * b
};

const intcode = (arr = []) => {
    const len = arr.length;

    loop:
    for (let i = 0; i < len; i += 4) {
        const action = arr[i];

        if (action === 99) {
            break loop;
        }
        else if (action === 1 || action === 2) {
            const a = arr[arr[i + 1]];
            const b = arr[arr[i + 2]];
            arr[arr[i + 3]] = op[action](a, b);
        }
        else {
            throw new Error('❌ error');
        }
    }

    return arr;
};

const findInput = (input) => {
    const expectedRes = 19690720;

    loop:
    for (let i = 0; i <= 99; i++) {
        for (let ii = 0; ii <= 99; ii++) {
            const tempInput = [...input];
            tempInput[1] = i;
            tempInput[2] = ii;
            const res = intcode(tempInput);
            if (res[0] === expectedRes) {
                return [i, ii];
            }
        }
    }
}

const res = findInput(input);

console.log(res, 100 * res[0] + res[1]);
