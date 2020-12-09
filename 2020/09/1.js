import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => parseInt(line, 10));

const calcSolution = (input, preamble) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const len = parsedInput.length;

    for (let i = preamble; i < len; i++) {
        const current = parsedInput[i];
        const prevs = parsedInput.slice(i - preamble, i);
        const plen = prevs.length;
        let isValid = false;
        loop:
        for (let p = 0; p < plen - 1; p++) {
            for (let s = p + 1; s < plen; s++) {
                if (prevs[p] + prevs[s] === current) {
                    isValid = true;
                    break loop;
                }
            }
        }
        if (!isValid) {
            return current;
        }
    }
};

const tests = [
    {
        inp: `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`,
        preamble: 5,
        out: 127
    }
];

tests.forEach(({ inp, preamble, out }) => {
    const res = calcSolution(inp, preamble);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 25));
