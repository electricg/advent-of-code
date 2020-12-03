import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileStringNumbers(fileName, import.meta.url, '-');

const isValid = password => {
    const digits = `${password}`.split('').map(i => parseInt(i, 10));
    const len = digits.length - 1;
    let adjacent = false;

    for (let i = 0; i < len; i++) {
        if (digits[i] > digits[i + 1]) {
            return false;
        }
        if (digits[i] === digits[i + 1]) {
            adjacent = true;
        }
    }

    return adjacent;
};

const tests = [
    {
        inp: 111111,
        out: true
    },
    {
        inp: 223450,
        out: false
    },
    {
        inp: 123789,
        out: false
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
