const format = input => {
    const lines = input.split('\n');
    return lines.map(line => parseInt(line, 10));
};

const fxWhile = jumps => {
    let steps = 0;
    let currentJumpIndex = 0;

    while (currentJumpIndex < jumps.length) {
        steps++;
        const currentJumpValue = jumps[currentJumpIndex];

        if (currentJumpValue >= 3) {
            jumps[currentJumpIndex]--;
        } else {
            jumps[currentJumpIndex]++;
        }

        currentJumpIndex = currentJumpIndex + currentJumpValue;
    }

    return steps;
};

const solution = input => {
    const jumps = format(input);
    const steps = fxWhile(jumps);

    return steps;
};

module.exports = solution;
