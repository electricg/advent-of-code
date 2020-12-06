import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileStringNumbers(fileName, import.meta.url);

const op = {
    1: (a, b) => a + b,
    2: (a, b) => a * b
};

const getOpcode = value => {
    const padded = (`0000${value}`).substr(-5,5);
    const mode3 = parseInt(padded[0], 10);
    const mode2 = parseInt(padded[1], 10);
    const mode1 = parseInt(padded[2], 10);
    const opcode = parseInt(`${padded[3]}${padded[4]}`, 10);

    return {
        opcode, mode1, mode2, mode3
    };
};

const intcode = (arr = [], input = []) => {
    const len = arr.length;
    let address = 0;
    let increase = 0;
    let diagnostic = [];

    loop:
    while(address < len) {
        const current = arr[address];
        const { opcode, mode1, mode2, mode3 } = getOpcode(current);

        const param1 = !mode1 ? arr[arr[address + 1]] : arr[address + 1];
        const param2 = !mode2 ? arr[arr[address + 2]] : arr[address + 2];
        const param3 = !mode3 ? arr[address + 3] : address + 3;

        if (opcode === 99) {
            break loop;
        }
        else if (opcode === 1 || opcode === 2) {
            arr[param3] = op[opcode](param1, param2);

            increase = 4;
        }
        else if (opcode === 3) {
            const output = arr[address + 1];
            arr[output] = input.shift();

            increase = 2;
        }
        else if (opcode === 4) {
            diagnostic.push(param1);

            increase = 2;
        }
        else if (opcode === 5) {
            if (param1 !== 0) {
                increase = 0;
                address = param2;
            }
            else {
                increase = 3;
            }
        }
        else if (opcode === 6) {
            if (param1 === 0) {
                increase = 0;
                address = param2;
            }
            else {
                increase = 3;
            }
        }
        else if (opcode === 7) {
            if (param1 < param2) {
                arr[param3] = 1;
            }
            else {
                arr[param3] = 0;
            }

            increase = 4;
        }
        else if (opcode === 8) {
            if (param1 === param2) {
                arr[param3] = 1;
            }
            else {
                arr[param3] = 0;
            }

            increase = 4;
        }
        else {
            throw new Error(`❌ opcode: ${current}`);
        }

        address += increase;
    }

    return diagnostic.pop();
};

const amplifier = (input, instruction1 = 0, instruction2 = 0) => intcode([...input], [instruction1, instruction2]);

const calcSignal = (input = [], sequence, memo = {}) => {
    const parsedSequence = Array.isArray(sequence) ? sequence : Helpers.readStringNumbers(sequence);
    let key = '';

    const res = parsedSequence.reduce((acc, n) => {
        key += n;
        if (!memo[key]) {
            memo[key] = amplifier(input, n, acc);
        }
        return memo[key];
    }, 0);
    // console.log(JSON.stringify(memo, null, 2));

    return res;
};

const permute = permutation => {
    const length = permutation.length;
    let result = [permutation.slice()];
    let c = new Array(length).fill(0);
    let i = 1;
    let k;
    let p;
  
    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

const calcMaxSignal = (input = []) => {
    const sequences = permute([0, 1, 2, 3 ,4]);
    let memo = {};
    const signals = sequences.map(seq => calcSignal(input, seq, memo));

    return Math.max(...signals);
};

const tests = [
    {
        inp: '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0',
        sequence: '4,3,2,1,0',
        out: 43210
    },
    {
        inp: '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0',
        sequence: '0,1,2,3,4',
        out: 54321
    },
    {
        inp: '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0',
        sequence: '1,0,4,3,2',
        out: 65210
    }
];

tests.forEach(({ inp, sequence, out }) => {
    const res = calcSignal(Helpers.readStringNumbers(inp), sequence);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

const res = calcMaxSignal(input);
console.log(res);
