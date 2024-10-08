import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => Number(line.trim()));

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let frequency = 0;

  parsedInput.forEach((n) => {
    frequency += n;
  });

  return frequency;
};

const tests = [
  {
    inp: '+1, -2, +3, +1',
    out: 3,
  },
  {
    inp: '+1, +1, +1',
    out: 3,
  },
  {
    inp: '+1, +1, -2',
    out: 0,
  },
  {
    inp: '-1, -2, -3',
    out: -6,
  },
];

tests.forEach(({ inp, out }) => {
  const inp2 = inp.replace(/, /g, '\n');
  const res = calcSolution(inp2);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
