import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLines(fileName, import.meta.url);

const calcSeatID = code => {
    const row = parseInt(code.substr(0, 7).replace(/F/g, 0).replace(/B/g, 1), 2);
    const column = parseInt(code.substr(7).replace(/L/g, 0).replace(/R/g, 1), 2);
    return row * 8 + column;
};

const findMissingSeat = (ids = []) => {
    ids.sort(Helpers.compareNumbers);
    const len = ids.length;
    const start = ids[0];

    for (let i = 0; i < len; i++) {
        if (i + start !== ids[i]) {
            return ids[i] - 1;
        }
    }
}

const ids = input.map(calcSeatID);

console.log(findMissingSeat(ids));
