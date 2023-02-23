import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const calcFS = (lines) => {
  const fs = [
    {
      name: '/',
      type: 'dir',
      size: 0,
      children: [],
    },
  ];
  let current = null;
  let path = [];

  lines.forEach((line) => {
    if (line.indexOf('$ ') === 0) {
      // command
      if (line === '$ ls') {
        // ls
      } else {
        // cd
        const where = line.replace('$ cd ', '');
        if (where === '/') {
          // home
          current = fs[0];
        } else if (where === '..') {
          // up
          current = path.pop();
        } else {
          // down
          path.push(current);
          current = current.children.find((el) => el.name === where);
        }
      }
    } else {
      // output
      if (line.indexOf('dir ') === 0) {
        // dir
        const dir = line.replace('dir ', '');
        current.children.push({
          name: dir,
          type: 'dir',
          size: 0,
          children: [],
        });
      } else {
        // file
        const [size, file] = line.split(' ');
        const sizeInt = size * 1;
        current.children.push({
          name: file,
          type: 'file',
          size: sizeInt * 1,
        });
        current.size += sizeInt;
        for (let i = 0; i < path.length; i++) {
          path[i].size += sizeInt;
        }
      }
    }
  });

  return fs;
};

const calcSizes = (dir, total) => {
  const children = dir.children.filter((child) => child.type === 'dir');
  if (children.length) {
    for (let i = 0; i < children.length; i++) {
      total = calcSizes(children[i], total);
    }
  }
  // console.log('t', total, dir.name, dir.size);
  if (dir.size <= 100000) {
    return total + dir.size;
  }
  return total;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const fs = calcFS(parsedInput);
  // console.log(JSON.stringify(fs, null, 2));
  const res = calcSizes(fs[0], 0);
  return res;
};

const tests = [
  {
    inp: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`,
    out: 95437,
  },
];

tests.forEach(({ inp, out }) => {
  const res = calcSolution(inp);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
