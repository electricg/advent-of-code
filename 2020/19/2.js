import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
    const [rules, messages] = input.trim().split('\n\n');
    const parsedRules = rules.split('\n').reduce((acc, line) => {
        let [key, rule] = line.split(/\s*:\s*/);
        if (rule.indexOf('"') !== -1) {
            rule = rule.replace(/"/g, '');
        }
        acc[key] = rule;
        return acc;
    }, {});
    return {
        rules: parsedRules,
        messages: messages.split('\n'),
    };
};

const createRegExp = (string, data) => {
    while (/\d/.test(string)) {
        string = string.replace(/\d+/g, (match) => `(${data[match]})`);
    }
    return new RegExp(`^${string.replace(/ /g, '')}$`);
};

const calcSolution = (input) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const { rules, messages } = parsedInput;
    // rules['8'] = '42 | 42 8';
    rules[8] = '42+';
    // rules['11'] = '42 31 | 42 11 31';
    rules[11] =
        '42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31';
    const x = createRegExp(rules[0], rules);
    return messages.filter((m) => x.test(m)).length;
};

const tests = [
    {
        inp: `
0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb
`,
        out: 2,
    },
];

tests.forEach(({ inp, out }) => {
    const res = calcSolution(inp);
    if (res === out) {
        console.log(`✅`);
    } else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
