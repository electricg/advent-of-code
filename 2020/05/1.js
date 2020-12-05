import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLines(fileName, import.meta.url);

const calcSeatID = code => {
    const row = parseInt(code.substr(0, 7).replace(/F/g, 0).replace(/B/g, 1), 2);
    const column = parseInt(code.substr(7).replace(/L/g, 0).replace(/R/g, 1), 2);
    return row * 8 + column;
};

const tests = [
    {
        inp: 'FBFBBFFRLR',
        out: 357
    },
    {
        inp: 'BFFFBBFRRR',
        out: 567
    },
    {
        inp: 'FFFBBBFRRR',
        out: 119
    },
    {
        inp: 'BBFFBBFRLL',
        out: 820
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcSeatID(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

const ids = input.map(calcSeatID);
console.log(Math.max(...ids));
