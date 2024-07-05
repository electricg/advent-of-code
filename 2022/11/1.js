import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
	input
		.trim()
		.split('\n\n')
		.map((note) => {
			const lines = note.split('\n');

			const id = lines[0].trim().replace(':', '').split(' ')[1] * 1;
			const items = lines[1]
				.trim()
				.split(': ')[1]
				.split(', ')
				.map((i) => i * 1);
			const operation = lines[2].trim().split('= ')[1].split(' ');
			operation.shift();
			if (!isNaN(operation[1])) {
				operation[1] *= 1;
			}
			const test = lines[3].split(' ').pop() * 1;
			const bool = {};
			const line4 = lines[4].trim().replace(':', '').split(' ');
			const line5 = lines[5].trim().replace(':', '').split(' ');
			bool[line4[1] === 'true'] = line4.pop() * 1;
			bool[line5[1] === 'true'] = line5.pop() * 1;

			return { id, items, operation, test, bool, count: 0 };
		});

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	let round = 1;

	while (round <= 20) {
		parsedInput.forEach((monkey) => {
			const { items, operation, test, bool } = monkey;
			items.forEach((item) => {
				monkey.count++;

				if (operation[0] === '+') {
					if (operation[1] === 'old') {
						item += item;
					} else {
						item += operation[1];
					}
				} else {
					if (operation[1] === 'old') {
						item *= item;
					} else {
						item *= operation[1];
					}
				}
				item = Math.floor(item / 3);

				if (item % test === 0) {
					parsedInput[bool[true]].items.push(item);
				} else {
					parsedInput[bool[false]].items.push(item);
				}
			});
			monkey.items = [];
		});

		round++;
	}
	// console.log(parsedInput);
	const counts = parsedInput.map((monkey) => monkey.count);
	counts.sort((a, b) => b - a);

	return counts[0] * counts[1];
};

const tests = [
	{
		inp: `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`,
		out: 10605,
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
