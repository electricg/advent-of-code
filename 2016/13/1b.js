////////////////////////
///// INPUT     ////////
////////////////////////

var width = 50;
var height = 50;

var favoriteNumber = 1352;

var start = [1, 1];

var end = [31, 39];

////////////////////////
///// UTILITIES ////////
////////////////////////

// Helper function for BFS
var buildPath = function (parents, targetNode) {
  var result = [targetNode];
  while (parents[targetNode] !== null) {
    targetNode = parents[targetNode];
    result.push(targetNode);
  }
  return result;
};

// BFS:
//   input adjacency matrix and startNode
//   output map of shortest path for each node that has a valid path from startNode
var bfs = function (adjMatrix, start) {
  var parents = [];
  var q = [];
  var v = [];
  var current;
  var lengthmap = {};
  q.push(start);
  parents[start] = null;
  v[start] = true;
  while (q.length) {
    current = q.shift();
    lengthmap['' + current] = buildPath(parents, current);
    for (var i = 0; i < adjMatrix.length; i += 1) {
      if (i !== current && adjMatrix[current][i] && !v[i]) {
        parents[i] = current;
        v[i] = true;
        q.push(i);
      }
    }
  }
  return lengthmap;
};

// Number of bits set in an integer
var hammingWeight = function (v) {
  v = v - ((v >> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
  return (((v + (v >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
};

//////////////////////////
///// MAP FUNCTIONS //////
//////////////////////////

var nodeIdFromXY = function (v) {
  return width * v[1] + v[0];
};

var XFromNodeId = function (nodeId) {
  return nodeId % width;
};

var YFromNodeId = function (nodeId) {
  return Math.floor(nodeId / width);
};

var isWall = function (x, y) {
  return (
    hammingWeight(x * x + 3 * x + 2 * x * y + y + y * y + favoriteNumber) %
      2 ===
    1
  );
};

var printMap = function (start, end, path) {
  for (var j = 0; j < height; j++) {
    var s = '';
    for (var i = 0; i < width; i++) {
      if (start[0] === i && start[1] === j) {
        s = s + 'S';
      } else if (end[0] === i && end[1] === j) {
        s = s + 'E';
      } else if (isWall(i, j)) {
        s = s + '.';
      } else {
        var inPath = false;
        var pathLength = path ? path.length : 0;
        for (var k = 0; k < pathLength; k++) {
          if (path[k] === nodeIdFromXY([i, j])) {
            inPath = true;
            break;
          }
        }
        if (inPath) {
          s = s + 'O';
        } else {
          s = s + ' ';
        }
      }
    }
    console.log(s);
  }
};

var adjacencyMatrix = function () {
  var a = [];
  for (var i = 0; i < height * width; i++) {
    var c = [];
    for (var j = 0; j < height * width; j++) {
      c.push(false);
    }
    var x = XFromNodeId(i);
    var y = YFromNodeId(i);
    if (x - 1 >= 0 && !isWall(x - 1, y)) {
      c[nodeIdFromXY([x - 1, y])] = true;
    }
    if (x + 1 < width && !isWall(x + 1, y)) {
      c[nodeIdFromXY([x + 1, y])] = true;
    }
    if (y - 1 >= 0 && !isWall(x, y - 1)) {
      c[nodeIdFromXY([x, y - 1])] = true;
    }
    if (y + 1 < height && !isWall(x, y + 1)) {
      c[nodeIdFromXY([x, y + 1])] = true;
    }
    a.push(c);
  }
  return a;
};

////////////////////////
///// SOLUTION  ////////
////////////////////////

var lengthmap = bfs(adjacencyMatrix(), nodeIdFromXY(start));

printMap(start, end, lengthmap['' + nodeIdFromXY(end)]);

console.log('Part 1:');
console.log(lengthmap['' + nodeIdFromXY(end)].length - 1);

console.log('Part 2:');
var count = 0;
for (var i = 0; i < height * width; i++) {
  if (lengthmap['' + i] !== undefined && lengthmap['' + i].length <= 51) {
    count++;
  }
}
console.log(count);
