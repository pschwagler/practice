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
  const destination = 100;

  const findRoute = position => {
    if (position === 100) return 0;
    if (position >= 94) return 1;

    let nextPos = [];
    for (let roll = 1; roll < 7; roll++) {
      let next = position + roll;
      if (ladders[next] !== undefined) {
        nextPos.push(ladders[next]);
      } else if (snakes[next] === undefined) {
        nextPos.push(next);
      }
    }

    let min = Number.NEGATIVE_INFINITY;
    for (let pos of nextPos) {
      let numMoves = 1 + findRoute(pos);
      if (numMoves < min) {
        min = numMoves;
      }
    }
    return min;
  };

  return findRoute(0);
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

console.log(findSmallest(snakes, ladders));
