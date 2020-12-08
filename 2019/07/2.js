import events from 'events';

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

const myEmitter = new events.EventEmitter();

function c1() {
    console.log('an event occurred!');
 }
 
 function c2() {
    console.log('yet another event occurred!');
 }

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
            console.log('in', input);
            myEmitter.emit('eventOne');
            arr[output] = input.shift();

            increase = 2;
        }
        else if (opcode === 4) {
            console.log('out', param1);
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
    myEmitter.on('eventOne', c1);

    const res = parsedSequence.reduce((acc, n) => {
        key += n;
        if (!memo[key]) {
            memo[key] = amplifier(input, n, acc);
        }
        return memo[key];
    }, 0);
    // console.log(JSON.stringify(memo, null, 2));
    // console.log(res);

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
    const sequences = permute([5, 6, 7, 8, 9]);
    let memo = {};
    const signals = sequences.map(seq => calcSignal(input, seq, memo));

    return Math.max(...signals);
};

const tests = [
    {
        inp: '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5',
        sequence: '9,8,7,6,5',
        out: 139629729
    },
    // {
    //     inp: '3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10',
    //     sequence: '9,7,8,5,6',
    //     out: 18216
    // }
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

// const res = calcMaxSignal(input);
// console.log(res);
