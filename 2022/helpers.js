import fs from 'fs';

const readFile = (fileName, url) =>
  fs.readFileSync(new URL(fileName, url), 'utf-8');

const sumArray = (arr) => arr.reduce((acc, val) => (acc += val), 0);

const compareNumbersDesc = (a, b) => b - a;

export default {
  readFile,
  sumArray,
  compareNumbersDesc,
};
