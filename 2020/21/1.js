import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').reduce((acc, line) => {
    const [ingredients, allergens] = line.trim().replace(')', '').split(' (contains ');
    const parsedAllergens = allergens.split(', ');
    const parsedIngredients = ingredients.split(' ').sort();
    parsedAllergens.forEach(allergen => {
        if (!acc[allergen]) {
            acc[allergen] = [];
        }
        acc[allergen].push(parsedIngredients);
    });
    return acc;
}, {});

const makeListForAllergen = (allergen, foods) => {
    const len = foods.length;
    const obj = {};
    foods.forEach(food => {
        food.forEach(ingredient => {
            if (obj[ingredient] == null) {
                obj[ingredient] = 0;
            }
            obj[ingredient]++;
        });
    });
    let possibles = {};
    let impossibles = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] === len) {
            possibles[key] = true;
        }
        else {
            impossibles[key] = true;
        }
    })
    return { [allergen]: { possibles, impossibles } };
};

const countOccurences = (word, text) => {
    const regex = new RegExp('\\s+' + word + '\\s+', 'g')
    return [...text.matchAll(regex)].length;
}

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    const allergenList = Object.keys(parsedInput);
    let ingredientList = new Set();
    allergenList.forEach(key => {
        const foods = parsedInput[key];
        foods.forEach(food => {
            food.forEach(ingredient => {
                ingredientList.add(ingredient);
            });
        })
    });
    ingredientList = [...ingredientList];
    // console.log(ingredientList);

    const x = allergenList.reduce((acc, allergen) => {
        const list = makeListForAllergen(allergen, parsedInput[allergen]);
        acc = {
            ...acc,
            ...list,
        };
        return acc;
    }, {});
    // console.log(x);

    const impossibles = ingredientList.filter(ingredient => {
        for (let i = 0; i < allergenList.length; i++) {
            if (x[allergenList[i]].possibles[ingredient]) {
                return false;
            }
        }
        return true;
    });
    // console.log(impossibles.length);
    // console.log(ingredientList.length);
    return impossibles.reduce((acc, word) => {
        acc += countOccurences(word, ` ${input}`);
        return acc;
    }, 0);
};

const tests = [
    {
        inp: `
mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)
`,
        out: 5
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcSolution(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
