/*
         1
       /   \
      2     2
     / \   / \
    3   3 
   / \   
   4  4 
*/

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Queue {
  constructor() {
    this.contents = [];
  }

  enqueue(item) {
    this.contents.push(item);
  }

  dequeue() {
    if (this.size > 0) {
      return this.contents.shift();
    }
  }

  get size() {
    return this.contents.length;
  }
}

var isBalanced = function(root) {
  let minDepth = 0;
  let maxDepth = 0;
  let q = new Queue();

  function search(node, depth) {
    if (node.left !== null) {
      q.enqueue([node.left, depth + 1]);
    }
    if (node.right !== null) {
      q.enqueue([node.right, depth + 1]);
    }
  }

  search(root, 0);
  while (q.size > 0) {
    let dq = q.dequeue();
    if (dq !== null) {
      let node = dq[0];
      let depth = dq[1];
      if (!node.left && !node.right) {
        if (!minDepth) {
          minDepth = depth;
        }
        if (depth > maxDepth) {
          maxDepth = depth;
        }
      } else {
        search(node, depth);
        // console.log("queue after searching", q);
      }
    }
  }
  return maxDepth - minDepth < 2;
};

let test = new Node(
  1,
  new Node(2, new Node(3, new Node(4)), new Node(3, new Node(4))),
  new Node(2)
);

console.log(isBalanced(test));
