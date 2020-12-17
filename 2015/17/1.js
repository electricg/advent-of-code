import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(i => parseInt(i, 10));

const run = (liters, remainingItems, indentation = 0, total = 0) => {
    const len = remainingItems.length;

    for (let i = 0; i < len; i++) {
        const currentItem = remainingItems[i];
        let tmp = liters - currentItem;
        // console.log(Array(indentation).fill('\t').join(''), currentItem, `(${tmp})`, `_${total}_`);

        if (tmp === 0) {
            total++
        }
        else if (tmp > 0) {
            total += run(tmp, [...remainingItems.slice(i + 1)], indentation + 1);
        }
    }

    return total;
}

const calcSolution = (input, liters) => {
    const parsedInput = parseInput(input);
    parsedInput.sort(Helpers.compareNumbers);
    // console.log(parsedInput);

    return run(liters, parsedInput);
};

const tests = [
    {
        inp: `
20
15
10
5
5        
`,
        out: 4,
        liters: 25
    }
];

tests.forEach(({ inp, out, liters }) => {
    const res = calcSolution(inp, liters);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 150));
