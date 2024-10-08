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

  const len = parsedInput.length;
  let frequency = 0;
  let counter = 0;
  const seen = {
    0: 1,
  };

  while (true) {
    const i = counter % len;
    const n = parsedInput[i];
    frequency += n;
    if (seen[frequency]) {
      return frequency;
    }
    seen[frequency] = 1;
    counter++;
  }
};

const tests = [
  {
    inp: '+1, -2, +3, +1',
    out: 2,
  },
  {
    inp: '+1, -1',
    out: 0,
  },
  {
    inp: '+3, +3, +4, -2, -4',
    out: 10,
  },
  {
    inp: '-6, +3, +8, +5, -6',
    out: 5,
  },
  {
    inp: '+7, +7, -2, -7, -4',
    out: 14,
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
