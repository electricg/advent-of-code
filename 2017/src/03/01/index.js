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
    if (input === 1) {
        return 0;
    }

    const coordinates = getCoordinates(input);
    const [x, y] = coordinates;

    return Math.abs(x) + Math.abs(y);
};

module.exports.getCorners = getCorners;
module.exports.getCoordinates = getCoordinates;
module.exports.solution = solution;
