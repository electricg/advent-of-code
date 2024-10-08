import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input
		.trim()
		.split('\n')
		.map((line) => {
			const cols = line.split('|');
			const have = cols[1].trim().split(/\s+/);
			const win = cols[0].trim().split(':').pop().trim().split(/\s+/);
			return [win, have];
		});
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const res = parsedInput.reduce((acc, [win, have]) => {
		const winnings = have.filter((item) => win.includes(item)).length;
		const points = winnings === 0 ? 0 : 2 ** (winnings - 1); // ** is Math.pow
		return (acc += points);
	}, 0);
	return res;
};

const tests = [
	{
		inp: `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`,
		out: 13,
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
