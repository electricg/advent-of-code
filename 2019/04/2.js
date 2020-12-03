import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileStringNumbers(fileName, import.meta.url, '-');

const isValid = password => {
    const digits = `${password}`.split('').map(i => parseInt(i, 10));
    const len = digits.length;

    let indicator = null;
    const groups = [];

    for (let i = 0; i < len; i++) {
        let current = digits[i];

        if (current > digits[i + 1]) {
            return false;
        }

        if (indicator !== current) {
            indicator = current;
            groups.push(`${current}`);
        }
        else {
            groups[groups.length - 1] = `${groups[groups.length - 1]}${current}`
        }
    }

    return !!groups.filter(string => string.length === 2).length;
};

const tests = [
    {
        inp: 112233,
        out: true
    },
    {
        inp: 123444,
        out: false
    },
    {
        inp: 111122,
        out: true
    }
];

tests.forEach(({ inp, out }) => {
    const res = isValid(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

let counter = 0;

for (let i = input[0]; i <= input[1]; i++) {
    if (isValid(i)) {
        counter++;
    }
}

console.log(counter);
