import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  console.log(parsedInput);

  return 0;
};

const tests = [
  {
    inp: `
###########
#0.1.....2#
#.#######.#
#4.......3#
###########
`,
    out: 14,
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
