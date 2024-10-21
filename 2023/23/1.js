import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input
		.trim()
		.split('\n')
		.map((line) => line.split(''));
};

const DIRS = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

const SLOPES = { '^': DIRS[0], '>': DIRS[1], v: DIRS[2], '<': DIRS[3] };

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const map = parsedInput;
	const start = [0, map[0].indexOf('.')];
	const end = [map.length - 1, map.at(-1).indexOf('.')];
	// console.log(start, end);

	const queue = [];
	let hikes = 0;

	queue.push({
		pos: start,
		steps: 0,
		seen:
			('' + start[0]).padStart(3, '0') +
			'_' +
			('' + start[1]).padStart(3, '0') +
			'|',
	});

	while (queue.length) {
		const {
			pos: [x, y],
			steps,
			seen,
		} = queue.shift();

		const char = map[x][y];
		// console.log('=>', x, y, steps, char);

		let current_dirs = [];

		// step onto a slope tile
		if (SLOPES[char]) {
			current_dirs = [SLOPES[char]];
		} else {
			current_dirs = [...DIRS];
		}

		for (const [dx, dy] of current_dirs) {
			const nx = x + dx;
			const ny = y + dy;

			// already traversed it
			if (
				seen.indexOf(
					('' + nx).padStart(3, '0') + '_' + ('' + ny).padStart(3, '0') + '|'
				) !== -1
			) {
				continue;
			}

			// arrived at the end
			if (nx === end[0] && ny === end[1]) {
				hikes = Math.max(hikes, steps + 1);
				// console.log('end', steps + 1);
				continue;
			}

			// if not forest
			if (map[nx]?.[ny] && map[nx][ny] !== '#') {
				queue.push({
					pos: [nx, ny],
					steps: steps + 1,
					seen:
						seen +
						('' + nx).padStart(3, '0') +
						'_' +
						('' + ny).padStart(3, '0') +
						'|',
				});
			}
		}
	}

	return hikes;
};

const tests = [
	{
		inp: `
#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#
`,
		out: 94,
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

// console.time();
console.log(calcSolution(input));
// console.timeEnd();
