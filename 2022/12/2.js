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

	const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');

	const dirs = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	];

	const seen = {};
	const queue = [];

	let end;

	const map = parsedInput.map((line, lineN) => {
		return line.map((char, charN) => {
			let index = alpha.indexOf(char);
			if (char === 'a') {
				queue.push({ pos: [lineN, charN], steps: 0 });
				seen[`${lineN}_${charN}`] = 1;
			} else if (char === 'E') {
				index = alpha.indexOf('z');
				end = [lineN, charN];
			}
			return index;
		});
	});
	// console.table(map);
	// console.log(start, end);
	// console.table(parsedInput);

	// console.log(seen);
	// console.log(queue);

	while (queue.length) {
		const {
			pos: [x, y],
			steps,
		} = queue.shift();

		for (const [dx, dy] of dirs) {
			if (
				map[x + dx]?.[y + dy] === undefined ||
				map[x + dx][y + dy] > map[x][y] + 1 ||
				seen[`${x + dx}_${y + dy}`]
			) {
				continue;
			}

			if (x + dx === end[0] && y + dy === end[1]) {
				return steps + 1;
			}

			queue.push({ pos: [x + dx, y + dy], steps: steps + 1 });
			seen[`${x + dx}_${y + dy}`] = 1;
		}
	}

	return 0;
};

const tests = [
	{
		inp: `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`,
		out: 29,
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
