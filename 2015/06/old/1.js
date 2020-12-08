import Helpers from '../helpers.js';

// const fileName = './input.txt';

// const input = Helpers.readFile(fileName, import.meta.url);

// const parseInput = input => input.trim().split('\n').map(line => {
//     const matches = line.match(/^([a-z ]+)( )(\d+)(,)(\d+)([a-z ]+)(\d+)(,)(\d+)$/);
//     let [, action, , x1, , y1, , x2, , y2] = matches;
//     x1 = parseInt(x1, 10);
//     y1 = parseInt(y1, 10);
//     x2 = parseInt(x2, 10);
//     y2 = parseInt(y2, 10);

//     return { action, x1, y1, x2, y2 };
// });
// const parsedInput = parseInput(input);

// Helpers.writeFile(JSON.stringify({ input: parsedInput }, null, 2), '01/_data.json', import.meta.url);

Helpers.startHarp({ dir: '06/01' });


