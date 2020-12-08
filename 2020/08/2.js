import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => {
    const [operation, argument] = line.trim().split(' ');
    return {
        operation,
        argument: parseInt(argument, 10)
    };
});

const executeInstructions = input => {
    const parsedInput = Array.isArray(input) ? input : parseInput(input);
    // console.log(parsedInput);
    let accumulator = 0;
    let i = 0;
    let properlyTerminated = false;

    loop:
    while(true) {
        const current = parsedInput[i];
        if (!current) {
            properlyTerminated = true;
            break loop;
        }
        if (current.executed) {
            break loop;
        }
        current.executed = true;
        const { operation, argument } = current;
        if (operation === 'acc') {
            accumulator += argument;
            i++;
        }
        else if (operation === 'jmp') {
            i += argument;
        }
        else if (operation === 'nop') {
            i++;
        }
    }

    return { accumulator, properlyTerminated };
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const len = parsedInput.length;

    for (let i = 0; i < len; i++) {
        const { operation } = parsedInput[i];
        if (operation === 'jmp' || operation === 'nop') {
            const copy = Helpers.deepCopy(parsedInput);
            copy[i].operation = operation === 'nop' ? 'jmp' : 'nop';
            const { accumulator, properlyTerminated } = executeInstructions(copy);
            if (properlyTerminated) {
                return accumulator;
            }
        }
    }
};

const tests1 = [
    {
        inp: `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`,
        out: 5,
        properlyTerminated: false
    },
    {
        inp: `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6
`,
        out: 8,
        properlyTerminated: true
    }
];

const tests2 = [
    {
        inp: `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`,
        out: 8
    }
];

tests1.forEach(({ inp, out, properlyTerminated }) => {
    const res = executeInstructions(inp);
    if (res.accumulator === out && res.properlyTerminated === properlyTerminated) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

tests2.forEach(({ inp, out }) => {
    const res = calcSolution(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
