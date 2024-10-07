const solution = input => {
    return input
        .split('')
        .reduce((accumulator, currentValue, currentIndex, array) => {
            const previousValue =
                currentIndex === 0
                    ? array[array.length - 1]
                    : array[currentIndex - 1];

            if (currentValue === previousValue) {
                accumulator += parseInt(currentValue, 10);
            }

            return accumulator;
        }, 0);
};

module.exports = solution;
