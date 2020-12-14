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
        value = parseInt(value, 10)
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
            res += 'X';
        }
        else if (mask[i] === '0') {
            res += value[i];
        }
        else {
            res += '1';
        }
    }
    return res;
};

const run = (len) => {
    const chars = ['0', '1'];
    let newArr = [];
    if (len === 1) {
        for (let i = 0; i < chars.length; i++) {
            newArr.push(chars[i]);
        }
    }
    if (len > 1) {
        const arr = run(--len);
        for (let i = 0; i < chars.length; i++) {
            for (let a = 0; a < arr.length; a++) {
                newArr.push(chars[i] + arr[a]);
            }
        }
    }
    return newArr;
};

const getAllMemFromBin = memBin => {
    const len = memBin.split('').filter(c => c === 'X').length;
    const arr = run(len);
    return arr.map(string => {
        let newMemBin = memBin;
        const newVals = string.split('');
        for (let i = 0; i < newVals.length; i++) {
            newMemBin = newMemBin.replace('X', newVals[i]);
        }
        return newMemBin;
    });
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const storage = {}; // needs to be an object otherwise the array is too big
    let currentMask = '';

    parsedInput.forEach(({ type, value, mem }) => {
        if (type === 'mask') {
            currentMask = value;
        }
        else {
            const memBin = Helpers.dec2bin(mem).padStart(36, '0');
            const memBinMasked = maskIt(memBin, currentMask);
            const allMem = getAllMemFromBin(memBinMasked);
            allMem.forEach(item => {
                storage[Helpers.bin2dec(item)] = value;
            });
        }
    });

    const sum = Object.keys(storage).reduce((acc, key) => {
        return acc += storage[key];
    }, 0);
    return sum;
};

const tests = [
    {
        inp: `
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1
`,
        out: 208
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
        mask: '000000000000000000000000000000X1001X',
        value: '000000000000000000000000000000101010',
        out: '000000000000000000000000000000X1101X'
    },
    {
        mask: '00000000000000000000000000000000X0XX',
        value: '000000000000000000000000000000011010',
        out: '00000000000000000000000000000001X0XX'
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
