import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
	return input.trim().split('\n');
};

const findNumber = (list, width, what) => {
	let filteredList = list.slice();

	let nth = 0;

	while (filteredList.length > 1) {
		const cols = [];

		for (let i = 0; i < width; i++) {
			cols.push({
				0: 0,
				1: 0,
			});
		}

		for (let h = 0; h < filteredList.length; h++) {
			for (let w = 0; w < width; w++) {
				const char = filteredList[h][w];
				cols[w][char] += 1;
			}
		}
		// console.log(cols);

		let find;
		const col = cols[nth];
		if (what === 'max') {
			if (col['0'] > col['1']) {
				find = '0';
			} else {
				find = '1';
			}
		} else if (what === 'min') {
			if (col['0'] > col['1']) {
				find = '1';
			} else {
				find = '0';
			}
		}

		filteredList = filteredList.filter(line => {
			return line[nth] === find;
		});
		// console.log(filteredList);

		nth++;
	}

	filteredList = filteredList.pop();
	filteredList = parseInt(filteredList, 2);
	// console.log(filteredList);
	return filteredList;
};

const calcSolution = input => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const width = parsedInput[0].length;

	const oxygen = findNumber(parsedInput, width, 'max');
	const carbon = findNumber(parsedInput, width, 'min');

	return oxygen * carbon;
};

const tests = [
	{
		inp: `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`,
		out: 230,
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
