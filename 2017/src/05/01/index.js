const format = input => {
    const lines = input.split('\n');
    return lines.map(line => parseInt(line, 10));
};

// too many recursions
const fxRecursion = (jumps, steps = 0, currentJumpIndex = 0) => {
    if (currentJumpIndex >= jumps.length) {
        return steps;
    }

    steps++;
    const currentJumpValue = jumps[currentJumpIndex];
    jumps[currentJumpIndex]++;
    const nextJumpIndex = currentJumpIndex + currentJumpValue;

    return fxRecursion(jumps, steps, nextJumpIndex);
};

const fxWhile = jumps => {
    let steps = 0;
    let currentJumpIndex = 0;

    while (currentJumpIndex < jumps.length) {
        steps++;
        const currentJumpValue = jumps[currentJumpIndex];
        jumps[currentJumpIndex]++;
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
