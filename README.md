# Advent of Code

Solutions for https://adventofcode.com/

## File structure

Each year has its own independent folder (4 digits).  
Inside the year folder, each day has its own folder (2 digits with leading zero).  
Inside the day folder, the puzzle input is in the `input.txt` file exactly as it was given, and it's shared between the two parts.  
Each part has its own file, independent from each other.

## Things learned (or re-learned)

### JavaScript

- Map performs better in scenarios involving frequent additions and removals of key-value pairs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

- RegExp group naming `?<name>` https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges

- What is the _Manhattan Distance_ (the sum of the horizontal and vertical distances between points on a grid) and how to calculate it (sum of the absolute values of the horizontal and the vertical distance)

  ```js
  Math.abs(x1 - x0) + Math.abs(y1 - y0);
  ```

- RegExp `\1` to capture a group and use it, for example, to check for a repeated character `/([a-z])\1{1,}/`

- `for..in` iterates keys

- `for..of` iterates values

- `x ** y` is `Math.pow(x, y)`

- Least Common Multiple of an array values using Euclidean Algorithm, from https://stackoverflow.com/a/49722579/471720

  ```js
  const gcd = (a, b) => (a ? gcd(b % a, a) : b);
  const lcm = (a, b) => (a * b) / gcd(a, b);
  const lcmOfArray = arr => arr.reduce(lcm);
  lcmOfArray([2, 3]); // 6
  ```

- `array.at(-1)` to get the last element of an array without removing it

- replace all `str.replace(/old/g, 'new')`

## Where to look for

- Breadth-First Search: [2022/12/1.js](2022/12/1.js) [2016/13/1.js](2016/13/1.js)

- To study: [2016/16/2b.js](2016/16/2b.js)
