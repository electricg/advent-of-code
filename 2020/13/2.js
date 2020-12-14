import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
    const lines = input.trim().split('\n');
    const list = lines.length > 1 ? lines[1] : lines[0];
    return list.split(',').map(id => id === 'x' ? 'x' : parseInt(id, 10));
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    let minValue = 0;
    let runningProduct = 1;
    parsedInput.forEach((id, index) => {
        if (id === 'x') {
            return;
        }
        while ((minValue + index) % id !== 0) {
            minValue += runningProduct;
        }
        runningProduct *= id;
    })
    return minValue;
};

const tests = [
    {
        inp: '7,13,x,x,59,x,31,19',
        out: 1068781
    },
    {
        inp: '17,x,13,19',
        out: 3417
    },
    {
        inp: '67,7,59,61',
        out: 754018
    },
    {
        inp: '67,x,7,59,61',
        out: 779210
    },
    {
        inp: '67,7,x,59,61',
        out: 1261476
    },
    {
        inp: '1789,37,47,1889',
        out: 1202161486
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
