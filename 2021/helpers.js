import fs from 'fs';

const readFile = (fileName, url) =>
	fs.readFileSync(new URL(fileName, url), 'utf-8');

const splitLines = txt => txt.trim().split('\n');

const arrayToNumbers = array => array.map(item => parseInt(item, 10));

const inputLinesToNumbers = input => arrayToNumbers(splitLines(input));

const compareNumbers = (a, b) => a - b;

export default {
	readFile,
	inputLinesToNumbers,
	compareNumbers,
};
