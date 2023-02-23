import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(','))
    .map((line) => line.map((item) => item.split('-').map((i) => i * 1)));

const checkContained = ([a, b]) => {
  const [Astart, Aend] = a;
  const [Bstart, Bend] = b;

  if (
    (Astart <= Bend && Aend >= Bstart) ||
    (Bstart <= Aend && Bend >= Astart)
  ) {
    return true;
  }
  return false;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  return parsedInput.filter(checkContained).length;
};

const tests = [
  {
    inp: `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`,
    out: 4,
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
