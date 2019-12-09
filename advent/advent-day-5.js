var fs = require("fs");
const testFile = "day-5-input.txt";

const operation = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
  HALT: 99
};

const computeIntCode = arr => {
  // console.log(arr[285]);
  const compute = i => {
    let command = arr[i];
    let [first, second] = arr.slice(i + 1, i + 3);

    let isFirstImmediate, isSecondImmediate, isThirdImmediate;
    if (command > 10) {
      let operations = String(command);
      command = +operations.slice(operations.length - 2);
      isFirstImmediate = +operations.slice(
        operations.length - 3,
        operations.length - 2
      );
      isSecondImmediate = +operations.slice(
        operations.length - 4,
        operations.length - 3
      );
      isThirdImmediate = +operations.slice(
        operations.length - 5,
        operations.length - 4
      );
    }

    if (!isFirstImmediate) {
      first = arr[first];
    }

    if (!isSecondImmediate) {
      second = arr[second];
    }

    if (command === operation.ADD) {
      if (isThirdImmediate) {
        arr[i + 3] = first + second;
      } else {
        arr[arr[i + 3]] = first + second;
      }
      compute(i + 4);
    } else if (command === operation.MULTIPLY) {
      if (isThirdImmediate) {
        arr[i + 3] = first * second;
      } else {
        arr[arr[i + 3]] = first * second;
      }
      compute(i + 4);
    } else if (command === operation.INPUT) {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
      });
      readline.question(`Enter input: `, entered => {
        if (isFirstImmediate) {
          arr[i + 1] = +entered;
        } else {
          arr[arr[i + 1]] = +entered;
          // console.log("setting arr[", arr[i + 1], "] to ", +entered);
        }
        // console.log(arr[225]);
        compute(i + 2);
        readline.close();
      });
    } else if (command === operation.OUTPUT) {
      if (isFirstImmediate) {
        console.log(arr[i + 1]);
      } else {
        console.log(arr[arr[i + 1]]);
      }
      compute(i + 2);
    } else if (command === operation.JUMP_IF_TRUE) {
      let val = isFirstImmediate ? arr[i + 1] : arr[arr[i + 1]];
      // console.log("isFirstImmediate", isFirstImmediate, "val", val);
      if (val !== 0) {
        if (isSecondImmediate) {
          compute(arr[i + 2]);
        } else {
          compute(arr[arr[i + 2]]);
        }
      } else {
        compute(i + 3);
      }
    } else if (command === operation.JUMP_IF_FALSE) {
      let val = isFirstImmediate ? arr[i + 1] : arr[arr[i + 1]];
      if (val === 0) {
        if (isSecondImmediate) {
          compute(arr[i + 2]);
        } else {
          compute(arr[arr[i + 2]]);
        }
      } else {
        compute(i + 3);
      }
    } else if (command === operation.LESS_THAN) {
      if (isThirdImmediate) {
        arr[i + 3] = first < second ? 1 : 0;
      } else {
        arr[arr[i + 3]] = first < second ? 1 : 0;
      }
      compute(i + 4);
    } else if (command === operation.EQUALS) {
      if (isThirdImmediate) {
        arr[i + 3] = first === second ? 1 : 0;
      } else {
        arr[arr[i + 3]] = first === second ? 1 : 0;
      }
      compute(i + 4);
    } else if (command === operation.HALT) {
      return arr;
    } else {
      console.log(command, "is not a command");
    }
  };
  compute(0);
};

fs.readFile(testFile, "utf8", function(err, data) {
  if (err) throw err;
  data = data.split(",").map(num => +num);
  computeIntCode(data);
});
