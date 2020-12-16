import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const ticker = `
children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1
`;

const parseInput = input => input.trim().split('\n').map(line => {
    const matches = line.match(/^Sue (?<index>\d+):\s+(?<rest>.+)/);
    const { index, rest } = matches.groups;
    const items = rest.split(/\s*,\s*/);
    const objItems = items.reduce((acc, item) => {
        const [key, value] = item.split(/\s*:\s*/);
        acc[key] = parseInt(value, 10);
        return acc;
    }, {});
    return {
        index: parseInt(index, 10),
        items: objItems
    };
});

const parseTicker = input => input.trim().split('\n').reduce((acc, line) => {
    const [key, value] = line.split(/\s*:\s*/);
    acc[key] = parseInt(value, 10);
    return acc;
}, {});

const calcSolution = (input, ticker) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const parsedTicker = parseTicker(ticker);
    // console.log(parsedTicker);

    const filterKeys = Object.keys(parsedTicker);
    const filterKeysLen = filterKeys.length;

    let filtered = parsedInput;

    for (let i = 0; i < filterKeysLen; i++) {
        const key = filterKeys[i];
        const value = parsedTicker[key];

        filtered = filtered.filter(({ items }) => {
            if (key === 'cats' || key === 'trees') {
                return items[key] == null || items[key] > value;
            }
            if (key === 'pomeranians' || key === 'goldfish') {
                return items[key] == null || items[key] < value;
            }
            return items[key] == null || items[key] === value;
        });
    }

    return filtered.pop().index;
};

console.log(calcSolution(input, ticker));
