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

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const { instructions, nodes } = parsedInput;

	let currentNode = 'AAA';
	let currentInstructions = [];
	let counter = 0;

	while (currentNode !== 'ZZZ') {
		if (currentInstructions.length === 0) {
			currentInstructions = instructions.split('');
		}
		const dirLetter = currentInstructions.shift();
		const dir = dirLetter === 'L' ? 0 : 1;
		currentNode = nodes[currentNode][dir];
		counter++;
	}

	return counter;
};

const tests = [
	{
		inp: `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`,
		out: 2,
	},
	{
		inp: `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
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
