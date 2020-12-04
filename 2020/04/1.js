import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const mandatoryFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const len = mandatoryFields.length;

const parsePassport = input => input.trim().split(/\s/).reduce((acc, item) => {
    const [key, value] = item.split(':');
    acc[key] = value;
    return acc;
}, {});

const isValid = passport => {
    for (let i = 0; i < len; i++) {
        if(!passport[mandatoryFields[i]]) {
            return false;
        }
    }
    return true;
};

const parseBatch = input => input.split('\n\n').map(parsePassport);

const validatePassports = parseBatch(input).filter(isValid);

console.log(validatePassports.length);
