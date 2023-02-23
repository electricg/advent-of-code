import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const getPriority = (a) => {
  const n = a.charCodeAt(0) - 96;
  if (n > 0) {
    return n;
  }
  return n + 58;
};

const splitHalf = (txt) => {
  const len = txt.length / 2;
  return [txt.slice(0, len), txt.slice(len)];
};

const findCommon = (a, b, c) => {
  const arr = [...a];
  for (let i = 0; i < arr.length; i++) {
    if (b.includes(arr[i]) && c.includes(arr[i])) {
      return arr[i];
    }
  }
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  let sum = 0;
  for (let i = 0; i < parsedInput.length; i += 3) {
    sum += getPriority(
      findCommon(parsedInput[i], parsedInput[i + 1], parsedInput[i + 2])
    );
  }
  return sum;
};

const tests = [
  {
    inp: `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`,
    out: 70,
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
