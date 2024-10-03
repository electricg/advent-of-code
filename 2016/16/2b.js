// Not mine
// https://www.reddit.com/r/adventofcode/comments/5imh3d/comment/db9erfp/

import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input, disk) => {
  const parsedInput = parseInput(input);
  // The disk pattern is:
  // input, joiner, input reversed and negated, joiner, repeat
  const a = Array.from(parsedInput).map((c) => c === '1');
  const a_rev = a
    .slice()
    .reverse()
    .map((x) => !x);

  let joiners = [];
  while (joiners.length * (a.length + 1) < disk) {
    joiners = [
      ...joiners,
      false,
      ...joiners
        .slice()
        .reverse()
        .map((x) => !x),
    ];
  }

  // chunk_size: the largest power of 2 that divides disk.
  const chunk_size = disk & ~(disk - 1);
  const sum_size = disk / chunk_size;

  let buf = [];

  // each character in the final checksum
  // corresponds to `chunk_size` consecutive characters on disk.
  const result = Array.from({ length: sum_size }, () => {
    // Anything left in the buffer from last time?
    const take_from_buffer = Math.min(buf.length, chunk_size);
    let remaining = chunk_size - take_from_buffer;
    let ones = buf.splice(0, take_from_buffer).filter(Boolean).length;

    // How many full AJAJ groups will we have?
    const full_ajajs = Math.floor(remaining / ((a.length + 1) * 2));
    remaining = remaining % ((a.length + 1) * 2);
    // Count all the ones in the joiners.
    ones += joiners.splice(0, full_ajajs * 2).filter(Boolean).length;

    // The number of ones in a + a_rev... is obviously a.length.
    ones += a.length * full_ajajs;

    if (remaining > 0) {
      buf = buf.concat(a);
      buf.push(joiners.shift());
      buf = buf.concat(a_rev);
      buf.push(joiners.shift());
      ones += buf.splice(0, remaining).filter(Boolean).length;
    }

    return ones % 2 === 0 ? '1' : '0';
  }).join('');

  return result;
};

console.log(calcSolution(input, 272));
console.log(calcSolution(input, 35651584));
