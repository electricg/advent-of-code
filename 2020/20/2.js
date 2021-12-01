import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);
const input_test = Helpers.readFile('./input_test.txt', import.meta.url);

const parseInput = input => input.trim().split('\n\n').reduce((acc, item) => {
    const [title, tile] = item.split(':\n');
    acc[title.replace('Tile ', '')] = tile;
    return acc;
}, {});

const getBorders = tile => {
    const lines = tile.split('\n');
    const len = lines.length;
    const n = lines[0];
    const lineLen = n.length - 1;
    const w = lines.map(line => line[0]).join('');
    const e = lines.map(line => line[lineLen]).join('');
    return {
        n,
        s: lines[len - 1],
        w,
        e
    };
};

const reverse = string => string.split('').reverse().join('');

const flipNS = tile => (
    {
        n: tile.s,
        s: tile.n,
        w: reverse(tile.w),
        e: reverse(tile.e),
    }
);

const flipWE = tile => (
    {
        n: reverse(tile.n),
        s: reverse(tile.s),
        w: tile.e,
        e: tile.w,
    }
);
/**
 * Rotate 90deg clockwise
 */
const rotate = tile => (
    {
        n: reverse(tile.w),
        s: reverse(tile.e),
        w: tile.s,
        e: tile.n,
    }
);

const reverseAll = tile => (
    {
        n: reverse(tile.n),
        s: reverse(tile.s),
        w: reverse(tile.w),
        e: reverse(tile.e),
    }
);

const compareTiles = (currentTile, otherTile) => {
    let isConnected = false;
    const dirs = Object.keys(currentTile);
    const reverseOtherTile = reverseAll(otherTile);
    dirs.forEach(dir => {
        dirs.forEach(otherDir => {
            if (currentTile[dir] === otherTile[otherDir]) {
                // console.log(dir, otherDir);
                isConnected = {
                    from: dir,
                    to: otherDir,
                    type: 'normal',
                };
            }
            if (currentTile[dir] === reverseOtherTile[otherDir]) {
                // console.log('reverse', dir, otherDir);
                isConnected = {
                    from: dir,
                    to: otherDir,
                    type: 'reverse',
                };
            }
        });
    });

    return isConnected;
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const tileKeys = Object.keys(parsedInput);
    const tiles = tileKeys.reduce((acc, key) => {
        acc[key] = getBorders(parsedInput[key]);
        return acc;
    }, {});
    const status = tileKeys.reduce((acc, key) => {
        const currentTile = tiles[key];
        acc[key] = [];
        tileKeys.forEach(otherKey => {
            if (key === otherKey) {
                return;
            }
            const otherTile = tiles[otherKey];
            // console.log('current', key, 'other', otherKey);
            const isConnected = compareTiles(currentTile, otherTile);
            if (isConnected) {
                acc[key].push({ [otherKey]: isConnected });
            }
        });
        return acc;
    }, {});
    // console.log(JSON.stringify(status, null, 2));
    return Object.keys(status).reduce((acc, key) => {
        // the property of the corners of the square is that they have only two common borders with the other tiles
        if (status[key].length == 2) {
            acc *= key;
            console.log(key, status[key]);
        }
        return acc;
    }, 1);
};

const tests = [
    {
        inp: input_test,
        out: 20899048083289
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcSolution(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

// console.log(calcSolution(input));
