import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);
const input_test = Helpers.readFile('./input_test.txt', import.meta.url);

const parseInput = (input) =>
    input
        .trim()
        .split('\n\n')
        .reduce((acc, item) => {
            const [title, tile] = item.split(':\n');
            acc[title.replace('Tile ', '')] = tile;
            return acc;
        }, {});

const getBorders = (tile) => {
    const lines = tile.split('\n');
    const n = lines.at(0);
    const w = lines.map((line) => line.at(0)).join('');
    const e = lines.map((line) => line.at(-1)).join('');
    const s = lines.at(-1);
    return {
        n,
        s,
        w,
        e,
    };
};

const reverse = (string) => string.split('').reverse().join('');

const reverseAll = (tile) => ({
    n: reverse(tile.n),
    s: reverse(tile.s),
    w: reverse(tile.w),
    e: reverse(tile.e),
});

const compareTiles = (currentTile, otherTile, otherTileReversed) => {
    let isConnected = false;
    const dirs = Object.keys(currentTile);
    dirs.forEach((dir) => {
        dirs.forEach((otherDir) => {
            if (currentTile[dir] === otherTile[otherDir]) {
                // console.log(dir, otherDir);
                isConnected = true;
            }
            if (currentTile[dir] === otherTileReversed[otherDir]) {
                // console.log('reverse', dir, otherDir);
                isConnected = true;
            }
        });
    });

    return isConnected;
};

const calcSolution = (input) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    const tileKeys = Object.keys(parsedInput);
    const tiles = tileKeys.reduce(
        (acc, key) => {
            const borders = getBorders(parsedInput[key]);
            acc.normal[key] = borders;
            acc.reversed[key] = reverseAll(borders);
            return acc;
        },
        { normal: {}, reversed: {} }
    );

    const status = tileKeys.reduce((acc, key) => {
        const currentTile = tiles.normal[key];
        acc[key] = [];
        tileKeys.forEach((otherKey) => {
            if (key === otherKey) {
                return;
            }
            const otherTile = tiles.normal[otherKey];
            const otherTileReversed = tiles.reversed[otherKey];
            // console.log('current', key, 'other', otherKey);
            const isConnected = compareTiles(
                currentTile,
                otherTile,
                otherTileReversed
            );
            if (isConnected) {
                acc[key].push(otherKey);
            }
        });
        return acc;
    }, {});
    // console.log(status);

    return tileKeys.reduce((acc, key) => {
        // the property of the corners of the square is that they have only two common borders with the other tiles
        if (status[key].length == 2) {
            acc *= key;
        }
        return acc;
    }, 1);
};

const tests = [
    {
        inp: input_test,
        out: 20899048083289,
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
