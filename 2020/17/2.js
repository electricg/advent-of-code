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
    const megamap = new Map();
    const map = new Map();
    map.set(0, input);
    megamap.set(0, map);
    return megamap;
};

const addEmptyLayers = megamap => {
    let emptySquare;
    let nextZ;
    let nextXY;
    let emptyString;

    const megazero = megamap.get(0);
    const megasizeXY = megazero.size;
    const megasizeZ = megamap.size;
    const meganextZ = Math.floor(megasizeZ / 2) + 1;
    const meganextXY = megasizeXY + 2;

    for (let [, map] of megamap) {
        const zero = map.get(0);
        const sizeXY = zero.length;
        const sizeZ = map.size;
        nextZ = Math.floor(sizeZ / 2) + 1;
        nextXY = sizeXY + 2;
        emptyString = Array(nextXY).fill('.').join('');
        for (let [key, value] of map) {
            value = value.map(line => `.${line}.`);
            value.unshift(emptyString);
            value.push(emptyString);
            map.set(key, value);
        }
        for (let i of [nextZ, nextZ * -1]) {
            emptySquare = [];
            for (let l = 0; l < nextXY; l++) {
                emptySquare.push(emptyString);
            }
            map.set(i, emptySquare);
        }
    }

    for (let m of [meganextZ, meganextZ * -1]) {
        const emptyMap = new Map();
        for (let n = 0; n < meganextXY; n++) {
            for (let i = nextZ * -1; i <= nextZ; i++) {
                emptyMap.set(i, emptySquare);
            }
        }
        megamap.set(m, emptyMap);
    }
};

const getAdjacentCubes = (col, row, zindex, windex, megamap) => {
    let occupied = 0;
    for (let w = windex - 1; w <= windex + 1; w++) {
        const map = megamap.get(w);
        if (map) {
            for (let z = zindex - 1; z <= zindex + 1; z++) {
                const layout = map.get(z);
                if (layout) {
                    for (let y = row - 1; y <= row + 1; y++) {
                        if (layout[y]) {
                            for (let x = col - 1; x <= col + 1; x++) {
                                if (!(x === col && y === row && z === zindex && w === windex) && layout[y][x] === '#') {
                                    occupied += 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return occupied;
};

const calcRound = megamap => {
    let newMegamap = new Map();
    for (let [windex, map] of megamap) {
        let newMap = new Map();
        for (let [zindex, square] of map) {
            const newSquare = square.map((line, lineIndex) => {
                const lineLen = line.length;
                let newLine = '';
                for (let i = 0; i < lineLen; i++) {
                    const currentLight = line[i];
                    let newLight = '';
                    const neighbors = getAdjacentCubes(i, lineIndex, zindex, windex, megamap);
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
        newMegamap.set(windex, newMap);
    }
    return newMegamap;
};

const calcRounds = (map, steps) => {
    let newMap = map;
    for (let i = 0; i < steps; i++) {
        addEmptyLayers(newMap);
        newMap = calcRound(newMap);
    }
    return newMap;
};

const countOccupiedSeats = megamap => {
    let occupied = 0;
    for (let [, map] of megamap) {
        for (let [, square] of map) {
            occupied += square.reduce((acc, line) => acc+= line.split('').filter(c => c === '#').length, 0);
        }
    }
    return occupied;
};

const calcSolution = (input, cycles) => {
    const parsedInput = parseInput(input);
    // print(parsedInput);
    const map = preparePhase0(parsedInput);
    let newMap = calcRounds(map, cycles);
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
        out: 848,
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
