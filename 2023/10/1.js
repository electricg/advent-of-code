import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	const grid = input.trim().split('\n');
	const width = grid[0].length + 1;
	const indexOfS = input.trim().indexOf('S');
	const y = Math.floor(indexOfS / width);
	const x = indexOfS % width;
	return { grid, S: [y, x] };
};

const PIPE_TYPES = {
	'|': { n: 1, s: 1 },
	'-': { e: 1, w: 1 },
	L: { n: 1, e: 1 },
	J: { n: 1, w: 1 },
	7: { s: 1, w: 1 },
	F: { s: 1, e: 1 },
	S: { n: 1, e: 1, s: 1, w: 1 },
};

const DIRS = {
	n: [-1, 0, 's'],
	e: [0, 1, 'w'],
	s: [1, 0, 'n'],
	w: [0, -1, 'e'],
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);
	const { grid, S } = parsedInput;
	// console.log(S, grid[S[0]][S[1]]);

	let next = S;
	let prev = S;
	let neighbor;
	let steps = 0;

	do {
		const tile = grid[next[0]][next[1]];
		for (const dir in PIPE_TYPES[tile]) {
			const [dx, dy, dd] = DIRS[dir];
			const nx = next[0] + dx;
			const ny = next[1] + dy;
			neighbor = grid[nx]?.[ny];

			if (neighbor === 'S') {
				break;
			}
			if (neighbor && neighbor !== '.' && !(prev[0] === nx && prev[1] === ny)) {
				if (PIPE_TYPES[neighbor][dd]) {
					prev = [next[0], next[1]];
					next = [nx, ny];
					steps++;
					break;
				}
			}
		}
	} while (neighbor !== 'S');

	const res = Math.ceil(steps / 2);
	return res;
};

const tests = [
	{
		inp: `
.....
.S-7.
.|.|.
.L-J.
.....
`,
		out: 4,
	},
	{
		inp: `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`,
		out: 8,
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
