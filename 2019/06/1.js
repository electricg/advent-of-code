import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseOrbits = txt => txt.trim().split('\n').map(item => item.split(')'));

const calcOrbits = (arr = []) => {
    const orbits = parseOrbits(arr);

    const obj = orbits.reduce((acc, [around, what]) => {
        if (!acc[around]) {
            acc[around] = {
                direct: 0,
                indirect: 0
            };
        }
        if (!acc[what]) {
            acc[what] = {};
        }
        acc[what].link = acc[around];
        acc[what].orbit = around;
        acc[what].direct = 1;
        acc[what].indirect = 0;
        return acc;
    }, {});

    const recursiveCalc = (item) => {
        if (item.orbit) {
            const res = recursiveCalc(item.link);
            item.indirect = res[0] + res[1];
        }
        return [item.indirect, item.direct];
    };

    Object.keys(obj).forEach(key => recursiveCalc(obj[key]));

    const totalOrbits = Object.keys(obj).reduce((acc, key) => {
        const item = obj[key];
        acc += item.indirect + item.direct;
        return acc;
    }, 0);

    return totalOrbits;
};

const tests = [
    {
        inp: `
COM)B
B)C
K)L
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
`,
        out: 42
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcOrbits(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcOrbits(input));