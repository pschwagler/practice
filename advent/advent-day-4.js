const testPassword = password => {
  // console.log(password);
  let digits = ("" + password).split("").map(num => +num);
  let counts = Array(10).fill(0);
  let prev = digits[0];
  counts[prev]++;
  for (let i = 1; i < digits.length; i++) {
    counts[digits[i]]++;
    if (digits[i] < prev) {
      return false;
    }
    prev = digits[i];
  }
  // console.log("counts", counts);
  return counts.includes(2) ? true : false;
};

const numPasswords = function(from, to) {
  let count = 0;
  for (let i = from; i <= to; i++) {
    if (testPassword(i)) count++;
  }
  console.log(count);
  return count;
};

// numPasswords(264793, 803935);
numPasswords(264793, 803935);
