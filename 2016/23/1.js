import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input, start) => {
  const parsedInput = parseInput(input);
  console.log(parsedInput);

  return 0;
};

const tests = [
  {
    inp: `
cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a
`,
    start: {},
    out: 3,
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

console.log(calcSolution(input, { a: 7 }));
