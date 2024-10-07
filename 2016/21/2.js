import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.trim().split(' '));

const calcSolution = (input, start) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let password = start;

  parsedInput.reverse().forEach((line) => {
    const [op1, op2] = line;

    if (op1 === 'swap' && op2 === 'position') {
      const X = password[Number(line[2])];
      const Y = password[Number(line.at(-1))];
      password = password.replace(X, '_').replace(Y, X).replace('_', Y);
    } else if (op1 === 'swap' && op2 === 'letter') {
      const X = line[2];
      const Y = line.at(-1);
      password = password.replace(X, '_').replace(Y, X).replace('_', Y);
    } else if (op1 === 'rotate' && op2 === 'right') {
      const X = Number(line[2]);
      password = password.slice(X) + password.slice(0, X);
    } else if (op1 === 'rotate' && op2 === 'left') {
      const X = -1 * Number(line[2]);
      password = password.slice(X) + password.slice(0, X);
    } else if (op1 === 'rotate' && op2 === 'based') {
      const X = password.indexOf(line.at(-1));
      // pos shift newpos
      //   0     1      1
      //   1     2      3
      //   2     3      5
      //   3     4      7
      //   4     6      2
      //   5     7      4
      //   6     8      6
      //   7     9      0
      // all odds have a clear pattern, all evens have a clear pattern
      // except 0, which we'll just special-case.
      const rot = X / 2 + (X % 2 === 1 || X === 0 ? 1 : 5);
      password = password.slice(rot) + password.slice(0, rot);
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
      const el = password.splice(Y, 1);
      password.splice(X, 0, el[0]);
      password = password.join('');
    }
  });

  return password;
};

const tests = [
  {
    inp: 'swap position 4 with position 0',
    out: 'abcde',
    start: 'ebcda',
  },
  { inp: 'swap letter d with letter b', out: 'ebcda', start: 'edcba' },
  {
    inp: 'reverse positions 0 through 4',
    out: 'edcba',
    start: 'abcde',
  },
  {
    inp: 'rotate left 1 step',
    out: 'abcde',
    start: 'bcdea',
  },
  { inp: 'move position 1 to position 4', out: 'bcdea', start: 'bdeac' },
  { inp: 'move position 3 to position 0', out: 'bdeac', start: 'abdec' },
  { inp: 'rotate based on position of letter b', out: 'abdec', start: 'ecabd' },
  { inp: 'rotate based on position of letter d', out: 'ecabd', start: 'decab' },
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
    out: 'abcde',
    start: 'decab',
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

console.log(calcSolution(input, 'fbgdceah'));
