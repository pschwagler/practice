var fs = require("fs");
const testFile = "day-7-test.txt";

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

const computeCircuit = (orig, test) => {
  const compute = (arr, i, setting, input, output) => {
    // console.log(`i: ${i} setting: ${setting} input: ${input}`);
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
      i += 4;
    } else if (command === operation.MULTIPLY) {
      if (isThirdImmediate) {
        arr[i + 3] = first * second;
      } else {
        arr[arr[i + 3]] = first * second;
      }
      i += 4;
    } else if (command === operation.INPUT) {
      let instruction = setting;
      if (setting === null) {
        instruction = input;
        input = null;
      } else {
        setting = null;
      }
      if (isFirstImmediate) {
        arr[i + 1] = +instruction;
      } else {
        arr[arr[i + 1]] = +instruction;
      }
      i += 2;
    } else if (command === operation.OUTPUT) {
      if (isFirstImmediate) {
        output = arr[i + 1];
      } else {
        output = arr[arr[i + 1]];
      }
      i += 2;
    } else if (command === operation.JUMP_IF_TRUE) {
      let val = isFirstImmediate ? arr[i + 1] : arr[arr[i + 1]];
      if (val !== 0) {
        if (isSecondImmediate) {
          i = arr[i + 2];
        } else {
          i = arr[arr[i + 2]];
        }
      } else {
        i += 3;
      }
    } else if (command === operation.JUMP_IF_FALSE) {
      let val = isFirstImmediate ? arr[i + 1] : arr[arr[i + 1]];
      if (val === 0) {
        if (isSecondImmediate) {
          i = arr[i + 2];
        } else {
          i = arr[arr[i + 2]];
        }
      } else {
        i += 3;
      }
    } else if (command === operation.LESS_THAN) {
      if (isThirdImmediate) {
        arr[i + 3] = first < second ? 1 : 0;
      } else {
        arr[arr[i + 3]] = first < second ? 1 : 0;
      }
      i += 4;
    } else if (command === operation.EQUALS) {
      if (isThirdImmediate) {
        arr[i + 3] = first === second ? 1 : 0;
      } else {
        arr[arr[i + 3]] = first === second ? 1 : 0;
      }
      i += 4;
    } else if (command === operation.HALT) {
      return [output, i + 2];
    } else {
      console.log(command, "is not a command");
    }
    return compute(arr, i, setting, input, output);
  };

  let output = 0;
  for (let i = 0; i < test.length; i++) {
    output = compute([...orig], 0, test[i], output);
  }
  return output;
};

const getCombinations = digits => {
  class Node {
    constructor(val) {
      this.val = val;
      this.children = [];
    }
  }

  const buildTree = (node, vals) => {
    for (let i = 0; i < vals.length; i++) {
      let child = new Node(vals[i]);
      let decendants = vals.slice(0, i).concat(vals.slice(i + 1, vals.length));
      node.children.push(child);
      buildTree(child, decendants);
    }
  };
  let root = new Node("");
  buildTree(root, digits);
  let combos = [];
  let combo = [];
  const findCombos = node => {
    if (!node.children.length) return combos.push([...combo]);

    for (let i = 0; i < node.children.length; i++) {
      combo.push(node.children[i].val);
      findCombos(node.children[i]);
      combo.pop();
    }
  };
  findCombos(root);
  return combos;
};

const findMaxCode = (arr, digits) => {
  let combos = getCombinations(digits);
  // console.log(combos.length);
  let max = 0;
  let curr;
  for (let combo of combos) {
    curr = computeCircuit(arr, combo);
    if (curr > max) {
      max = curr;
    }
  }
  return max;
};

fs.readFile(testFile, "utf8", function(err, data) {
  if (err) throw err;
  data = data.split(",").map(num => +num);
  console.log(computeCircuit(data, [9, 8, 7, 6, 5]));
  // let max = findMaxCode(data, [0, 1, 2, 3, 4]);
  // console.log(max);
});

/*

3,26,1001,26,-4,26,3,27,1002,27, 2,27, 1,27,26,27, 4,27,1001,28,-1,28,1005,28, 6,99, 5, 23, 5
0  1    2  3  4  5 6  7    8  9 10 11 12 13 14 15 16 17   18 19 20 21   22 23 24 25 26 27 28


*/
