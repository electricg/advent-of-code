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

    const getSantaPath = (item, path = {}) => {
        if (item.orbit) {
            path[item.orbit] = true;
            return getSantaPath(item.link, path);
        }

        return path;
    };

    const getYouPath = (item, path = []) => {
        if (item.orbit) {
            path.push(item.orbit);
            return getYouPath(item.link, path);
        }

        return path;
    };

    const santaPath = getSantaPath(obj['SAN']);
    const youPath = getYouPath(obj['YOU']);
    const youPathLen = youPath.length;
    let intersection = '';

    loop:
    for (let i = 0; i < youPathLen; i++) {
        if (santaPath[youPath[i]]) {
            intersection = youPath[i];
            break loop;
        }
    }

    const totalOrbits = (obj['YOU'].indirect - obj[intersection].indirect) + (obj['SAN'].indirect - obj[intersection].indirect) - 2;

    return totalOrbits;
};

const tests = [
    {
        inp: `
COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN
`,
        out: 4
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