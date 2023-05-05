import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const isReal = (input) => {
  const parsedInput = input.trim().split('-');
  const last = parsedInput.pop();
  const [_id, _checksum] = last.split('[');
  const id = parseInt(_id);
  const checksum = _checksum.replace(']', '');
  const letters = parsedInput.join('');
  // console.log(parsedInput, id, checksum);

  const res = Object.entries(
    letters.split('').reduce((acc, letter) => {
      if (acc[letter] === undefined) {
        acc[letter] = 0;
      }
      acc[letter]++;
      return acc;
    }, {})
  )
    .sort((a, b) => {
      const diff = b[1] - a[1];
      if (diff === 0) {
        if (a > b) {
          return 1;
        }
        return -1;
      }
      return diff;
    })
    .slice(0, 5)
    .map(([a]) => a)
    .join('');

  // console.log(res);
  return {
    valid: res === checksum,
    id,
    name: parsedInput,
  };
};

const alfa = 'abcdefghijklmnopqrstuvwxyz';
const len = alfa.length;

const getRealName = (input) => {
  const { id, name } = input;

  const res = name
    .map((word) => {
      return word
        .split('')
        .map((letter) => {
          return alfa[(alfa.indexOf(letter) + id) % len];
        })
        .join('');
    })
    .join(' ');

  return res;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const res = parsedInput
    .map((line) => isReal(line))
    .filter(({ valid }) => valid)
    .map((item) => {
      return { ...item, room: getRealName(item) };
    })
    .filter(({ room }) => room.indexOf('north') !== -1);
  // console.log(res);

  return res[0].id;
};

const tests = [
  {
    inp: 'aaaaa-bbb-z-y-x-123[abxyz]',
    out: true,
  },
  {
    inp: 'a-b-c-d-e-f-g-h-987[abcde]',
    out: true,
  },
  {
    inp: 'not-a-real-room-404[oarel]',
    out: true,
  },
  {
    inp: 'totally-real-room-200[decoy]',
    out: false,
  },
];

tests.forEach(({ inp, out }) => {
  const res = isReal(inp);
  if (res.valid === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

const tests2 = [
  {
    inp: {
      name: ['qzmt', 'zixmtkozy', 'ivhz'],
      id: 343,
    },
    out: 'very encrypted name',
  },
];

tests2.forEach(({ inp, out }) => {
  const res = getRealName(inp);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
