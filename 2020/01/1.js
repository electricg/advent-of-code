import Helpers from "../helpers.js";

const fileName = "./input.txt";

const input = Helpers.readFileLinesNumbers(fileName, import.meta.url);

const obj = input.reduce((acc, item) => {
    acc[item] = 2020 - item;
    return acc;
}, {});

const len = input.length;

for (let i = 0; i < len; i++) {
    const a = input[i];
    const b = obj[a];
    const c = obj[b];
    if (c != null) {
        console.log(`${a} * ${b} = ${a * b}`);
        break;
    }
}
