import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim() * 1;

const getHouses = (input) => {
  const houses = [];
  const max = input / 10;

  for (let elf = 1; elf < max; elf++) {
    let visits = 0;
    for (let current = elf; current < max; current += elf) {
      if (!houses[current]) {
        houses[current] = 0;
      }
      houses[current] += elf * 11;
      visits++;
      if (visits >= 50) {
        break;
      }
    }
  }
  return houses;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const houses = getHouses(parsedInput);

  for (let i = 0; i < houses.length; i++) {
    if (houses[i] >= parsedInput) {
      return i;
    }
  }

  return null;
};

const tests = [
  {
    inp: 1,
    out: 11,
  },
  {
    inp: 2,
    out: 33,
  },
  {
    inp: 3,
    out: 44,
  },
  {
    inp: 4,
    out: 77,
  },
  {
    inp: 5,
    out: 66,
  },
  {
    inp: 6,
    out: 132,
  },
  {
    inp: 7,
    out: 88,
  },
  {
    inp: 8,
    out: 165,
  },
  {
    inp: 9,
    out: 143,
  },
];

const test = getHouses(200);
tests.forEach(({ inp, out }) => {
  if (test[inp] === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
