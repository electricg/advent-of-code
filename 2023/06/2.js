import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input
		.trim()
		.split('\n')
		.map((line) =>
			line.trim().replace(/\s+/g, '').split(':').slice(1).map(Number)
		)
		.flat();
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const [time, distance] = parsedInput;
	let counter = 0;

	for (let hold = 0; hold < time; hold++) {
		const traveled = hold * (time - hold);
		if (traveled > distance) {
			counter++;
		}
	}
	return counter;
};

const tests = [
	{
		inp: `
Time:      7  15   30
Distance:  9  40  200
`,
		out: 71503,
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
