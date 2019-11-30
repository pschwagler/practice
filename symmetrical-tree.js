/* Good morning! Here's your coding interview problem for today.

This problem was asked by Amazon.

A tree is symmetric if its data and shape remain unchanged when it is reflected about the root node. The following tree is an example:

        4
      / | \
    3   5   3
  /           \
9              9
Given a k-ary tree, determine whether it is symmetric.
*/

class Node {
  constructor(val, children = []) {
    this.value = val;
    this.children = children;
  }

  toString() {
    return this.value;
  }
}

function isSymmetrical(root) {
  let symmetric = true;

  function checkSymmetry(node) {
    if (!symmetric) return;
    if (node.children.length > 0) {
      let l = 0;
      let r = node.children.length - 1;
      while (r > l) {
        // console.log(
        //   node.children,
        //   "l:",
        //   l,
        //   "r:",
        //   r,
        //   "l:",
        //   node.children[l],
        //   "r:",
        //   node.children[r]
        // );
        if (
          node.children[l].children.length !==
            node.children[r].children.length ||
          node.children[l].value !== node.children[r].value
        ) {
          return (symmetric = false);
        }
        checkSymmetry(node.children[l]);
        checkSymmetry(node.children[r]);
        l++;
        r--;
      }
      if (l === r) {
        checkSymmetry(node.children[l]);
      }
    }
  }
  checkSymmetry(root);
  return symmetric;
}

// test

let node = new Node(4, [
  new Node(3, [new Node(9)]),
  new Node(5),
  new Node(3, [new Node(3)])
]);

console.log(isSymmetrical(node));
