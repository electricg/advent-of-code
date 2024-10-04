import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => Number(input.trim());

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  // https://www.reddit.com/r/adventofcode/comments/5j4lp1/comment/dbdhfsp/
  const target = parsedInput;
  const pow = Math.pow(3, target.toString(3).length - 1);
  if (pow === target) {
    return pow;
  } else if (pow >= target / 2) {
    return target - pow;
  } else {
    return pow + 2 * (target - 2 * pow);
  }
};

const tests = [
  {
    inp: '5',
    out: 2,
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
