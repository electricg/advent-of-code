import md5 from 'md5';
import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const calcSolution = input => {
    let i = 0;
    while(true) {
        const output = md5(`${input}${i}`);
        if (output.substr(0,5) === '00000') {
            return i;
        }
        i++;
    }
};

const tests = [
    {
        inp: 'abcdef',
        out: 609043
    },
    {
        inp: 'pqrstuv',
        out: 1048970
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