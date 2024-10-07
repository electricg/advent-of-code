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

// Get the root by checking which node is never included as a child node
const getRoot = programs => {
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

// Reconstruct full tree
const getTree = programs => {
    const root = getRoot(programs);

    const obj = programs.reduce((acc, currentValue) => {
        const { name } = currentValue;
        acc[name] = currentValue;

        return acc;
    }, {});

    Object.keys(obj).forEach(key => {
        const current = obj[key];
        const { children } = current;

        if (children && children.length) {
            const newChildren = children.map(child => obj[child]);
            current.children = newChildren;
        }
    });

    const tree = obj[root];

    return tree;
};

// return index of the different element
const findDiff = arr => {
    const elements = arr.reduce((acc, currentValue) => {
        if (!acc[currentValue]) {
            acc[currentValue] = 0;
        }

        acc[currentValue]++;

        return acc;
    }, {});

    if (Object.keys(elements).length === 1) {
        return {
            index: -1,
            delta: 0
        };
    }

    const diff = Object.keys(elements).reduce((acc, currentValue) => {
        if (elements[currentValue] === 1) {
            acc = parseInt(currentValue, 10);
        }

        return acc;
    }, -1);

    const index = arr.indexOf(diff);

    const blah = arr.slice();
    blah.splice(index, 1).pop();

    const delta = diff - blah.pop();

    return { index, delta };
};

const calc = (tree, answer) => {
    const { children, weight } = tree;
    tree.totalWeight = weight;

    if (children && children.length) {
        const arr = children.map(child => {
            const t = calc(child, answer);
            tree.totalWeight += child.totalWeight;
            // console.log(t);
            return t;
        });

        const { index, delta } = findDiff(arr);

        if (index > -1) {
            // console.log(children[index].weight);
            // console.log(delta);

            if (!answer.x) {
                answer.x = children[index].weight - delta;
            }
        }
    }

    return tree.totalWeight;
};

// Calculate weight
const getWeights = programs => {
    const tree = getTree(programs);
    let answer = {};

    calc(tree, answer);
    return answer.x;
};

module.exports = input => {
    const programs = format(input);
    return getWeights(programs);
};
