import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((elf) => elf.split('\n').map((cal) => cal * 1));

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const arr = parsedInput.map((elf) => Helpers.sumArray(elf));
  return Math.max(...arr);
};

const tests = [
  {
    inp: `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`,
    out: 24000,
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
