import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLines(fileName, import.meta.url);

const inputFormatted = input.map(line => {
    const blocks = line.split(' ');
    const [pos1, pos2] = blocks[0].split('-');
    const password = blocks[2];
    const letter = blocks[1].replace(':', '');

    return {
        pos1: parseInt(pos1, 10),
        pos2: parseInt(pos2, 10),
        password,
        letter
    };
});

const isValid = ({ pos1, pos2, password, letter }) => {
    const isPos1Valid = password[pos1 - 1] === letter;
    const isPos2Valid = password[pos2 - 1] === letter;

    return isPos1Valid ^ isPos2Valid;
};

const validPasswords = inputFormatted.filter(isValid);

console.log(validPasswords.length);
