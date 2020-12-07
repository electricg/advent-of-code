import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
    return input.trim().split('\n').reduce((acc, line) => {
        const cleaned = line.replace('.', '');
        const tmp1 = cleaned.split('contain');
        const key = tmp1[0].trim().replace(/ bag[s]?/, '');
        const tmp2 = tmp1[1].split(',');
        const bags = tmp2.map(bag => {
            return bag.trim().replace(/ bag[s]?/, '').replace(/^\d* /, '');
        }).filter(bag => bag !== 'no other');

        acc[key] = bags;
        return acc;
    }, {});
};

const createTreeTopDown = input => {
    return Object.keys(input).reduce((acc, key) => {
        const bags = input[key];
        if (!acc[key]) {
            acc[key] = {};
        }
        bags.forEach(bag => {
            if (!acc[bag]) {
                acc[bag] = {};
            }
            acc[key][bag] = acc[bag];
        });

        return acc;
    }, {});
};

const createTreeBottomUp = input => {
    return Object.keys(input).reduce((acc, key) => {
        const bags = input[key];
        if (!acc[key]) {
            acc[key] = {};
        }
        bags.forEach(bag => {
            if (!acc[bag]) {
                acc[bag] = {};
            }
            acc[bag][key] = acc[key];
        });

        return acc;
    }, {});
};

const createTreeBottomUp2 = input => {
    return Object.keys(input).reduce((pointers, key) => {
        const bags = input[key];
        if (!pointers[key]) {
            pointers[key] = [];
        }
        bags.forEach(bag => {
            if (!pointers[bag]) {
                pointers[bag] = [];
            }
            pointers[bag].push({ [key]: pointers[key] });
        });

        return pointers;
    }, {});
};

const calcParents = (tree = [], memo = {}) => {
    const len = tree.length;

    if (len > 0) {
        memo = tree.reduce((acc, item) => {
            const keys = Object.keys(item);
            keys.forEach(key => {
                acc[key] = true;
                acc = { ...acc, ...calcParents(item[key], acc) };
            });
            return acc;
        }, {});
    }

    return memo;
};

const calcSolution = (input, bag) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    const tree = createTreeBottomUp2(parsedInput);
    // console.log(JSON.stringify(tree[bag], null, 2));

    const parents = calcParents(tree[bag]);
    // console.log(parents);
    return Object.keys(parents).length;
};

const tests = [
    {
        inp: `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
        `,
        what: 'shiny gold',
        out: 4
    }
];

tests.forEach(({ inp, what, out }) => {
    const res = calcSolution(inp, what);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 'shiny gold'));