import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input.trim().split('\n');
};

const calcSolution = (input) => {
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

	for (let m = 0; m < map.length; m++) {
		const a = map[m].split('');
		for (let i = emptyCols.length - 1; i >= 0; i--) {
			a.splice(emptyCols[i], 0, 'X');
		}
		map[m] = a.join('');
	}
	const expandedWidth = map[0].length;
	for (let i = emptyRows.length - 1; i >= 0; i--) {
		map.splice(emptyRows[i], 0, 'X'.repeat(expandedWidth));
	}
	// console.log(map.join('\n'));

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
		acc += Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
		return acc;
	}, 0);

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
		out: 374,
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
