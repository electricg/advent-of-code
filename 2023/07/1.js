import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
	return input
		.trim()
		.split('\n')
		.map((line) => line.split(' '));
};

const CARDS_VALUES = [
	['A', 'A'],
	['K', 'B'],
	['Q', 'C'],
	['J', 'D'],
	['T', 'E'],
	['9', 'F'],
	['8', 'G'],
	['7', 'H'],
	['6', 'I'],
	['5', 'J'],
	['4', 'K'],
	['3', 'L'],
	['2', 'M'],
];

const replaceCards = (cards) => {
	let newCards = cards;

	CARDS_VALUES.forEach((letter) => {
		newCards = newCards.replace(new RegExp(letter[0], 'g'), letter[1]);
	});

	return newCards;
};

const countCards = (cards) => {
	const o = {};
	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		if (o[card] === undefined) {
			o[card] = 0;
		}
		o[card]++;
	}
	return o;
};

const getHandType = (countedCards) => {
	const len = Object.keys(countedCards).length;
	const numbers = Object.values(countedCards);
	const max = Math.max(...numbers);

	// Five of a kind
	if (max === 5) {
		return 1;
	}

	// Four of a kind
	if (max === 4) {
		return 2;
	}

	// Full house
	if (max === 3 && len === 2) {
		return 3;
	}

	// Three of a kind
	if (max === 3 && len === 3) {
		return 4;
	}

	// Two pair
	if (max === 2 && len === 3) {
		return 5;
	}

	// One pair
	if (max === 2 && len === 4) {
		return 6;
	}

	// High card
	return 7;
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	parsedInput.forEach((line) => {
		const [hand] = line;
		const newHand = replaceCards(hand);
		const countedCards = countCards(hand);
		const handType = getHandType(countedCards);
		line.push(newHand);
		line.push(countedCards);
		line.push(handType);
	});

	parsedInput.sort((a, b) => {
		if (a[4] < b[4]) {
			return 1;
		}
		if (a[4] > b[4]) {
			return -1;
		}

		if (a[2] < b[2]) {
			return 1;
		}
		if (a[2] > b[2]) {
			return -1;
		}

		return 0;
	});

	// console.log(parsedInput);

	let total = 0;
	parsedInput.forEach((hand, index) => {
		const bid = hand[1];
		total += bid * (index + 1);
	});

	return total;
};

const tests = [
	{
		inp: `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`,
		out: 6440,
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
