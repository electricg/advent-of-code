import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const decompress = (input) => {
  let count = 0;
  while (true) {
    const openPar = input.indexOf('(');
    if (openPar === -1) {
      count += input.length;
      return count;
    }

    count += input.slice(0, openPar).length;
    input = input.slice(openPar);
    // console.log(input, count);

    const closedPar = input.indexOf(')');
    if (closedPar === -1) {
      count += input.length;
      return count;
    }

    const marker = input.slice(openPar, closedPar).replace('(', '');
    const markers = marker.split('x').map((n) => parseInt(n));
    input = input.slice(closedPar + 1);
    // console.log(marker, markers, input, count);
    const toRepeat = input.slice(0, markers[0]);
    const toRepeat2 = decompress(toRepeat);
    const repeated = markers[1] * toRepeat2;
    count += repeated;
    input = input.slice(markers[0]);
    // console.log(input, count);
  }
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  return decompress(parsedInput);
};

const tests = [
  {
    inp: 'ADVENT',
    out: 'ADVENT'.length,
  },
  {
    inp: 'A(1x5)BC',
    out: 'ABBBBBC'.length,
  },
  {
    inp: '(3x3)XYZ',
    out: 'XYZXYZXYZ'.length,
  },
  {
    inp: 'A(2x2)BCD(2x2)EFG',
    out: 'ABCBCDEFEFG'.length,
  },
  {
    inp: 'X(8x2)(3x3)ABCY',
    out: 'XABCABCABCABCABCABCY'.length,
  },
  {
    inp: '(27x12)(20x12)(13x14)(7x10)(1x12)A',
    out: 241920,
  },
  {
    inp: '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN',
    out: 445,
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
