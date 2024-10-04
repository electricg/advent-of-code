import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => Number(input.trim());

// https://www.youtube.com/watch?v=uCsD3ZGzMgE
const calcSolutionFast = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  // convert to binary
  const binary = parsedInput.toString(2);
  // move first digit to the end
  const moved = binary.slice(1) + binary[0];
  // convert back to decimal
  const res = parseInt(moved, 2);

  return res;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let arr = [];
  for (let i = 0; i < parsedInput; i++) {
    arr.push(i + 1);
  }

  while (arr.length > 1) {
    // console.log(arr);
    for (let i = 0; i < arr.length; i += 2) {
      delete arr[i + 1];
    }
    if (arr.at(-1)) {
      delete arr[0];
    }
    arr = arr.filter(Boolean);
  }

  // console.log(arr);
  const res = arr[0];
  return res;
};

const tests = [
  {
    inp: '5',
    out: 3,
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

console.log(calcSolutionFast(input));
console.log(calcSolution(input));
