import fs from 'fs';

const readFile = (fileName, url) => fs.readFileSync(new URL(fileName, url), 'utf-8');

const readFileLines = (fileName, url) => {
    const txt = readFile(fileName, url);
    return txt.trim().split('\n');
};

const readFileLinesNumbers = (fileName, url) => {
    const lines = readFileLines(fileName, url);
    return lines.map(line => parseInt(line, 10));
};

const readStringNumbers = (string, separator = ',') => string.split(separator).map(i => parseInt(i, 10));

const compareNumbers = (a, b) => a - b;

const deepCopy = value => JSON.parse(JSON.stringify(value));

const dec2bin = dec => (dec >>> 0).toString(2);

const bin2dec = bin => parseInt(bin, 2);

const removeItemFromArray = (arr, item) => {
    const index = arr.indexOf(item);
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export default {
    readFile,
    readFileLines,
    readFileLinesNumbers,
    readStringNumbers,
    compareNumbers,
    deepCopy,
    dec2bin,
    bin2dec,
    removeItemFromArray,
};
