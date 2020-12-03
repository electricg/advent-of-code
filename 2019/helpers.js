import fs from 'fs';
import { url } from 'inspector';

const readFile = (fileName, url) => fs.readFileSync(new URL(fileName, url), 'utf-8');

const readFileLines = (fileName, url) => {
    const txt = readFile(fileName, url);
    return txt.trim().split('\n');
};

const readFileLinesNumbers = (fileName, url) => {
    const lines = readFileLines(fileName, url);
    return lines.map(line => parseInt(line, 10));
};

const readFileString = (fileName, url) => {
    const txt = readFile(fileName, url);
    return txt.trim().split(',');
};

const readFileStringNumbers = (fileName, url) => {
    const items = readFileString(fileName, url);
    return items.map(item => parseInt(item, 10));
};

const compareNumbers = (a, b) => a - b;

export default {
    readFile,
    readFileLines,
    readFileLinesNumbers,
    readFileString,
    readFileStringNumbers,
    compareNumbers
};
