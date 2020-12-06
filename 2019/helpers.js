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

const readFileString = (fileName, url, separator = ',') => {
    const txt = readFile(fileName, url);
    return txt.trim().split(separator);
};

const readFileStringNumbers = (fileName, url, separator = ',') => {
    const items = readFileString(fileName, url, separator);
    return items.map(item => parseInt(item, 10));
};

const compareNumbers = (a, b) => a - b;

const readStringNumbers = (string, separator = ',') => string.split(separator).map(i => parseInt(i, 10));

export default {
    readFile,
    readFileLines,
    readFileLinesNumbers,
    readFileString,
    readFileStringNumbers,
    compareNumbers,
    readStringNumbers
};
