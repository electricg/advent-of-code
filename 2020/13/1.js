import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
    const [starting, list] = input.trim().split('\n');
    const buses = list.split(',').filter(id => id !== 'x').map(id => parseInt(id, 10));

    return {
        starting: parseInt(starting, 10),
        buses
    };
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const { starting, buses} = parsedInput;
    let earliestBus;
    let earliestTimestamp = Infinity;
    const timetable = buses.reduce((acc, bus) => {
        const next = starting + bus - starting % bus;
        if (next < earliestTimestamp) {
            earliestTimestamp = next;
            earliestBus = bus;
        }
        acc[bus] = next
        return acc;
    }, {});
    // console.log(earliestBus, earliestTimestamp);

    return (earliestTimestamp - starting) * earliestBus;
};

const tests = [
    {
        inp: `
939
7,13,x,x,59,x,31,19
`,
        out: 295
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcSolution(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
