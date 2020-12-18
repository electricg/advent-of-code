import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n');

const getAdjacentLights = (col, row, layout) => {
    let occupied = 0;
    for (let y = row - 1; y <= row + 1; y++) {
        // console.log('y', y);
        if (layout[y]) {
            for (let x = col - 1; x <= col + 1; x++) {
                // console.log('y', y, 'x', x, layout[y][x]);
                if (!(x === col && y === row) && layout[y][x] === '#') {
                    occupied += 1;
                }
                // console.log(occupied);
            }
        }
    }
    return occupied;
};

const calcRound = (input = []) => input.map((line, lineIndex) => {
    const inputLen = input.length - 1;
    const lineLen = line.length;
    let newLine = '';
    for (let i = 0; i < lineLen; i++) {
        const currentLight = line[i];
        let newLight = '';
        const neighbors = getAdjacentLights(i, lineIndex, input);
        if ((i === 0 && lineIndex === 0) || (i === lineLen - 1 && lineIndex === inputLen) ||
            (i === 0 && lineIndex === inputLen) || (i === lineLen - 1 && lineIndex === 0)) {
            newLight = '#';
        }
        else if (currentLight === '#' && neighbors !== 2 && neighbors !== 3) {
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

const calcRounds = (layout, steps) => {
    let oldLayout;
    for (let i = 0; i < steps; i++) {
        oldLayout = layout.join('');
        layout = calcRound(layout);
    }
    return layout;
};

const countOccupiedSeats = input => input.reduce((acc, line) => acc+= line.split('').filter(c => c === '#').length, 0);

const calcSolution = (input, steps) => {
    let layout = parseInput(input);
    layout = calcRounds(layout, steps);
    return countOccupiedSeats(layout);
};

const tests = [
    {
        inp: `
##.#.#
...##.
#....#
..#...
#.#..#
####.#
`,
        out: 17,
        steps: 5
    }
];

const tests2 = [tests[0].inp,
`
#.##.#
####.#
...##.
......
#...#.
#.####
`,
`
#..#.#
#....#
.#.##.
...##.
.#..##
##.###
`,
`
#...##
####.#
..##.#
......
##....
####.#
`,
`
#.####
#....#
...#..
.##...
#.....
#.#..#
`,
`
##.###
.##..#
.##...
.##...
#.#...
##...#
`,
];

tests.forEach(({ inp, out, steps }) => {
    const res = calcSolution(inp, steps);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log('==========');

for (let i = 0; i < tests2.length - 1; i++) {
    const res = calcRound(parseInput(tests2[i]));
    if (res.join('\n') === tests2[i+1].trim()) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
}

console.log(calcSolution(input, 100));
