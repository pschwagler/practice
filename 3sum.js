var threeSum = function(nums) {
  nums.sort();
  let solutions = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] <= 0 && nums[i] !== nums[i - 1]) {
      let first = nums[i];
      let seen = new Set([nums[i + 1]]);
      for (let j = i + 2; j < nums.length; j++) {
        let last = -(first + nums[j]);
        if (last === -0) {
          last = 0;
        }
        if (seen.has(last)) {
          solutions.push([first, nums[j], last].sort());
        }
        seen.add(nums[j]);
      }
    }
  }

  for (let i = 1; i < solutions.length; i++) {
    if (
      solutions[i][0] === solutions[i - 1][0] &&
      solutions[i][1] === solutions[i - 1][1] &&
      solutions[i][2] === solutions[i - 1][2]
    ) {
      solutions.splice(i, 1);
    }
  }

  return solutions;
};

console.log(threeSum([0, 0, 0]));
console.log(threeSum([0, 0, 0, 0]));
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
