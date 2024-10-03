import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const generateDragonCurve = (input) => {
  const a = input;
  let b = a;
  b = b.split('').reverse().join('');
  b = b.replace(/0/g, '_').replace(/1/g, '0').replace(/_/g, '1');
  return a + '0' + b;
};

const generateChecksum = (input) => {
  let checksum = '';

  for (let i = 0; i < input.length; i += 2) {
    if (input[i] === input[i + 1]) {
      checksum += '1';
    } else {
      checksum += '0';
    }
  }

  return checksum;
};

const calcSolution = (input, len) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let data = parsedInput;
  while (data.length < len) {
    data = generateDragonCurve(data);
  }
  data = data.slice(0, len);
  // console.log('data', data);

  let checksum = data;
  do {
    checksum = generateChecksum(checksum);
  } while (checksum.length % 2 === 0);
  // console.log('checksum', checksum);

  return checksum;
};

const tests = [
  {
    inp: '10000',
    len: 20,
    out: '01100',
  },
];

tests.forEach(({ inp, len, out }) => {
  const res = calcSolution(inp, len);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, 272));
