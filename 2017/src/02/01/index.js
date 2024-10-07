const format = input => {
    const output = input
        .split('\n')
        .map(row => row.split(/[\s|\t]/).map(n => parseInt(n, 10)));
    return output;
};

const solution = input => {
    const formatted = format(input);

    return formatted.reduce((accumulator, currentValue) => {
        const max = Math.max(...currentValue);
        const min = Math.min(...currentValue);
        const diff = max - min;
        accumulator += diff;

        return accumulator;
    }, 0);
};

module.exports = solution;
