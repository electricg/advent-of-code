import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input, len) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const rows = [];
  rows.push(parsedInput);
  let counter = rows[0].split('').filter((c) => c === '.').length;

  for (let r = 1; r < len; r++) {
    const prev = rows[r - 1];
    let row = '';
    for (let t = 0; t < prev.length; t++) {
      const left = prev[t - 1] || '.';
      const center = prev[t];
      const right = prev[t + 1] || '.';
      let current = '.';
      if (
        (left === '^' && center === '^' && right !== '^') ||
        (left !== '^' && center === '^' && right === '^') ||
        (left === '^' && center !== '^' && right !== '^') ||
        (left !== '^' && center !== '^' && right === '^')
      ) {
        current = '^';
      } else {
        counter++;
      }

      row += current;
    }
    // console.log(row);
    rows.push(row);
  }

  return counter;
};

const tests = [
  {
    inp: '..^^.',
    len: 3,
    out: 6,
  },
  {
    inp: '.^^.^.^^^^',
    len: 10,
    out: 38,
  },
];

tests.forEach(({ inp, len, out }) => {
  const res = calcSolution(inp, len);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, 40));
