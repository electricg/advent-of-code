import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => {
    const parts = line.split(/\s*=\s*/);
    let value = parts[1];
    let type;
    let mem;
    if (parts[0] === 'mask') {
        type = 'mask';
    }
    else {
        type = 'mem';
        mem = parseInt(parts[0].replace('mem[', '').replace(']', ''), 10);
        value = Helpers.dec2bin(value).padStart(36, '0');
    }
    return {
        type,
        value,
        ...mem && { mem }
    };
});

const maskIt = (value, mask) => {
    const len = value.length;
    let res = '';
    for (let i = 0; i < len; i++) {
        if (mask[i] === 'X') {
            res += value[i];
        }
        else {
            res += mask[i];
        }
    }
    return res;
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const storage = [];
    let currentMask = '';
    parsedInput.forEach(({ type, value, mem }) => {
        if (type === 'mask') {
            currentMask = value;
        }
        else {
            storage[mem] = maskIt(value, currentMask);
        }
    });
    const sum = storage.reduce((acc, value) => {
        const dec = value ? Helpers.bin2dec(value) : 0;
        return acc += dec;
    }, 0);
    return sum;
};

const tests = [
    {
        inp: `
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0
`,
        out: 165
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

const tests2 = [
    {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
        value: '000000000000000000000000000000001011',
        out: '000000000000000000000000000001001001'
    },
    {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
        value: '000000000000000000000000000001100101',
        out: '000000000000000000000000000001100101'
    },
    {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
        value: '000000000000000000000000000000000000',
        out: '000000000000000000000000000001000000'
    }
];

tests2.forEach(({ mask, value, out }) => {
    const res = maskIt(value, mask);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
