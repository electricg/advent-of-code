import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	const rawMaps = input.trim().split('\n\n');

	const seedsLine = rawMaps.shift();
	const seeds = seedsLine
		.trim()
		.split(':')
		.pop()
		.trim()
		.split(' ')
		.map((item) => item * 1);

	const maps = rawMaps.map((map) => {
		const lines = map.trim().split('\n');
		const id = lines.shift();

		const instructions = lines.map((line) => line.split(' ').map((n) => n * 1));

		return { id, instructions };
	});

	return {
		seeds,
		maps,
	};
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const { seeds, maps } = parsedInput;
	const locations = [];

	for (let s = 0; s < seeds.length; s += 2) {
		// console.log(seeds[s]);
		for (let ss = seeds[s]; ss < seeds[s] + seeds[s + 1]; ss++) {
			let next = ss;

			maps.forEach(({ instructions }) => {
				for (let i = 0; i < instructions.length; i++) {
					const instruction = instructions[i];
					const [dest, source, len] = instruction;
					if (next >= source && next < source + len) {
						const diff = next - source;
						next = dest + diff;
						break;
					}
				}
			});

			locations.push(next);
		}
	}

	return Math.min(...locations);
};

const tests = [
	{
		inp: `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`,
		out: 46,
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

// not 3943078016
