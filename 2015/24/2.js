import Helpers from '../helpers.js';
import combinatorics from './combinatorics.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n').map(Number);

const sumOfArray = (arr) => arr.reduce((acc, n) => acc + n, 0);
const prodOfArray = (arr) => arr.reduce((acc, n) => acc * n, 1);

const calcSolution = (input, groups) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const packages = parsedInput.slice().reverse();
  const sum = sumOfArray(packages);
  const size = sum / groups;
  const max = packages.at(0);
  const minPkgs = Math.ceil(size / max);
  // console.log(sum, size, max, minPkgs);

  for (let i = minPkgs; i < packages.length; i++) {
    const possibleCombos = [];
    combinatorics.processCombinations(
      packages,
      function (combination) {
        if (sumOfArray(combination) === size) {
          // console.log(combination);
          possibleCombos.push(combination);
        }
      },
      i,
      i
    );

    if (possibleCombos.length) {
      const QEs = possibleCombos.map(prodOfArray);
      QEs.sort((a, b) => a - b);
      return QEs.at(0);
    }
  }

  // console.log(possibleCombos);

  return 0;
};

const tests = [
  {
    inp: `
1
2
3
4
5
7
8
9
10
11
`,
    out: 99,
    groups: 3,
  },
  {
    inp: `
1
2
3
4
5
7
8
9
10
11
`,
    out: 44,
    groups: 4,
  },
];

tests.forEach(({ inp, groups, out }) => {
  const res = calcSolution(inp, groups);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log('3 groups', calcSolution(input, 3));
console.log('4 groups', calcSolution(input, 4));
