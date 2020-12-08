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

const compareNumbers = (a, b) => a - b;

const deepCopy = value => JSON.parse(JSON.stringify(value));

export default {
    readFile,
    readFileLines,
    readFileLinesNumbers,
    compareNumbers,
    deepCopy
};
