import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const nth = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
};

const parseStart = (lines) => {
  const res = [];
  lines.forEach((line) => {
    const [floor, what] = line.split(' contains ');
    const n = nth[floor.split(' ')[1]];
    const items = what.trim().replace(' and', ',').split(', ');
    console.log(n, items);
  });

  return res;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const start = parseStart(parsedInput);
  // console.log(start);
  // return start;
};

const tests = [
  {
    inp: `
The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`,
    out: 11,
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
