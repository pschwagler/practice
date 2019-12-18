var fs = require("fs");
const testFile = "day-13-input.txt";

fs.readFile(testFile, "utf8", function(err, data) {
  if (err) throw err;
  createBoard(data.split(","));
});

const types = {
  0: " ",
  1: "W",
  2: "B",
  3: "P",
  4: "B"
};

function createBoard(data) {
  const board = {};
  let maxRow = 0;
  let maxCol = 0;
  for (let i = 0; i < data.length; i += 3) {
    let [row, col, type] = data.slice(i, i + 3);
    console.log(row, col, type);
    if (row > maxRow) {
      maxRow = row;
    }
    if (col > maxCol) {
      maxCol = col;
    }
    let coord = JSON.stringify([row, col]);
    board[coord] = types[type];
  }
  console.log(board);

  let arr = [...Array(maxRow + 1)].map(() => Array(maxCol + 1).fill("n"));
  for (let coord of Object.keys(board)) {
    let [row, col] = JSON.parse(coord);
    arr[row][col] = board[coord];
  }
  console.log(arr);
}
