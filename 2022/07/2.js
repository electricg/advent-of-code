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

const calcSizes = (dir, MIN, res) => {
  const children = dir.children.filter((child) => child.type === 'dir');
  if (children.length) {
    for (let i = 0; i < children.length; i++) {
      res = calcSizes(children[i], MIN, res);
    }
  }
  // console.log('t', total, dir.name, dir.size);
  if (dir.size >= MIN && dir.size < res) {
    return dir.size;
  }
  return res;
};

const calcSolution = (input) => {
  const TOTAL_FS = 70000000;
  const MIN_UNUSED = 30000000;

  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const fs = calcFS(parsedInput);
  // console.log(JSON.stringify(fs, null, 2));

  const minDirSize = fs[0].size - (TOTAL_FS - MIN_UNUSED);
  // console.log(minDirSize);

  const res = calcSizes(fs[0], minDirSize, Infinity);
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
    out: 24933642,
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
