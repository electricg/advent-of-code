const format = input => {
    const lines = input.split('\n');
    return lines.map(line => {
        const arr = line.split(' ');
        const [register, op, amount, , left, comp, right] = arr;

        return {
            register,
            op,
            amount: parseInt(amount, 10),
            left,
            comp,
            right: parseInt(right, 10)
        };
    });
};

const isTrue = (left, comp, right) => {
    const o = {
        '=='() {
            return left === right;
        },
        '!='() {
            return left !== right;
        },
        '<'() {
            return left < right;
        },
        '<='() {
            return left <= right;
        },
        '>'() {
            return left > right;
        },
        '>='() {
            return left >= right;
        }
    };

    return o[comp]();
};

const ops = (op, left, right) => {
    const o = {
        inc() {
            return left + right;
        },
        dec() {
            return left - right;
        }
    };

    return o[op]();
};

const solution = input => {
    const instructions = format(input);
    const registers = instructions.reduce((acc, v) => {
        if (acc[v.register] == null) {
            acc[v.register] = 0;
        }

        if (acc[v.left] == null) {
            acc[v.left] = 0;
        }

        const canI = isTrue(acc[v.left], v.comp, v.right);

        if (canI) {
            acc[v.register] = ops(v.op, acc[v.register], v.amount);
        }

        return acc;
    }, {});

    const values = Object.keys(registers).map(k => registers[k]);
    const max = Math.max(...values);

    return max;
};

module.exports.isTrue = isTrue;
module.exports.solution = solution;
