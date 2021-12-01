import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);
const input_test = Helpers.readFile('./input_test.txt', import.meta.url);

const parseInput = input => input.trim().split('\n\n').reduce((acc, item) => {
    const [title, tile] = item.split(':\n');
    acc[title.replace('Tile ', '')] = tile;
    return acc;
}, {});

const DIRECTIONS = ['north', 'south', 'west', 'east'];
const ACTIONS = ['nohing', 'flipNS', 'flipWE', 'rotate', 'rotate', 'rotate'];

const compareTiles = (currentTile, otherTile) => {
    for (let dir of DIRECTIONS) {
        for (let otherDir of DIRECTIONS) {
            if (currentTile[dir] === otherTile[otherDir]) {
                // console.log(dir, otherDir);
                return true;
            }
            if (currentTile[dir] === otherTile.reverse(otherDir)) {
                // console.log('reverse', dir, otherDir);
                return true;
            }
        }
    }

    return false;
};

const calcStatus = (tiles, tileKeys) => {
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
                acc[key].push(otherKey);
            }
        });
        return acc;
    }, {});

    const groupedStatus = Object.keys(status).reduce((acc, key) => {
        const item = status[key];
        if (!acc[item.length]) {
            acc[item.length] = {};
        }
        acc[item.length][key] = item;
        return acc;
    }, {});

    return { status, groupedStatus };
};

class Tile {
    #lines = [];
    #rows = 0;
    #cols = 0;
    
    #reverse = string => string.split('').reverse().join('');
  
    constructor(string) {
        this.#lines = string.split('\n');
        this.#rows = this.#lines.length;
        this.#cols = this.#lines[0].length;
    }
  
    get north() {
        return this.#lines[0];
    }
  
    get south() {
        return this.#lines[this.#rows - 1];
    }
  
    get west() {
        return this.#lines.map(line => line[0]).join('');
    }
  
    get east() {
        return this.#lines.map(line => line[this.#cols - 1]).join('');
    }
  
    get printed() {
        return this.#lines.join('\n');
    }

    nothing() {}
  
    flipNS() {
        this.#lines = this.#lines.reverse();
    }
  
    flipWE() {
        this.#lines = this.#lines.map(line => this.#reverse(line));
    }
  
    // rotate 90deg clockwise
    rotate() {
        this.#lines = this.#lines.reduce((acc, line) => {
            const chars = line.split('');
            for (let i = 0; i < chars.length; i++) {
                acc[i] = `${chars[i]}${acc[i]}`;
            }
            return acc;
        }, Array(this.#cols).fill(''));
        this.#rows = this.#lines.length;
        this.#cols = this.#lines[0].length;
    }

    reverse(side) {
        return this.#reverse(this[side]);
    }
};

const calcArrangement = (tileKeys, status, groupedStatus) => {
    const sideLength = Math.sqrt(tileKeys.length);
    const arrangement = [];
    for (let i = 0; i < sideLength; i++) {
        arrangement.push(Array(sideLength).fill(null));
    }
    // console.log(arrangement);

    const corners = Object.keys(groupedStatus[2]);
    // console.log(corners);

    // first row
    let currentTile = corners[0];
    arrangement[0][0] = currentTile;

    for (let i = 1; i < sideLength; i++) {
        const possibleTiles = status[currentTile];
        loop:
        for (let t = 0; t < possibleTiles.length; t++) {
            if (status[possibleTiles[t]].length < 4) {
                status[possibleTiles[t]] = Helpers.removeItemFromArray(status[possibleTiles[t]], currentTile);
                status[currentTile] = Helpers.removeItemFromArray(status[currentTile], possibleTiles[t]);
                currentTile = possibleTiles[t];
                arrangement[0][i] = currentTile;
                break loop;
            }
        }
    }

    for (let row = 1; row < sideLength; row++) {
        currentTile = status[arrangement[row - 1][0]].shift();
        arrangement[row][0] = currentTile;
        status[currentTile] = Helpers.removeItemFromArray(status[currentTile], arrangement[row - 1][0]);

        for (let i = 1; i < sideLength; i++) {
            const possibleTiles = status[currentTile];
            loop:
            for (let t = 0; t < possibleTiles.length; t++) {
                const choices = status[possibleTiles[t]];
                const topIndex = choices.indexOf(arrangement[row - 1][i]);
                const leftIndex = choices.indexOf(arrangement[row][i - 1]);
                if (topIndex !== -1 && leftIndex !== -1) {
                    status[possibleTiles[t]] = Helpers.removeItemFromArray(status[possibleTiles[t]], currentTile);
                    status[currentTile] = Helpers.removeItemFromArray(status[currentTile], possibleTiles[t]);
                    currentTile = possibleTiles[t];
                    arrangement[row][i] = currentTile;
                    break loop;
                }
            }
        }
    }

    // console.log(status);
    // const test = new Set();
    // arrangement.forEach(line => {
    //     line.forEach(item => {
    //         test.add(item);
    //     })
    // })
    // console.log(test.size);
    return arrangement;
};

const tryAllcombinations = (currentTile, otherTile) => {
    otherTile.flipNS();
    otherTile.flipWE();
    otherTile.rotate();
    otherTile.rotate();
    otherTile.rotate();
    for (let dir of DIRECTIONS) {
        for (let otherDir of DIRECTIONS) {
            if (currentTile[dir] === otherTile[otherDir]) {
                console.log(dir, otherDir);
                return true;
            }
            if (currentTile[dir] === otherTile.reverse(otherDir)) {
                console.log('reverse', dir, otherDir);
                return true;
            }
        }
    }
    throw new Error('tryAllcombinations failed');
};

const positionTiles = (tiles, arrangement) => {

};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const tileKeys = Object.keys(parsedInput);
    // console.log(tileKeys.length);
    const tiles = tileKeys.reduce((acc, key) => {
        acc[key] = new Tile(parsedInput[key]);
        return acc;
    }, {});
    const { status, groupedStatus } = calcStatus(tiles, tileKeys);
    // console.log(status);
    const arrangement = calcArrangement(tileKeys, status, groupedStatus);
    // console.log(arrangement);
    // const canvas = positionTiles(tiles, arrangement);
    tryAllcombinations(tiles[arrangement[0][0]], tiles[arrangement[0][1]]);
};

console.log(calcSolution(input_test));