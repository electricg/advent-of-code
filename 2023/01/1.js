import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const res = parsedInput.reduce((acc, line) => {
		const len = line.length;
		let first;
		let last;
		for (let i = 0; i < len; i++) {
			if (!isNaN(line[i])) {
				first = line[i];
				break;
			}
		}
		for (let i = len - 1; i >= 0; i--) {
			if (!isNaN(line[i])) {
				last = line[i];
				break;
			}
		}
		// console.log(first + last);

		return acc + (first + last) * 1;
	}, 0);

	return res;
};

const tests = [
	{
		inp: `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`,
		out: 142,
	},
];

tests.forEach(({ inp, out }) => {
	const res = calcSolution(inp);
	if (res === out) {
		console.log(`✅`);
	} else {
		console.error(`❌`);
	}
});

console.log(calcSolution(input));
