import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
    return input.trim().split('\n').reduce((acc, line) => {
        const cleaned = line.replace('.', '');
        const tmp1 = cleaned.split('contain');
        const key = tmp1[0].trim().replace(/ bag[s]?/, '');
        const tmp2 = tmp1[1].split(',');
        const bags = tmp2.reduce((acc, bag) => {
            const parsedBag = bag.trim().replace(/ bag[s]?/, '');
            if (parsedBag !== 'no other') {
                const match = parsedBag.match(/^(\d+) (.+)$/);
                if (match) {
                    const [, qt, b] = match;
                    acc.push({
                        qt: parseInt(qt, 10),
                        bag: b
                    });
                }
            }
            return acc;
        }, []);

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

const createTreeTopDown2 = input => {
    return Object.keys(input).reduce((pointers, key) => {
        const bags = input[key];
        if (!pointers[key]) {
            pointers[key] = [];
        }
        bags.forEach(({ qt, bag }) => {
            if (!pointers[bag]) {
                pointers[bag] = [];
            }
            pointers[key].push({
                qt,
                bag,
                content: pointers[bag]
            });
        });

        return pointers;
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

const calcParents = (tree = [], memo = { tot: 0, qt: 1 }) => {
    const len = tree.length;

    if (len > 0) {
        memo = tree.reduce((memo, { qt, content }) => {
            const insideBags = qt * memo.qt;
            memo.tot += insideBags;
            const res = calcParents(content, { tot: memo.tot, qt: insideBags });
            return { tot: res.tot, qt: memo.qt };
        }, memo);
    }

    return memo;
};

const calcSolution = (input, bag) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    const tree = createTreeTopDown2(parsedInput);
    // console.log(JSON.stringify(tree[bag], null, 2));

    const parents = calcParents(tree[bag]);
    // console.log(parents);
    return parents.tot;
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
        out: 32
    },
    {
        inp: `
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
        `,
        what: 'shiny gold',
        out: 126
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