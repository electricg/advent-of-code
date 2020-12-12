import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n');

const getAdjacentSeats = (col, row, layout) => {
    let occupied = 0;

    const mods = {
        nw: { y: -1, x: -1 },
        n:  { y: -1, x:  0 },
        ne: { y: -1, x:  1 },
        e:  { y:  0, x:  1 },
        se: { y:  1, x:  1 },
        s:  { y:  1, x:  0 },
        sw: { y:  1, x: -1 },
        w:  { y:  0, x: -1 }
    }

    Object.keys(mods).forEach(key => {
        const dir = mods[key];
        let y = row;
        let x = col;
        do {
            y += dir.y;
            x += dir.x;
        } while (layout[y] && layout[y][x] && layout[y][x] === '.');
        if (layout[y] && layout[y][x] && layout[y][x] === '#') {
            occupied += 1;
        }
    });

    return occupied;
};

const calcRound = (input = []) => input.map((line, lineIndex) => {
    const lineLen = line.length;
    let newLine = '';
    for (let i = 0; i < lineLen; i++) {
        const currentSeat = line[i];
        let newSeat = '';
        if (currentSeat === '.') {
            newSeat = currentSeat;
        }
        else {
            const occupied = getAdjacentSeats(i, lineIndex, input);
            if (currentSeat === 'L' && occupied === 0) {
                newSeat = '#';
            }
            else if (currentSeat === '#' && occupied >= 5) {
                newSeat = 'L';
            }
            else {
                newSeat = currentSeat;
            }
        }
        newLine += newSeat;
    }
    return newLine;
});

const calcRounds = layout => {
    let oldLayout;
    do {
        oldLayout = layout.join('');
        layout = calcRound(layout);
    } while (oldLayout !== layout.join(''));
    return layout;
};

const countOccupiedSeats = input => input.reduce((acc, line) => acc+= line.split('').filter(c => c === '#').length, 0);

const print = input => {
    console.log('==========')
    console.log(input.join('\n'));
    console.log('==========')
};

const calcSolution = input => {
    let layout = parseInput(input);
    layout = calcRounds(layout);
    return countOccupiedSeats(layout);
};

const tests = [
    {
        inp: `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`,
        out: 26
    }
];

const tests2 = [tests[0].inp,
`
#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
`,
`
#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#
`,
`
#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#
`,
`
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#
`,
`
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
`,
`
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
`
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

console.log('==========');

{
    const inp = parseInput(tests2[0]);
    const out = parseInput(tests2[tests2.length - 1]);
    const res = calcRounds(inp);
    if (res.join('') === out.join('')) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
}

console.log(calcSolution(input));
