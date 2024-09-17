import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
	input
		.trim()
		.split('\n\n')
		.map((pairs) => pairs.split('\n').map(JSON.parse));

// Return -1 right order, 1 wrong order, 0 continue checking
const compare = (a, b) => {
	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}

	if (typeof a === 'number') {
		a = [a];
	} else if (typeof b === 'number') {
		b = [b];
	}

	for (let i = 0; i < a.length; i++) {
		if (b[i] === undefined) {
			return 1;
		}

		const c = compare(a[i], b[i]);
		if (c !== 0) {
			return c;
		}
	}

	return a.length === b.length ? 0 : -1;
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const corrects = parsedInput.map(([a, b]) => compare(a, b) <= 0);
	// console.log(corrects);

	const result = corrects.reduce((acc, correct, i) => acc + correct * (i + 1));
	// console.log(result);
	return result;
};

const tests = [
	{
		inp: `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
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
