const solution = input => {
    const arr = input.split(' ');
    const set = new Set(arr);
    return arr.length === set.size;
};

module.exports = solution;
