import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n\n').map(group => group.split('\n'));

const calcTotalYes = input => {
    const groups = parseInput(input);
    return groups.reduce((acc, group) => {
        const unique = new Set(group.join('').split(''));
        return acc + unique.size;
    }, 0);
};

const tests = [
    {
        inp: `
abcx
abcy
abcz
`,
        out: 6
    },
    {
        inp: `
abc

a
b
c

ab
ac

a
a
a
a

b
`,
        out: 11
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcTotalYes(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcTotalYes(input));