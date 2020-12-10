import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim();

const checkReq1 = password => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const len = password.length - 2;
    for (let i = 0; i < len; i++) {
        const find = alphabet.indexOf(password[i]);
        if (`${password[i+1]}${password[i+2]}` === `${alphabet[find+1]}${alphabet[find+2]}`) {
            return true;
        }
    }
    return false;
};

const checkReq2 = password => {
    const invalidChars = 'iol';
    const len = invalidChars.length;
    for (let i = 0; i < len; i++) {
        if (password.indexOf(invalidChars[i]) !== -1) {
            return false;
        }
    }
    return true;
};

const checkReq3 = password => {
    const regex = /([a-z])\1{1}/g;
    const matches = new Set(password.match(regex));
    return matches.size >= 2;
};

const checkReqs = password => checkReq1(password) && checkReq2(password) && checkReq3(password);

const incrementPassword = password => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetLen = alphabet.length;
    const a = password.split('').reverse().reduce((acc, char) => {
        if (acc.increment === 0) {
            acc.newPassword.push(char);
            return acc;
        }
        let find = alphabet.indexOf(char);
        find += acc.increment;
        if (find >= alphabetLen) {
            find = find % alphabetLen;
            acc.increment = 1;
        }
        else {
            acc.increment = 0;
        }
        acc.newPassword.push(alphabet[find]);
        return acc;

    }, { newPassword: [], increment: 1 });
    return a.newPassword.reverse().join('');
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    let newPassword = parsedInput;
    do {
        newPassword = incrementPassword(newPassword);
    } while (!checkReqs(newPassword));
    return newPassword;
};

const tests = [
    {
        inp: 'abcdefgh',
        out: 'abcdffaa'
    },
    {
        inp: 'ghijklmn',
        out: 'ghjaabcc'
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

console.log(calcSolution(calcSolution(input)));