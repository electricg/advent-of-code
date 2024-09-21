import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const dirs = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	let sum = 0;

	for (let i = 0; i < parsedInput.length; i++) {
		let number = '';
		let isAdjacent = false;

		for (let j = 0; j < parsedInput[i].length; j++) {
			if (/[\d]/.test(parsedInput[i][j])) {
				number += parsedInput[i][j];
				if (isAdjacent === false) {
					for (let [di, dj] of dirs) {
						if (
							parsedInput[i + di]?.[j + dj] &&
							/[^\d^.]/.test(parsedInput[i + di][j + dj])
						) {
							isAdjacent = true;
						}
					}
				}
			} else {
				if (isAdjacent) {
					sum += number * 1;
				}
				number = '';
				isAdjacent = false;
			}
		}

		if (isAdjacent && number !== '') {
			sum += number * 1;
		}
	}

	return sum;
};

const tests = [
	{
		inp: `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`,
		out: 4361,
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
