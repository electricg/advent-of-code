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
		const id = lines.shift().replace(' map:', '').split('-');

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

	let ranges = [];

	const seedRanges = [];

	for (let s = 0; s < seeds.length; s += 2) {
		seedRanges.push([seeds[s], seeds[s] + seeds[s + 1] - 1]);
	}

	seedRanges.sort((a, b) => {
		return a[0] - b[0];
	});

	seedRanges.forEach((r) => {
		ranges.push({
			seed: { min: r[0], max: r[1] },
		});
	});

	// console.log(ranges);

	maps.forEach(({ id, instructions }, index) => {
		if (index >= 2) return;

		const [sourceId, , destId] = id;
		console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
		console.log(sourceId, destId);

		const newRanges = [];

		for (let r = 0; r < ranges.length; r++) {
			const range = ranges[r];
			const rangeSource = range[sourceId];
			console.log('=================================================');
			console.log(range);

			for (let i = 0; i < instructions.length; i++) {
				const instruction = instructions[i];
				const [destStart, sourceStart, len] = instruction;
				const sourceEnd = sourceStart + len - 1;
				const destEnd = destStart + len - 1;

				console.log(
					sourceStart,
					'-',
					sourceEnd,
					' ',
					destStart,
					'-',
					destEnd,
					'|',
					len
				);

				// 1 - Completely before
				if (rangeSource.max < sourceStart) {
					console.log('Completely before');
					continue;
				}

				// 2 - Completely after
				if (rangeSource.min > sourceEnd) {
					console.log('Completely after');
					continue;
				}

				// 3 - Completely inside
				if (rangeSource.min >= sourceStart && rangeSource.max <= sourceEnd) {
					console.log('Completely inside');
					const diff = rangeSource.min - sourceStart;
					const o = {};
					o[destId] = {
						min: destStart + diff,
						max: rangeSource.max - rangeSource.min + destStart + diff,
					};
					// console.log(o);

					newRanges.push({
						...range,
						...o,
					});
					break;
				}

				// 4 - Start before, end inside
				if (rangeSource.min < sourceStart && rangeSource.max <= sourceEnd) {
					console.log('Start before, end inside');
					continue;
				}

				// 5 - Start before, end after
				if (rangeSource.min < sourceStart && rangeSource.max > sourceEnd) {
					console.log('Start before, end after');
					continue;
				}

				// 6 - Start inside, end after
				if (rangeSource.min >= sourceStart && rangeSource.max > sourceEnd) {
					console.log('Start inside, end after');
					continue;
				}
			}
		}

		console.log(newRanges.length);

		ranges = newRanges;
	});

	return 0;
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
		out: 35,
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

// const sol = calcSolution(input);

// console.log(sol);
// console.log(sol === 424490994 ? `✅` : `❌`);
