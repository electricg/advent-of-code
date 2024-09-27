import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	const arr = input
		.trim()
		.split('\n')
		.map((line) => line.trim().split(/\s+/).slice(1).map(Number));

	const zipped = [];
	arr.forEach((item) => {
		item.forEach((i, index) => {
			if (zipped[index] === undefined) {
				zipped[index] = [];
			}
			zipped[index].push(i);
		});
	});

	return zipped;
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const res = parsedInput.reduce((acc, race) => {
		const [time, distance] = race;
		let counter = 0;

		for (let hold = 0; hold < time; hold++) {
			const traveled = hold * (time - hold);
			if (traveled > distance) {
				counter++;
			}
		}
		return acc * counter;
	}, 1);

	return res;
};

const tests = [
	{
		inp: `
Time:      7  15   30
Distance:  9  40  200
`,
		out: 288,
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
