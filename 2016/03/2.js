import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n))
    );

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let res = 0;

  for (let i = 0; i < parsedInput.length - 2; i += 3) {
    for (let t = 0; t < 3; t++) {
      const a =
        parsedInput[i + 0][t] + parsedInput[i + 1][t] > parsedInput[i + 2][t];
      const b =
        parsedInput[i + 0][t] + parsedInput[i + 2][t] > parsedInput[i + 1][t];
      const c =
        parsedInput[i + 1][t] + parsedInput[i + 2][t] > parsedInput[i + 0][t];

      if (a && b && c) {
        res++;
      }
    }
  }

  return res;
};

const tests = [
  {
    inp: '',
    out: 0,
  },
];

tests.forEach(({ inp, out }) => {
  const res = calcSolution(inp);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
