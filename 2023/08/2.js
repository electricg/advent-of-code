import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	const [instructions, rawNodes] = input.trim().split('\n\n');
	const nodes = rawNodes.split('\n').reduce((acc, line) => {
		const arr = line
			.replace(/[\s()]+/g, '')
			.replace('=', ',')
			.split(',');
		const key = arr.shift();
		acc[key] = arr;
		return acc;
	}, {});

	return {
		instructions,
		nodes,
	};
};

// Least Common Multiple of an array values using Euclidean Algorithm
// https://stackoverflow.com/a/49722579/471720
const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);
const lcmOfArray = (arr) => arr.reduce(lcm);

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const { instructions, nodes } = parsedInput;

	let currentNodes = [];
	for (const k in nodes) {
		if (k[k.length - 1] === 'A') {
			currentNodes.push(k);
		}
	}

	const isFinished = (k) => k[k.length - 1] === 'Z';

	const counters = currentNodes.map((currentNode) => {
		let currentInstructions = [];
		let counter = 0;

		while (!isFinished(currentNode)) {
			if (currentInstructions.length === 0) {
				currentInstructions = instructions.split('');
			}
			const dirLetter = currentInstructions.shift();
			const dir = dirLetter === 'L' ? 0 : 1;
			currentNode = nodes[currentNode][dir];
			counter++;
		}
		return counter;
	});

	// console.log(counters);
	return lcmOfArray(counters);
};

const tests = [
	{
		inp: `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`,
		out: 6,
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
