import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
  return input
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      if (line) {
        const [key, val] = line.split(': ');
        acc[key.trim()] = val.trim() * 1;
      }
      return acc;
    }, {});
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const boss = {
    points: parsedInput['Hit Points'],
    damage: parsedInput['Damage'],
  };
  const me = {
    points: 50,
    mana: 500,
  };
  console.log(boss, me);
};

const spells = [
  {
    name: 'Magic Missile',
    cost: 53,
    damage: 4,
    armor: 0,
    heal: 0,
    mana: 0,
    duration: 1,
  },
  {
    name: 'Drain',
    cost: 73,
    damage: 2,
    armor: 0,
    heal: 2,
    mana: 0,
    duration: 1,
  },
  {
    name: 'Shield',
    cost: 113,
    damage: 0,
    armor: 7,
    heal: 0,
    mana: 0,
    duration: 6,
  },
  {
    name: 'Poison',
    cost: 173,
    damage: 3,
    armor: 0,
    heal: 0,
    mana: 0,
    duration: 6,
  },
  {
    name: 'Recharge',
    cost: 229,
    damage: 0,
    armor: 0,
    heal: 0,
    mana: 101,
    duration: 5,
  },
];

console.log(calcSolution(input));
