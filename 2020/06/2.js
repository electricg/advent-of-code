import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n\n').map(group => group.split('\n'));

const calcTotalYes = input => {
    const groups = parseInput(input);

    const x = groups.reduce((acc, group) => {
        const len = group.length;
        const obj = {};
        group.forEach(person => {
            const answers = person.split('');
            answers.forEach(answer => {
                if (!obj[answer]) {
                    obj[answer] = 0;
                }
                obj[answer] += 1;
            });
        });

        Object.keys(obj).forEach(key => {
            if (obj[key] === len) {
                acc += 1;
            }
        });

        return acc;
    }, 0);

    return x;
};

const tests = [
    {
        inp: `
abcx
abcy
abcz
`,
        out: 3
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
        out: 6
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