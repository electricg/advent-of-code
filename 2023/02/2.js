import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input
		.trim()
		.split('\n')
		.map((line) => {
			const [, subsets] = line.split(':');
			const sets = subsets
				.trim()
				.split(';')
				.map((set) => {
					return set
						.trim()
						.split(',')
						.reduce((acc, s) => {
							const [n, color] = s.trim().split(' ');
							acc[color] = n * 1;
							return acc;
						}, {});
				});
			// console.log(sets);

			return sets;
		});
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const res = parsedInput.reduce((acc, game) => {
		const bag = {
			red: 0,
			green: 0,
			blue: 0,
		};
		game.forEach((set) => {
			for (const color in set) {
				if (set[color] > bag[color]) {
					bag[color] = set[color];
				}
			}
		});
		// console.log(bag);
		let power = 1;
		for (const color in bag) {
			power *= bag[color];
		}
		return (acc += power);
	}, 0);

	return res;
};

const tests = [
	{
		inp: `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`,
		out: 2286,
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
