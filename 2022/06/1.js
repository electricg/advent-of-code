import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const len = parsedInput.length;
  for (let i = 3; i < len; i++) {
    if (new Set(parsedInput.substring(i - 3, i + 1)).size === 4) {
      return i + 1;
    }
  }
};

const tests = [
  {
    inp: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
    out: 7,
  },
  {
    inp: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
    out: 5,
  },
  {
    inp: 'nppdvjthqldpwncqszvftbrmjlhg',
    out: 6,
  },
  {
    inp: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    out: 10,
  },
  {
    inp: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
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
