import fs from 'fs';

const readFile = (fileName, url) => fs.readFileSync(new URL(fileName, url), 'utf-8');

const readFileLinesNumbers = (fileName, url) => {
    const txt = readFile(fileName, url);
    const lines = txt.trim().split('\n');
    return lines.map(line => parseInt(line, 10));
};

const compareNumbers = (a, b) => a - b;

export default { readFile, readFileLinesNumbers, compareNumbers };
