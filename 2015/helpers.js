import fs from 'fs';
import harp from 'harp';

const readFile = (fileName, url) => fs.readFileSync(new URL(fileName, url), 'utf-8');

const writeFile = (content, fileName, url) => fs.writeFileSync(new URL(fileName, url), content);

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

const startHarp = ({ port = 9000, dir = './' }) => {
    harp.server(dir, {
        port
    }, () => {
        console.log(
`------------
Your server is listening at http://localhost:${port}/
Press Ctl+C to stop the server
------------`);
    });
};

export default {
    readFile,
    writeFile,
    readFileLines,
    readFileLinesNumbers,
    readFileString,
    readFileStringNumbers,
    compareNumbers,
    readStringNumbers,
    startHarp
};
