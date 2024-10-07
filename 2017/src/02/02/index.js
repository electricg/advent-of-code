const format = input => {
    const output = input
        .split('\n')
        .map(row => row.split(/[\s|\t]/).map(n => parseInt(n, 10)));
    return output;
};

const sort = (a, b) => {
    return b - a;
};

const solution = input => {
    const formatted = format(input);

    return formatted.reduce((accumulator, currentValue) => {
        const sorted = currentValue.sort(sort);

        sorted.reduce((accumulator2, currentValue2, currentIndex2, array2) => {
            const left = currentValue2;
            const rights = array2.slice(currentIndex2 + 1);

            for (let i = 0; i < rights.length; i++) {
                if (left % rights[i] === 0) {
                    return (accumulator += left / rights[i]);
                }
            }
        }, accumulator);

        return accumulator;
    }, 0);
};

module.exports = solution;
