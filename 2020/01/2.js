import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLinesNumbers(fileName, import.meta.url);

const inputSorted = input.sort(Helpers.compareNumbers);

const obj = inputSorted.reduce((acc, item) => {
    acc[item] = 2020 - item;
    return acc;
}, {});

const len = inputSorted.length;

loop:
for (let i = 0; i < len; i++) {
    const first = inputSorted[i];
    const diff = obj[first];
    const copy = [...inputSorted];
    copy.splice(i, 1);
    const len2 = len - 1;

    for (let m = 0; m < len2; m++) {
        const second = copy[m];
        const third = diff - second;

        if (obj[third] != null) {
            console.log(`${first} * ${second} * ${third} = ${first * second * third }`);
            break loop;
        }
    }
}