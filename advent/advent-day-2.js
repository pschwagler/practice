var fs = require("fs");
const testFile = "day-2-input.txt";

const computeIntCode = arr => {
  let copy = [...arr];
  for (let i = 0; i < copy.length; i += 4) {
    let command = copy[i];
    let first = copy[copy[i + 1]];
    let second = copy[copy[i + 2]];
    let resIndex = copy[i + 3];

    if (command === 1) {
      copy[resIndex] = first + second;
    } else if (command === 2) {
      copy[resIndex] = first * second;
    } else if (command === 99) {
      return copy[0];
    } else {
      console.log(command, "is not a command");
    }
  }
  return copy[0];
};

const findVals = arr => {
  let desired = 19690720;
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      arr[1] = noun;
      arr[2] = verb;
      if (computeIntCode(arr) === desired) {
        return 100 * noun + verb;
      }
    }
  }
  return null;
};

fs.readFile(testFile, "utf8", function(err, data) {
  if (err) throw err;
  data = data.split(",").map(num => +num);
  console.log(findVals(data));
});
