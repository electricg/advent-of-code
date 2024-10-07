const solution = input => {
    return input
        .split('')
        .reduce((accumulator, currentValue, currentIndex, array) => {
            const nextIndex = (array.length / 2 + currentIndex) % array.length;
            const previousValue = array[nextIndex];

            if (currentValue === previousValue) {
                accumulator += parseInt(currentValue, 10);
            }

            return accumulator;
        }, 0);
};

module.exports = solution;
