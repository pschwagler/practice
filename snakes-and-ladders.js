/*
Snakes and Ladders is a game played on a 10 x 10 board, the goal of which is get from square 1 to square 100. 
On each turn players will roll a six-sided die and move forward a number of spaces equal to the result. 
If they land on a square that represents a snake or ladder, they will be transported ahead or behind, respectively, to a new square.

Find the smallest number of turns it takes to play snakes and ladders.

For convenience, here are the squares representing snakes and ladders, and their outcomes:
*/

/*
1, 1 - 38
2, 44
3, 50
4, 51 - 67
5, 71 - 91
6, 96
7, 100

*/
let moves = Array(100).fill(false);

function findSmallest(snakes, ladders) {
  let visited = Array(100).fill(false);
  let smallest = 99;
  const destination = 99;
  let moves = [[0, 0]]; // queue with push and shift

  while (moves.length > 0) {
    let [pos, numMoves] = moves.pop();
    if (!visited[pos]) {
      visited[pos] = true;
      for (let next = pos + 1; next < pos + 7; next++) {
        let nextPos = ladders[next] || snakes[next] || next;
        if (nextPos >= destination) {
          smallest = Math.min(smallest, numMoves + 1);
        } else {
          moves.push([nextPos, numMoves + 1]);
        }
      }
    }
  }

  return smallest;
}

snakes = {
  16: 6,
  48: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78
};
ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100
};
let start = Date.now();
for (let i = 0; i < 10000; i++) {
  findSmallest(snakes, ladders);
}
console.log((Date.now() - start) / 1000);
