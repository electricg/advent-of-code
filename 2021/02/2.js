import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
	return input
		.trim()
		.split('\n')
		.map(line => {
			const [dir, units] = line.split(' ');
			return [dir, Number(units)];
		});
};

const calcSolution = input => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	let horizontal = 0;
	let depth = 0;
	let aim = 0;

	parsedInput.forEach(([dir, units]) => {
		if (dir === 'forward') {
			horizontal += units;
			depth += aim * units;
		} else if (dir === 'down') {
			aim += units;
		} else if (dir === 'up') {
			aim -= units;
		}
	});

	return horizontal * depth;
};

const tests = [
	{
		inp: `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`,
		out: 900,
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
