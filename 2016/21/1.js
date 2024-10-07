import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' '));

const calcSolution = (input, start) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let password = start;

  parsedInput.forEach((line) => {
    const [op1, op2] = line;

    if (op1 === 'swap' && op2 === 'position') {
      const X = password[Number(line[2])];
      const Y = password[Number(line.at(-1))];
      password = password.replace(X, '_').replace(Y, X).replace('_', Y);
    } else if (op1 === 'swap' && op2 === 'letter') {
      const X = line[2];
      const Y = line.at(-1);
      password = password.replace(X, '_').replace(Y, X).replace('_', Y);
    } else if (op1 === 'rotate' && op2 === 'left') {
      const X = Number(line[2]);
      password = password.slice(X) + password.slice(0, X);
    } else if (op1 === 'rotate' && op2 === 'right') {
      const X = -1 * Number(line[2]);
      password = password.slice(X) + password.slice(0, X);
    } else if (op1 === 'rotate' && op2 === 'based') {
      const X = -1 * password.indexOf(line.at(-1));
      password = password.slice(X) + password.slice(0, X);
      password = password.slice(-1) + password.slice(0, -1);
      if (X <= -4) {
        password = password.slice(-1) + password.slice(0, -1);
      }
    } else if (op1 === 'reverse') {
      const X = Number(line[2]);
      const Y = Number(line.at(-1));
      password = password.split('');
      password = password.slice(0, X).concat(
        password
          .slice(X, Y + 1)
          .reverse()
          .concat(password.slice(Y + 1))
      );
      password = password.join('');
    } else if (op1 === 'move') {
      const X = Number(line[2]);
      const Y = Number(line.at(-1));
      password = password.split('');
      const el = password.splice(X, 1);
      password.splice(Y, 0, el[0]);
      password = password.join('');
    }
  });

  return password;
};

const tests = [
  {
    inp: 'swap position 4 with position 0',
    start: 'abcde',
    out: 'ebcda',
  },
  { inp: 'swap letter d with letter b', start: 'ebcda', out: 'edcba' },
  {
    inp: 'reverse positions 0 through 4',
    start: 'edcba',
    out: 'abcde',
  },
  {
    inp: 'rotate left 1 step',
    start: 'abcde',
    out: 'bcdea',
  },
  { inp: 'move position 1 to position 4', start: 'bcdea', out: 'bdeac' },
  { inp: 'move position 3 to position 0', start: 'bdeac', out: 'abdec' },
  { inp: 'rotate based on position of letter b', start: 'abdec', out: 'ecabd' },
  { inp: 'rotate based on position of letter d', start: 'ecabd', out: 'decab' },
  {
    inp: `
swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d
  `,
    start: 'abcde',
    out: 'decab',
  },
];

tests.forEach(({ inp, start, out }) => {
  const res = calcSolution(inp, start);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, 'abcdefgh'));
