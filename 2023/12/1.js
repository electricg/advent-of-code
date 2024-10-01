import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input
		.trim()
		.split('\n')
		.map((line) => {
			const [condition, sizes] = line.split(' ');
			return {
				condition,
				sizes: sizes.split(',').map(Number),
			};
		});
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	console.log(parsedInput);

	return 0;
};

const tests = [
	{
		inp: `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`,
		out: 21,
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

// console.log(calcSolution(input));
