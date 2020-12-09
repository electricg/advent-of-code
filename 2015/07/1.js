import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map((line, index) => {
    const matches = line.match(/^((?<as>[a-z]+)|(?<ai>\d+))?( +)?(?<op>AND|OR|RSHIFT|LSHIFT|NOT)?( +)?((?<bs>[a-z]+)|(?<bi>\d+))?( *-> *)(?<c>[a-z]+)$/);
    // if (matches) {
    //     if (!matches.groups.op) {
    //         console.log(index + 1, JSON.stringify(matches.groups));
    //     }
    // }
    // else {
    //     console.log('❌', line);
    // }

    const { groups } = matches;
    const { op, as, bs, c } = groups;
    const ai = groups.ai !== undefined ? parseInt(groups.ai) : groups.ai;
    const bi = groups.bi !== undefined ? parseInt(groups.bi) : groups.bi;
    return {
        op: op === undefined ? '=' : op,
        ai,
        as,
        bi,
        bs,
        c,
        line: `${index}|${line}`
    }

});

const deepCalc = (tree) => {
    if (tree.a !== undefined && typeof tree.a !== 'number') {
        tree.a = deepCalc(tree.a);
    }
    if (tree.b !== undefined && typeof tree.b !== 'number') {
        tree.b = deepCalc(tree.b);
    }

    return actions[tree.op](tree.a, tree.b);
};

const actions = {
    'AND': (a, b) => a & b,
    'OR': (a, b) => a | b,
    'NOT': (a, b) => b ^ 65535,
    'LSHIFT': (a, b) => a << b,
    'RSHIFT': (a, b) => a >> b,
    '=': (a, b) => a,
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    const tree = parsedInput.reduce((acc, item, index) => {
        const { op, ai, as, bi, bs, c, line } = item;

        if (acc[c] === undefined) {
            acc[c] = {};
        }
        if (as !== undefined && acc[as] === undefined) {
            acc[as] = {};
        }
        if (bs !== undefined && acc[bs] === undefined) {
            acc[bs] = {};
        }

        acc[c].label = line;
        acc[c].op = op;

        acc[c].a = ai !== undefined ? ai :acc[as];
        acc[c].b = bi !== undefined ? bi :acc[bs];

        return acc;
    }, {});

    Object.keys(tree).forEach(key => {
        tree[key].value = deepCalc(tree[key]);
    })
    // console.log(tree);

    return tree;
};

const tests = [
    {
        inp: `
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
123 -> x
456 -> y
`,
        out: {
            d: 72,
            e: 507,
            f: 492,
            g: 114,
            h: 65412,
            i: 65079,
            x: 123,
            y: 456
        }
    }
];

const checkTest = (res, expected) => {
    const resKeys = Object.keys(res);
    const resKeysLen = resKeys.length;
    const expectedKeys = Object.keys(expected);
    const expectedKeysLen = expectedKeys.length;

    for (let i = 0; i < resKeysLen; i++) {
        if (res[resKeys[i]].value !== expected[resKeys[i]]) {
            return false;
        }
    }

    for (let i = 0; i < expectedKeysLen; i++) {
        if (res[expectedKeys[i]].value !== expected[expectedKeys[i]]) {
            return false;
        }
    }

    return true;
};

tests.forEach(({ inp, out }) => {
    const res = calcSolution(inp);
    if (checkTest(res, out)) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input).a.value);