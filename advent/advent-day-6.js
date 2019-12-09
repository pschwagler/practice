var fs = require("fs");
const testFile = "day-6-input.txt";

class Node {
  constructor(name) {
    this.name = name;
    this.orbits = null;
  }

  setOrbit(node) {
    this.orbits = node;
  }

  calculate() {
    if (!this.orbits) {
      return 0;
    }
    return 1 + this.orbits.calculate();
  }

  toString() {
    return this.name;
  }
}

const buildGraph = orbits => {
  let objects = {};
  for (let [center, orbiter] of orbits) {
    if (!objects.hasOwnProperty(center)) {
      objects[center] = new Node(center);
    }
    if (!objects.hasOwnProperty(orbiter)) {
      objects[orbiter] = new Node(orbiter);
    }
    objects[orbiter].setOrbit(objects[center]);
  }
  return objects;
};

const calculateAllOrbits = orbits => {
  let objects = buildGraph(orbits);
  let counter = 0;
  for (let node of Object.values(objects)) {
    // console.log(`${node}: ${node.orbits}`, node.calculate());
    counter += node.calculate();
  }
  return counter;
};

const minTransfers = orbits => {
  let objects = buildGraph(orbits);
  let santaCount = 0;
  let youCount = 0;
  let santaNode = objects["SAN"].orbits;
  // console.log("santa starting at " + santaNode);
  let youNode = objects["YOU"].orbits;
  // console.log("you starting at " + youNode);
  let orbitTransfers = { [santaNode]: santaCount, [youNode]: youCount };
  while (youNode !== null || santaNode !== null) {
    santaNode = santaNode === null ? null : santaNode.orbits;
    if (santaNode) {
      if (orbitTransfers.hasOwnProperty(santaNode)) {
        return orbitTransfers[santaNode] + ++santaCount;
      } else {
        orbitTransfers[santaNode] = ++santaCount;
      }
    }
    youNode = youNode === null ? null : youNode.orbits;
    if (youNode) {
      if (orbitTransfers.hasOwnProperty(youNode)) {
        return orbitTransfers[youNode] + ++youCount;
      } else {
        orbitTransfers[youNode] = ++youCount;
      }
    }
  }
  return santaCount + youCount;
};

fs.readFile(testFile, "utf8", function(err, data) {
  if (err) throw err;
  data = data.split("\n").map(orb => orb.split(")"));
  // console.log(data);
  // console.log(calculateAllOrbits(data));
  console.log(minTransfers(data));
});

/*


        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I

B: 1
G: 2
H: 3
C: 2
D: 3
I: 4
E: 4
J: 5
K: 6 
L: 7
F: 5

[5, 7, 6, 5, 4, 4, 3, 2, 3, 2, 1]

*/
