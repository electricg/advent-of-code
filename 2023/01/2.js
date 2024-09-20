import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const spelled = [
		'one',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'eight',
		'nine',
	];

	const res = parsedInput.reduce((acc, line) => {
		const len = line.length;
		let first;
		let last;
		loop1: for (let i = 0; i < len; i++) {
			if (!isNaN(line[i])) {
				first = line[i];
				break loop1;
			}

			for (let s = 0; s < spelled.length; s++) {
				if (line.substring(i).indexOf(spelled[s]) === 0) {
					first = s + 1;
					break loop1;
				}
			}
		}

		loop2: for (let i = len - 1; i >= 0; i--) {
			if (!isNaN(line[i])) {
				last = line[i];
				break loop2;
			}

			for (let s = 0; s < spelled.length; s++) {
				if (line.substring(i).indexOf(spelled[s]) === 0) {
					last = s + 1;
					break loop2;
				}
			}
		}
		// console.log(first + '' + last);

		return acc + (first + '' + last) * 1;
	}, 0);

	return res;
};

const tests = [
	{
		inp: `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`,
		out: 281,
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
