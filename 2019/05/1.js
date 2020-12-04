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

const intcode = (arr = [], input) => {
    let address = 0;
    let increase = 0;
    let diagnostic = [];

    loop:
    while(true) {
        const current = arr[address];
        const { opcode, mode1, mode2, mode3 } = getOpcode(current);

        if (opcode === 99) {
            break loop;
        }
        else if (opcode === 1 || opcode === 2) {
            const input1 = !mode1 ? arr[arr[address + 1]] : arr[address + 1];
            const input2 = !mode2 ? arr[arr[address + 2]] : arr[address + 2];
            const output = !mode3 ? arr[address + 3] : address + 3;

            arr[output] = op[opcode](input1, input2);

            increase = 4;
        }
        else if (opcode === 3) {
            const output = arr[address + 1];
            arr[output] = input;

            increase = 2;
        }
        else if (opcode === 4) {
            const output = arr[arr[address + 1]];
            diagnostic.push(output);

            increase = 2;
        }
        else {
            throw new Error(`❌ error: ${opcode}`);
        }

        address += increase;
    }

    return diagnostic.pop();
};

console.log(intcode(input, 1));
