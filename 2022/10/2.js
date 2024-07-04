import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
	input
		.trim()
		.split('\n')
		.map((line) => {
			const [dir, n] = line.split(' ');
			return [dir, n === undefined ? undefined : n * 1];
		});

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	let X = 1;
	let cycle = 0;
	let CRT = '';

	parsedInput.forEach(([dir, V]) => {
		if (cycle >= X - 1 && cycle <= X + 1) {
			CRT += '#';
		} else {
			CRT += '.';
		}

		cycle = (cycle + 1) % 40;

		if (dir === 'addx') {
			if (cycle >= X - 1 && cycle <= X + 1) {
				CRT += '#';
			} else {
				CRT += '.';
			}

			cycle = (cycle + 1) % 40;

			X += V;
		}
	});

	let formattedCRT = '';
	for (let i = 0; i < CRT.length; i += 40) {
		formattedCRT += CRT.slice(i, i + 40) + '\n';
	}

	// console.log(formattedCRT.trim());

	return formattedCRT.trim();
};

const tests = [
	{
		inp: `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`,
		out: `
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
`.trim(),
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
