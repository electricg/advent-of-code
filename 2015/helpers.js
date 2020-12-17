import fs from 'fs';
// import harp from 'harp';

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

const compareNumbersDesc = (a, b) => b - a;

const readStringNumbers = (string, separator = ',') => string.split(separator).map(i => parseInt(i, 10));

// const startHarp = ({ port = 9000, dir = './' }) => {
//     harp.server(dir, {
//         port
//     }, () => {
//         console.log(
// `------------
// Your server is listening at http://localhost:${port}/
// Press Ctl+C to stop the server
// ------------`);
//     });
// };

const permute = permutation => {
    const length = permutation.length;
    let result = [permutation.slice()];
    let c = new Array(length).fill(0);
    let i = 1;
    let k;
    let p;
  
    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

const deepCopy = value => JSON.parse(JSON.stringify(value));

export default {
    readFile,
    writeFile,
    readFileLines,
    readFileLinesNumbers,
    readFileString,
    readFileStringNumbers,
    compareNumbers,
    compareNumbersDesc,
    readStringNumbers,
    permute,
    deepCopy
    // startHarp
};
