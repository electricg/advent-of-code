import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
	return input.trim().split('\n');
};

const calcSolution = input => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	let gamma = '';
	let epsilon = '';

	const width = parsedInput[0].length;
	const cols = [];

	for (let i = 0; i < width; i++) {
		cols.push({
			0: 0,
			1: 0,
		});
	}

	for (let h = 0; h < parsedInput.length; h++) {
		for (let w = 0; w < width; w++) {
			const char = parsedInput[h][w];
			cols[w][char] += 1;
		}
	}
	// console.log(cols);

	for (let i = 0; i < width; i++) {
		const col = cols[i];
		if (col['0'] > col['1']) {
			gamma += '0';
			epsilon += '1';
		} else {
			gamma += '1';
			epsilon += '0';
		}
	}

	// console.log(gamma, epsilon);
	gamma = parseInt(gamma, 2);
	epsilon = parseInt(epsilon, 2);

	return gamma * epsilon;
};

const tests = [
	{
		inp: `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`,
		out: 198,
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
