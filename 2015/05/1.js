import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLines(fileName, import.meta.url);

const calcProp2 = (input = []) => {
    const len = input.length - 1;
    for (let i = 0; i < len; i++) {
        if (input[i] === input[i + 1]) {
            return true;
        }
    }
    return false;
};

const isNice = string => {
    const arr = string.split('');
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const noStrings = ['ab', 'cd', 'pq', 'xy'];
    const hasProp1 = arr.filter(c => vowels.indexOf(c) !== -1).length >= 3;
    const hasProp2 = calcProp2(arr);
    const hasProp3 = noStrings.filter(c => string.indexOf(c) !== -1).length === 0;

    return hasProp1 && hasProp2 && hasProp3;
};

const calcSolution = (input = []) => input.filter(isNice).length;

const tests = [
    {
        inp: 'ugknbfddgicrmopn',
        out: true
    },
    {
        inp: 'aaa',
        out: true
    },
    {
        inp: 'jchzalrnumimnmhp',
        out: false
    },
    {
        inp: 'haegwjzuvuyypxyu',
        out: false
    },
    {
        inp: 'dvszwmarrgswjxmb',
        out: false
    }
];

tests.forEach(({ inp, out }) => {
    const res = isNice(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));