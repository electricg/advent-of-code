const format = input => {
    return input.split('\t').map(n => parseInt(n, 10));
};

const fxWhile = banks => {
    const mySet = {
        [banks.join('')]: true
    };
    let counter = 0;
    let repeated = '';

    loop1: while (true) {
        const max = Math.max(...banks);
        counter++;
        let index = banks.indexOf(max);
        banks[index] = 0;

        for (let i = 0; i < max; i++) {
            index++;

            if (index >= banks.length) {
                index = 0;
            }

            banks[index]++;
        }

        if (banks.join('') === repeated) {
            break loop1;
        }

        if (repeated === '' && mySet[banks.join('')]) {
            repeated = banks.join('');
            counter = 0;
        }

        mySet[banks.join('')] = true;
    }

    return counter;
};

const solution = input => {
    const banks = format(input);
    return fxWhile(banks);
};

module.exports = solution;
