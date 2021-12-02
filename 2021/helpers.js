import fs from 'fs';

const readFile = (fileName, url) =>
	fs.readFileSync(new URL(fileName, url), 'utf-8');

export default {
	readFile,
};
