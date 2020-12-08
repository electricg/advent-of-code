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
    'turn off': i => i === 0 ? 0 : --i,
    'turn on': i => ++i,
    'toggle': i => i += 2
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
    return acc += row.reduce((acc2, item) => {
        return acc2 += item;
    }, 0);
}, 0);

const calcSolution = input => {
    const parsedInput = parseInput(input);
    const grid = createGrid(1000, 1000);
    parsedInput.forEach(instruction => {
        updateGrid(grid, instruction);
    });
    
    return countLit(grid);
};

console.log(calcSolution(input));