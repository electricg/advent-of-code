const format = input => {
    const lines = input.split('\n');

    return lines.map(line => {
        const arr = line.split(' ');
        const [name, weight, , ...children] = arr;
        const o = {
            name,
            weight: parseInt(weight.replace('(', '').replace(')', ''), 10)
        };

        if (children.length) {
            o.children = children.map(item => item.replace(',', ''));
        }

        return o;
    });
};

// I don't reconstruct the whole tree, I just check which node is never included as a child node
const fxCheating = programs => {
    const names = programs.map(item => item.name);

    programs.forEach(program => {
        if (program.children) {
            program.children.forEach(child => {
                const index = names.indexOf(child);
                if (index !== -1) {
                    names.splice(index, 1);
                }
            });
        }
    });

    return names.join('');
};

const fxProper = programs => {
    const obj = programs.reduce((acc, currentValue) => {
        acc[currentValue.name] = currentValue;
        return acc;
    }, {});
    // console.log(obj);

    const tree = {};

    programs.forEach(program => {
        if (program.children) {
            const { name, weight, children } = program;
            tree[name] = {
                name,
                weight,
                children: {}
            };

            children.forEach(child => {
                tree[name].children[child] = tree[child]
                    ? Object.assign({}, tree[child])
                    : Object.assign({}, obj[child]);

                if (tree[child]) {
                    delete tree[child];
                }
            });
        }
    });
    console.log(JSON.stringify(tree, null, 2));

    return Object.keys(tree).join('');
};

const solution = input => {
    const programs = format(input);
    return fxCheating(programs);
    // return fxProper(programs);
};

module.exports = solution;
