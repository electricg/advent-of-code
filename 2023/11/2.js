import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input.trim().split('\n');
};

const calcSolution = (input, times) => {
	const map = parseInput(input);
	// console.log(map);

	const originalWidth = map[0].length;
	const originalHeight = map.length;
	const emptyCols = [];
	const emptyRows = [];
	for (let i = 0; i < originalWidth; i++) {
		emptyCols.push(i);
	}
	for (let i = 0; i < originalHeight; i++) {
		emptyRows.push(i);
	}
	for (let i = 0; i < originalHeight; i++) {
		let indexOf = -1;
		do {
			indexOf = map[i].indexOf('#', indexOf + 1);

			if (indexOf !== -1) {
				if (emptyRows.indexOf(i) !== -1) {
					emptyRows.splice(emptyRows.indexOf(i), 1);
				}
				if (emptyCols.indexOf(indexOf) !== -1) {
					emptyCols.splice(emptyCols.indexOf(indexOf), 1);
				}
			}
		} while (indexOf !== -1);
	}
	// console.log(emptyRows, emptyCols);

	const galaxies = [];
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === '#') {
				galaxies.push([i, j]);
			}
		}
	}
	// console.log(galaxies);

	const pairs = [];
	for (let i = 0; i < galaxies.length; i++) {
		for (let j = i + 1; j < galaxies.length; j++) {
			pairs.push([galaxies[i], galaxies[j]]);
		}
	}
	// console.log(pairs.length);

	const res = pairs.reduce((acc, pair) => {
		const [a, b] = pair;

		const dA =
			emptyRows.filter((row) => a[0] < row && row < b[0]).length * (times - 1);
		const dB =
			emptyCols.filter(
				(col) => Math.min(a[1], b[1]) < col && col < Math.max(a[1], b[1])
			).length *
			(times - 1);
		const diff = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + dA + dB;
		// console.log(a, b, dA, dB, diff);

		acc += diff;
		return acc;
	}, 0);
	// console.log(res);

	return res;
};

const tests = [
	{
		inp: `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`,
		variations: [
			{ times: 2, out: 374 },
			{ times: 10, out: 1030 },
			{ times: 100, out: 8410 },
		],
	},
];

tests.forEach(({ inp, variations }) => {
	variations.forEach(({ times, out }) => {
		const res = calcSolution(inp, times);
		if (res === out) {
			console.log(`✅`);
		} else {
			console.error(`❌`);
		}
	});
});

console.log(calcSolution(input, 1000000));
