var fs = require("fs");
const testFile = "day-10-test.txt";

function countAsteroids(map, y, x) {
  // console.log("initiating count for", y, x);
  let numRows = map.length;
  let numCols = map[0].length;
  let startY = y - 1;
  let startX = x - 1;
  let endY = y + 1;
  let endX = x + 1;
  let blocked = [...Array(numRows)].map(row => Array(numCols).fill(false));
  let count = 0;

  const addBlocked = (y1, x1) => {
    let deltaY = y1 - y;
    let deltaX = x1 - x;
    for (let i = Math.min(Math.abs(deltaX), Math.abs(deltaY)); i > 1; i--) {
      if (deltaY % i === 0 && deltaX % i === 0) {
        deltaY /= i;
        deltaX /= i;
        break;
      }
    }
    let [y2, x2] = [y1 + deltaY, x1 + deltaX];

    while (y2 >= 0 && y2 < numRows && x2 >= 0 && x2 < numCols) {
      blocked[y2][x2] = true;
      [y2, x2] = [y2 + deltaY, x2 + deltaX];
    }
  };

  const checkCell = (y1, x1) => {
    if (y1 >= 0 && y1 < numRows) {
      if (x1 >= 0 && x1 < numCols) {
        if (!blocked[y1][x1] && map[y1][x1]) {
          // console.log(y, x, "can see", y1, x1);
          count++;
          addBlocked(y1, x1);
        }
      }
    }
  };

  while (startY >= 0 || endY < numRows || startX >= 0 || endX < numCols) {
    for (let col = startX; col <= endX; col++) {
      checkCell(startY, col);
      checkCell(endY, col);
    }
    for (let row = startY + 1; row < endY; row++) {
      checkCell(row, startX);
      checkCell(row, endX);
    }
    startY--;
    endY++;
    startX--;
    endX++;
  }
  return count;
}

fs.readFile(testFile, "utf8", function(err, data) {
  if (err) throw err;
  data = data.split("\n").map(num => num.split("").map(char => char === "#"));
  // console.log(data);
  console.log(
    data.map((row, r) =>
      row.map((cell, c) => (cell ? "" + countAsteroids(data, r, c) : "  "))
    )
  );

  console.log(
    data.reduce((memo, row, r) => {
      let max = row.reduce((_, __, c) =>
        countAsteroids(data, r, c) > memo ? countAsteroids(data, r, c) : memo
      );
      return max > memo ? max : memo;
    }, 0)
  );
});
