import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => {
    const matches = line.match(/^([a-z ]+)( )(\d+)(,)(\d+)([a-z ]+)(\d+)(,)(\d+)$/);
    let [, action, , x1, , y1, , x2, , y2] = matches;
    x1 = parseInt(x1, 10);
    y1 = parseInt(y1, 10);
    x2 = parseInt(x2, 10);
    y2 = parseInt(y2, 10);

    return { action, x1, y1, x2, y2 };
});

const createGrid = (w, h) => {
    const row = Array(w).fill(0);
    const grid = [];
    for (let y = 0; y < h; y++) {
        grid.push([...row]);
    }
    return grid;
}

const actions = {
    'turn off': i => 0,
    'turn on': i => 1,
    'toggle': i => i === 0 ? 1 : 0
};

const updateGrid = (grid, { action, x1, y1, x2, y2 }) => {
    const fx = actions[action];
    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
            grid[y][x] = fx(grid[y][x]);
        }
    }
};

const countLit = grid => grid.reduce((acc, row) => {
    return acc += row.filter(i => i).length;
}, 0);

const tests = () => {
    const grid = createGrid(5, 5);
    console.log(grid);
    updateGrid(grid, {
        action: 'turn on',
        x1: 1,
        y1: 1,
        x2: 4,
        y2: 2
    });
    console.log(grid);
    updateGrid(grid, {
        action: 'turn off',
        x1: 1,
        y1: 1,
        x2: 1,
        y2: 2
    });
    console.log(grid);
    updateGrid(grid, {
        action: 'toggle',
        x1: 3,
        y1: 0,
        x2: 4,
        y2: 4
    });
    console.log(grid);
    console.log(countLit(grid));
}

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    // tests();
    const grid = createGrid(1000, 1000);
    parsedInput.forEach(instruction => {
        updateGrid(grid, instruction);
    });
    
    return countLit(grid);
};

console.log(calcSolution(input));