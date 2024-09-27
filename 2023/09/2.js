import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input
		.trim()
		.split('\n')
		.map((line) => line.split(' ').map(Number));
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const res = parsedInput.reduce((acc, history) => {
		const lines = [history];
		let allZero;

		do {
			const newLine = [];
			const last = lines.at(-1);
			for (let i = 1; i < last.length; i++) {
				newLine.push(last[i] - last[i - 1]);
			}
			lines.push(newLine);
			allZero = newLine.join('').match(/[1-9]+/) === null;
		} while (!allZero);

		lines.at(-1).unshift(0);

		for (let i = lines.length - 2; i >= 0; i--) {
			const value = lines[i].at(0) - lines[i + 1].at(0);
			lines[i].unshift(value);
		}

		return (acc += lines[0].at(0));
	}, 0);

	return res;
};

const tests = [
	{
		inp: `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`,
		out: 2,
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
