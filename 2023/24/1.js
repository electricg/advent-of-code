import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
	input
		.trim()
		.replace(/[,@]/g, '')
		.split('\n')
		.map((line) => line.split(/\s+/).map(Number));

// Apx Apy Avx Avy Bpx Bpy Bvx Bvy
const intersect = (Apx, Apy, Avx, Avy, Bpx, Bpy, Bvx, Bvy) => {
	const denom = Bvy * Avx - Bvx * Avy;
	if (denom === 0) {
		return {};
	}
	const ua = (Bvx * (Apy - Bpy) - Bvy * (Apx - Bpx)) / denom;
	return {
		x: Apx + ua * Avx,
		y: Apy + ua * Avy,
	};
};

const getTime = (start, velocity, intersection) => {
	return (intersection - start) / velocity;
};

const calcSolution = (input, min, max) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const list = parsedInput;
	let counter = 0;
	for (let i = 0; i < list.length; i++) {
		for (let j = i + 1; j < list.length; j++) {
			// console.log(list[i]);
			const [Apx, Apy, , Avx, Avy] = list[i];
			const [Bpx, Bpy, , Bvx, Bvy] = list[j];
			const { x, y } = intersect(Apx, Apy, Avx, Avy, Bpx, Bpy, Bvx, Bvy);
			// console.log(i, j, x, y);
			// check if inside the area
			if (min <= x && x <= max && min <= y && y <= max) {
				// check if inside the time
				const Atime = getTime(Apx, Avx, x);
				const Btime = getTime(Bpx, Bvx, x);

				if ((Atime > 0) & (Btime > 0)) {
					counter++;
				}
			}
		}
	}

	// console.log(counter);
	return counter;
};

const tests = [
	{
		inp: `
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3
`,
		min: 7,
		max: 27,
		out: 2,
	},
];

tests.forEach(({ inp, min, max, out }) => {
	const res = calcSolution(inp, min, max);
	if (res === out) {
		console.log(`✅`);
	} else {
		console.error(`❌`);
	}
});

console.log(calcSolution(input, 200000000000000, 400000000000000));
