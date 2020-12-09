import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => parseInt(line, 10));

const calcSolution1 = (input, preamble) => {
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
            return {
                series: parsedInput,
                firstInvalid: {
                    index: i,
                    value: current
                }
            };
        }
    }
};

const findSeries2 = (arr = [], value) => {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let sum = arr[i];
        for (let ii = i + 1; ii < len; ii++) {
            sum += arr[ii];
            if (sum === value) {
                return arr.slice(i, ii + 1);
            }
        }
    }
    return false;
};

const calcSolution = (input, preamble) => {
    const res = calcSolution1(input, preamble);
    const { series, firstInvalid } = res;
    const prev = series.slice(0, firstInvalid.index);
    const next = series.slice(firstInvalid.index + 1);
    let solution2 = findSeries2(prev, firstInvalid.value);
    if (!solution2) {
        solution2 = findSeries2(next, firstInvalid.value);
    }

    return {
        firstInvalid,
        solution2: Math.min(...solution2) + Math.max(...solution2)
    };
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
        out: {
            firstInvalid: 127,
            solution2: 62
        }
    }
];

tests.forEach(({ inp, preamble, out }) => {
    const res = calcSolution(inp, preamble);
    if (res.firstInvalid.value === out.firstInvalid && res.solution2 === out.solution2) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 25));
