var countAndSay = function(n) {
  if (n === 1) {
    return "1";
  } else {
    let nums = countAndSay(n - 1);
    // console.log("n:", n - 1, "nums", nums);
    let ret = "";
    let counter = 0;
    for (let i = 0; i < nums; i++) {
      counter++;
      if (nums[i] !== nums[i + 1]) {
        ret += counter + nums[i];
        counter = 0;
      }
    }
    return ret;
  }
};

for (let i = 1; i < 6; i++) {
  console.log(`n: ${i}, res: ${countAndSay(i)}`);
}
