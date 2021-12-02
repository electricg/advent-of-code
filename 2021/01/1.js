import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => Helpers.inputLinesToNumbers(input);

const calcSolution = input => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	let counter = 0;
	const len = parsedInput.length;

	for (let i = 1; i < len; i++) {
		if (parsedInput[i] > parsedInput[i - 1]) {
			counter++;
		}
	}

	return counter;
};

const tests = [
	{
		inp: `
199
200
208
210
200
207
240
269
260
263
`,
		out: 7,
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
