/*
Write a function, throw_dice(N, faces, total), that determines how many ways 
it is possible to throw N dice with some number of faces each to get a specific total.

For example, throw_dice(3, 6, 7) should equal 15 */

const throwDice = (N, faces, total) => {
  // 4:50
  let result = 0;

  let memo = {};

  const roll = (currNum, currRolls) => {
    if ((N - currRolls) * faces + currNum < total) return;
    if (memo["" + currNum + "|" + currRolls]) {
      memo["" + currNum + "|" + currRolls]++;
    } else if (currRolls === N - 1) {
      let needed = total - currNum;
      if (needed > 0 && needed <= faces) {
        memo["" + currNum + "|" + currRolls] = 1;
      }
    } else {
      for (let i = 1; i <= faces; i++) {
        roll(currNum + i, currRolls + 1);
      }
    }
  };

  roll(0, 0);
  return Object.keys(memo).reduce((sum, key) => sum + memo[key], 0);
};

console.log(throwDice(30, 30, 500), " --> (15)");
