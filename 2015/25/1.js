import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
  const regex = /(\d+)[,a-zA-Z ]+(\d+)/g;
  const matches = regex.exec(input);
  return {
    row: Number(matches[1]),
    column: Number(matches[2]),
  };
};

const calcSolution = (input, fx, start) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const { row, column } = parsedInput;

  let code = start;
  let x = 1;
  let y = 1;
  while (x !== row || y !== column) {
    code = fx(code);

    if (x === 1) {
      x = y + 1;
      y = 1;
    } else {
      y++;
      x--;
    }
  }

  return code;
};

const tests = [
  {
    inp: 'row 4, column 2',
    fx: (code) => (code += 1),
    start: 1,
    out: 12,
  },
  {
    inp: 'row 1, column 5',
    fx: (code) => (code += 1),
    start: 1,
    out: 15,
  },
];

tests.forEach(({ inp, fx, start, out }) => {
  const res = calcSolution(inp, fx, start);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(
  calcSolution(input, (code) => (code * 252533) % 33554393, 20151125)
);
