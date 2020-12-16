import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').reduce((acc, line) => {
    const [ingredient, parts] = line.split(/\s*:\s*/);
    const stats = parts.split(/\s*,\s*/);
    const obj = {};
    stats.forEach(stat => {
        const [name, value] = stat.split(/\s+/);
        obj[name] = parseInt(value, 10);
    });
    acc[ingredient.toLowerCase()] = obj;
    return acc;
}, {});

const calcScoreFromRecipe = (data, recipe) => {
    const ingredients = Object.keys(data);
    const score = ingredients.reduce((acc, key) => {
        const ingredient = data[key];
        const qt = recipe[key];
        const properties = Object.keys(ingredient);
        properties.forEach(prop => {
            if (prop === 'calories') {
                return;
            }
            if (acc[prop] == null) {
                acc[prop] = 0;
            }
            acc[prop] += qt * ingredient[prop];
        });
        return acc;
    }, {});

    return Object.keys(score).reduce((acc, item) => {
        acc *= score[item] > 0 ? score[item] : 0;
        return acc;
    }, 1);
};

const calcCaloriesFromRecipe = (data, recipe) => {
    const ingredients = Object.keys(data);
    return ingredients.reduce((acc, key) => {
        const ingredient = data[key];
        const qt = recipe[key];
        acc += qt * ingredient['calories'];
        return acc;
    }, 0);
};

const calcFromRecipe = (data, recipe) => {
    const score = calcScoreFromRecipe(data, recipe);
    const calories = calcCaloriesFromRecipe(data, recipe);
    return {
        score,
        calories
    };
}

// const _data = {
//     'butterscotch': { 'capacity': -1, 'durability': -2, 'flavor': 6, 'texture': 3, 'calories': 8 },
//     'cinnamon': { 'capacity': 2, 'durability': 3, 'flavor': -2, 'texture': -1, 'calories': 3 }
// };
// const _recipe = { 'butterscotch': 40, 'cinnamon': 60 };
// console.log(calcScoreFromRecipe(_data, _recipe));
// console.log(calcCaloriesFromRecipe(_data, _recipe));

const getMaxDistance = (data, remainingItems, qtMax = 10, recipe = {}, best = { score: -Infinity }) => {
    const currentItem = remainingItems.shift();
    const remainingItemsLen = remainingItems.length;
    const qtMin = remainingItemsLen === 0 ? qtMax : 0;
    let current;

    for (let i = qtMin; i <= qtMax; i++) {
        recipe[currentItem] = i;

        if (remainingItemsLen) {
            current = getMaxDistance(data, [...remainingItems], qtMax - i, recipe, best);
        }
        else {
            current = calcFromRecipe(data, recipe);
        }

        if (current.score > best.score && current.calories === 500) {
            best.score = current.score;
        }
    }

    return best;
};

const calcSolution = (input, qt) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const ingredients = Object.keys(parsedInput);
    // console.log(ingredients);
    const res = getMaxDistance(parsedInput, ingredients, qt);
    return res.score;
};

const tests = [
    {
        inp: `
Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
`,
        out: 57600000,
        qt: 100
    }
];

tests.forEach(({ inp, out, qt }) => {
    const res = calcSolution(inp, qt);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 100));
