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

const buildTree = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    return parsedInput.reduce((acc, item, index) => {
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
        acc[c].op = op === undefined ? '' : op;

        acc[c].a = ai !== undefined ? ai :acc[as];
        acc[c].b = bi !== undefined ? bi :acc[bs];

        return acc;
    }, {});
};

const calcTree = tree => {
    Object.keys(tree).forEach(key => {
        tree[key].value = deepCalc(tree[key]);
    })
};

const calcSolution = input => {
    const tree1 = buildTree(input);
    calcTree(tree1);
    const a = tree1.a.value;
    // console.log(a);
    
    const tree2 = buildTree(input);
    tree2.b.a = a;
    tree2.b.op = '=';

    calcTree(tree2);
    // console.log(tree2.b);
    // console.log(tree2.a);

    return tree2;
};

console.log(calcSolution(input).a.value);