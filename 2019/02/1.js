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

const tests = [
    {
        inp: [1,9,10,3,2,3,11,0,99,30,40,50],
        out: [3500,9,10,70,2,3,11,0,99,30,40,50]
    },
    {
        inp: [1,0,0,0,99],
        out: [2,0,0,0,99]
    },
    {
        inp: [2,3,0,3,99],
        out: [2,3,0,6,99]
    },
    {
        inp: [2,4,4,5,99,0],
        out: [2,4,4,5,99,9801]
    },
    {
        inp: [1,1,1,4,99,5,6,0,99],
        out: [30,1,1,4,2,5,6,0,99]
    }
];

tests.forEach(({ inp, out }) => {
    const res = intcode(inp);
    const isValid = JSON.stringify(res) === JSON.stringify(out);
    if (isValid) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

input[1] = 12;
input[2] = 2;
console.log(intcode(input)[0]);
