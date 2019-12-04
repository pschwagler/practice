var fs = require("fs");
const testFile = "day-3-input.txt";

fs.readFile(testFile, "utf8", function(err, data) {
  if (err) throw err;
  data = data.split("\n").map(commands => commands.split(","));

  console.log(findSmallestIntersection(data));
});

function findSmallestIntersection([inst1, inst2]) {
  function getCoords(instructions) {
    let coords = {};
    let numSteps = 0;
    let [x, y] = [0, 0];
    for (let instruction of instructions) {
      // console.log("instruction:", instruction);
      let [dir, ...num] = instruction;
      num = +num.join("");
      // console.log(num);
      if (dir === "R") {
        let [start, stop] = [x + 1, x + +num];
        for (x = start; x <= stop; x++) {
          numSteps++;
          if ([x, y] !== [0, 0]) coords[JSON.stringify([x, y])] = numSteps;
          // console.log("at position", JSON.stringify([x, y]));
        }
        x--;
      } else if (dir === "L") {
        let [start, stop] = [x - 1, x - +num];
        for (x = start; x >= stop; x--) {
          numSteps++;
          if ([x, y] !== [0, 0]) coords[JSON.stringify([x, y])] = numSteps;
          // console.log("at position", JSON.stringify([x, y]));
        }
        x++;
      } else if (dir === "U") {
        let [start, stop] = [y + 1, y + +num];
        for (y = start; y <= stop; y++) {
          numSteps++;
          if ([x, y] !== [0, 0]) coords[JSON.stringify([x, y])] = numSteps;
          // console.log("at position", JSON.stringify([x, y]));
        }
        y--;
      } else if (dir === "D") {
        let [start, stop] = [y - 1, y - +num];
        for (y = start; y >= stop; y--) {
          numSteps++;
          if ([x, y] !== [0, 0]) coords[JSON.stringify([x, y])] = numSteps;
          // console.log("at position", JSON.stringify([x, y]));
        }
        y++;
      } else {
        console.log("invalid dir", dir);
      }
    }
    return coords;
  }

  let coords1 = getCoords(inst1);
  let coords2 = getCoords(inst2);

  let minSteps = Number.POSITIVE_INFINITY;
  // console.log([...coords1]);
  // console.log("~~~~~~~~~~~~");
  // console.log([...coords2]);
  for (let coord of Object.keys(coords1)) {
    // console.log("looking at", coord);
    if (coords2[coord] !== undefined) {
      let [x1, y1] = JSON.parse(coord);
      // console.log("found intersection at", x1, y1);
      if (coords1[coord] + coords2[coord] < minSteps) {
        minSteps = coords1[coord] + coords2[coord];
      }
    }
  }
  return minSteps;
}
