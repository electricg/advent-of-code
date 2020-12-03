import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLines(fileName, import.meta.url);

const inputFormatted = input.map(line => line.split(''));

const countTrees = (right, down) => {
    let row = 1;
    let col = 1;
    let trees = 0;
    const rowLen = inputFormatted.length;
    const colLen = inputFormatted[0].length;

    for (let r = 0; r < rowLen - 1; r += down) {
        row += down;
        col += right;
        if (col > colLen) {
            col = col % colLen;
        }
        if (inputFormatted[row - 1][col - 1] === '#') {
            trees++;
        }
    }

    return trees;
}

const a = countTrees(1, 1);
const b = countTrees(3, 1);
const c = countTrees(5, 1);
const d = countTrees(7, 1);
const e = countTrees(1, 2);

console.log(a, b, c, d, e, a * b * c * d * e);
