const isEven = input => {
    return input % 2 === 0;
};

const sq = input => {
    return Math.pow(input, 2);
};

const getCorners = input => {
    const sqrt = Math.sqrt(input);
    const min = Math.floor(sqrt);
    const max = Math.ceil(sqrt);
    let cornerTL = 0;
    let cornerBR = 0;

    if (isEven(min)) {
        // even
        cornerTL = sq(min) + 1;
        cornerBR = sq(min + 1);
    } else {
        // odd
        if (min === max) {
            // perfect square
            cornerTL = sq(max - 1) + 1;
            cornerBR = sq(max);
        } else {
            cornerTL = sq(max) + 1;
            cornerBR = sq(max + 1);
        }
    }

    const diff = Math.ceil((cornerBR - cornerTL) / 2);
    const cornerBL = cornerTL + diff;
    const cornerTR = cornerTL - diff;

    return [cornerTL, cornerTR, cornerBR, cornerBL];
};

/**
 * @param {number} input
 * @returns {array}
 */
const getCoordinates = input => {
    const corners = getCorners(input);
    const [cornerTL, cornerTR, cornerBR, cornerBL] = corners;
    const round = Math.sqrt(cornerTL - 1) / 2;

    if (input <= cornerTR) {
        const x = round;
        const y = cornerTR - input - round;

        return [x, y];
    }

    if (input <= cornerTL) {
        const y = -1 * round;
        const x = cornerTL - input - round;

        return [x, y];
    }

    if (input <= cornerBL) {
        const x = -1 * round;
        const y = input - cornerBL + round;

        return [x, y];
    }

    const y = round;
    const x = input - cornerBR + round;

    return [x, y];
};

const solution = input => {
    let store = 1;
    let cell = 1;
    const cells = {
        '0_0': 1
    };

    while (store <= input) {
        cell++;

        const coordinates = getCoordinates(cell);
        const [x, y] = coordinates;

        // a b c
        // d 0 e
        // f g h
        const surroundings = {
            a: [x - 1, y - 1].join('_'),
            b: [x - 0, y - 1].join('_'),
            c: [x + 1, y - 1].join('_'),
            d: [x - 1, y - 0].join('_'),
            e: [x + 1, y - 0].join('_'),
            f: [x - 1, y + 1].join('_'),
            g: [x - 0, y + 1].join('_'),
            h: [x + 1, y + 1].join('_')
        };

        store = Object.keys(surroundings).reduce((acc, currentValue) => {
            const id = surroundings[currentValue];

            if (cells[id]) {
                acc += cells[id];
            }

            return acc;
        }, 0);

        cells[`${x}_${y}`] = store;
    }

    return store;
};

module.exports = solution;
