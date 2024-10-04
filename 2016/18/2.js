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
      const right = prev[t + 1] || '.';
      let current = '^';
      if (left === right) {
        current = '.';
        counter++;
      }

      row += current;
    }
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
  {
    inp: input,
    len: 40,
    out: 1987,
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

console.log(calcSolution(input, 400000));
