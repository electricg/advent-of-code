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
            arr[output] = input;

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

const res5 = intcode(input, 5);
console.log(res5);
