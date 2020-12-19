import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n');

const print = (input = []) => {
    console.log(input.join('\n'));
};

const printMap = map => {
    let keys = [];
    for (const key of map.keys()) {
        keys.push(key);
    }
    keys.sort(Helpers.compareNumbers);
    keys.forEach(key => {
        console.log(key);
        print(map.get(key));
    });
};

const preparePhase0 = input => {
    const map = new Map();
    map.set(0, input);
    return map;
};

const addEmptyLayers = map => {
    const zero = map.get(0);
    const sizeXY = zero.length;
    const sizeZ = map.size;
    const nextZ = Math.floor(sizeZ / 2) + 1;
    const nextXY = sizeXY + 2;
    const emptyString = Array(nextXY).fill('.').join('');
    for (let [key, value] of map) {
        value = value.map(line => `.${line}.`);
        value.unshift(emptyString);
        value.push(emptyString);
        map.set(key, value);
    }
    for (let i of [nextZ, nextZ * -1]) {
        const emptySquare = [];
        for (let l = 0; l < nextXY; l++) {
            emptySquare.push(emptyString);
        }
        map.set(i, emptySquare);
    }
    // printMap(map);
};

const getAdjacentCubes = (col, row, zindex, map) => {
    let occupied = 0;
    // for (let [zindex, layout] of map) {
    for (let z = zindex - 1; z <= zindex + 1; z++) {
        const layout = map.get(z);
        if (layout) {
            for (let y = row - 1; y <= row + 1; y++) {
                // console.log('y', y);
                if (layout[y]) {
                    for (let x = col - 1; x <= col + 1; x++) {
                        // console.log('y', y, 'x', x, layout[y][x]);
                        if (!(x === col && y === row && z === zindex) && layout[y][x] === '#') {
                            occupied += 1;
                        }
                        // console.log(occupied);
                    }
                }
            }
        }
    }
    return occupied;
};

const calcRound = map => {
    let newMap = new Map();
    for (let [zindex, square] of map) {
        const newSquare = square.map((line, lineIndex) => {
            const lineLen = line.length;
            let newLine = '';
            for (let i = 0; i < lineLen; i++) {
                const currentLight = line[i];
                let newLight = '';
                const neighbors = getAdjacentCubes(i, lineIndex, zindex, map);
                // if (i === 2 & lineIndex === 4 && zindex === -1) {
                    // const tmp = getAdjacentCubes(2, 4, -1, map);
                    // console.log('giulia', currentLight, neighbors, tmp, map.get(-1)[4][2]);
                // }
                if (currentLight === '#' && neighbors !== 2 && neighbors !== 3) {
                    newLight = '.';
                }
                else if (currentLight === '.' && neighbors === 3) {
                    newLight = '#';
                }
                else {
                    newLight = currentLight;
                }
                newLine += newLight;
            }
            return newLine;
        });
        newMap.set(zindex, newSquare);
    }
    return newMap;
};

const calcRounds = (map, steps) => {
    let newMap = map;
    for (let i = 0; i < steps; i++) {
        addEmptyLayers(newMap);
        // console.log('xxx', getAdjacentCubes(2, 4, -1, newMap));
        newMap = calcRound(newMap);
        // printMap(newMap);
        // console.log('==========');
    }
    return newMap;
};

const countOccupiedSeats = map => {
    let occupied = 0;
    for (let [, square] of map) {
        occupied += square.reduce((acc, line) => acc+= line.split('').filter(c => c === '#').length, 0);
    }
    return occupied;
};

const calcSolution = (input, cycles) => {
    const parsedInput = parseInput(input);
    // print(parsedInput);
    const map = preparePhase0(parsedInput);
    // printMap(map);
    // console.log('==========');
    let newMap = calcRounds(map, cycles);
    // addEmptyLayers(map);
    // printMap(map);
    // const giulia = getAdjacentCubes(2, 4, -1, map);
    // console.log('giulia', giulia, map.get(-1)[4][2]);
    const res = countOccupiedSeats(newMap);
    // console.log(res);
    return res;
};

const tests = [
    {
        inp: `
.#.
..#
###
`,
        out: 112,
        cycles: 6
    }
];

tests.forEach(({ inp, out, cycles }) => {
    const res = calcSolution(inp, cycles);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 6));
