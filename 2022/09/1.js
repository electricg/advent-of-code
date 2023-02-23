import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [dir, n] = line.split(' ');
      return [dir, n * 1];
    });

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  console.log(parsedInput);
  return parsedInput;
};

const tests = [
  {
    inp: `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`,
    out: 13,
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

// console.log(calcSolution(input));
