import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => {
    const [left, distance] = line.split(/\s*=\s*/);
    const [from, to] = left.split(' to ');
    return {
        from,
        to,
        distance: parseInt(distance, 10)
    };
});

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const tree = parsedInput.reduce((acc, { from, to, distance }) => {
        if (!acc[from]) {
            acc[from] = {};
        }
        if (!acc[to]) {
            acc[to] = {};
        }
        acc[from][to] = distance;
        acc[to][from] = distance;
        return acc;
    }, {});
    // console.log(tree);
    // console.log('total locations:', Object.keys(tree).length);
    const perm = Helpers.permute(Object.keys(tree));
    // console.log('total permutations:', perm.length);

    const routesDistances = perm.map(route => {
        const len = route.length - 1;
        let sum = 0;
        for (let i = 0; i < len; i++) {
            sum += tree[route[i]][route[i+1]];
        }
        return sum;
    });
    // console.log('total distances:', routesDistances);
    return Math.max(...routesDistances);
};

const tests = [
    {
        inp: `
London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
`,
        out: 982
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