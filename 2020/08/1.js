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

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const len = parsedInput.length;
    let accumulator = 0;
    let i = 0;

    loop:
    while(i < len) {
        const current = parsedInput[i];
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

    return accumulator;
};

const tests = [
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
        out: 5
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

console.log(calcSolution(input));
