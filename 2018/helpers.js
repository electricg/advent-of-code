import fs from 'fs';

const readFile = (fileName, url) =>
  fs.readFileSync(new URL(fileName, url), 'utf-8');

const arrayOfObj = (n) => new Array(n).fill().map(Object);

const compareNumbers = (a, b) => a - b;

export default {
  readFile,
  arrayOfObj,
  compareNumbers,
};
