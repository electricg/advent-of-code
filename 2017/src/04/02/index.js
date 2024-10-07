const solution = input => {
    const words = input.split(' ');
    const sorted = words.map(item => {
        return item
            .split('')
            .sort()
            .join('');
    });
    const set = new Set(sorted);
    return words.length === set.size;
};

module.exports = solution;
