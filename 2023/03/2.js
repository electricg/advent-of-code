import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
	input
		.trim()
		.split('\n')
		.map((line) => line.split(''));

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
		for (let j = 0; j < parsedInput[i].length; j++) {
			if (parsedInput[i][j] === '*') {
				const parts = [];
				for (let [di, dj] of dirs) {
					if (
						parsedInput[i + di]?.[j + dj] &&
						/\d/.test(parsedInput[i + di][j + dj])
					) {
						let number = parsedInput[i + di][j + dj];
						parsedInput[i + di][j + dj] = 'X';

						for (let j2 = j + dj - 1; j2 >= 0; j2--) {
							if (/\d/.test(parsedInput[i + di][j2])) {
								number = parsedInput[i + di][j2] + number;
								parsedInput[i + di][j2] = 'X';
							} else {
								break;
							}
						}

						for (let j2 = j + dj + 1; j2 < parsedInput[i + di].length; j2++) {
							if (/\d/.test(parsedInput[i + di][j2])) {
								number += parsedInput[i + di][j2];
								parsedInput[i + di][j2] = 'X';
							} else {
								break;
							}
						}

						parts.push(number);
					}
				}

				if (parts.length === 2) {
					sum += parts[0] * parts[1];
				}
			}
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
		out: 467835,
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
