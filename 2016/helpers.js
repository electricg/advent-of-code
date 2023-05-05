import fs from 'fs';

const readFile = (fileName, url) =>
  fs.readFileSync(new URL(fileName, url), 'utf-8');

const arrayOfObj = (n) => new Array(n).fill().map(Object);

export default {
  readFile,
  arrayOfObj,
};
