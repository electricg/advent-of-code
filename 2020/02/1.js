import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLines(fileName, import.meta.url);

const inputFormatted = input.map(line => {
    const blocks = line.split(' ');
    const [min, max] = blocks[0].split('-');
    const password = blocks[2];
    const letter = blocks[1].replace(':', '');

    return {
        min: parseInt(min, 10),
        max: parseInt(max, 10),
        password,
        letter
    };
});

const isValid = ({ min, max, password, letter }) => {
    const count = password.split('').reduce((acc, item) => {
        if (item === letter) {
            acc++;
        }
        return acc;
    }, 0);

    return min <= count && count <= max;
};

const validPasswords = inputFormatted.filter(isValid);

console.log(validPasswords.length);