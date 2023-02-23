import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim() * 1;

const getHouses = (input) => {
  const houses = [];
  const max = input / 10;

  for (let elf = 1; elf < max; elf++) {
    for (let current = elf; current < max; current += elf) {
      if (!houses[current]) {
        houses[current] = 0;
      }
      houses[current] += elf * 10;
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
    out: 10,
  },
  {
    inp: 2,
    out: 30,
  },
  {
    inp: 3,
    out: 40,
  },
  {
    inp: 4,
    out: 70,
  },
  {
    inp: 5,
    out: 60,
  },
  {
    inp: 6,
    out: 120,
  },
  {
    inp: 7,
    out: 80,
  },
  {
    inp: 8,
    out: 150,
  },
  {
    inp: 9,
    out: 130,
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
