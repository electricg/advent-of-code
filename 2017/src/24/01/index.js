const checkDuplicate = input => {
    const arr = input.split('\n');
    const set = new Set(arr);
    console.log(arr.length, set.size);
};

const sort = (a, b) => {
    if (a[0] < b[0]) {
        return -1;
    }
    if (a[0] > b[0]) {
        return 1;
    }
    if (a[1] < b[1]) {
        return -1;
    }
    if (a[1] > b[1]) {
        return 1;
    }
    return 0;
};

const formatSorted = (input, dir) => {
    return input
        .split('\n')
        .map(line => {
            const arr = line.split('/').map(n => parseInt(n, 10));
            const max = Math.max(...arr);
            const min = Math.min(...arr);

            if (dir === 'des') {
                return [max, min];
            }

            return [min, max];
        })
        .sort((a, b) => {
            if (dir === 'des') {
                return sort(b, a);
            }

            return sort(a, b);
        });
};

const solution = input => {
    const components = formatSorted(input);
    console.log(components);
    return 0;
};

module.exports = solution;

module.exports = solution;
