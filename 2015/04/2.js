import md5 from 'md5';
import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const calcSolution = input => {
    let i = 0;
    while(true) {
        const output = md5(`${input}${i}`);
        if (output.substr(0,6) === '000000') {
            return i;
        }
        i++;
    }
};

console.log(calcSolution(input));