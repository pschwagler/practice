class Node {
  constructor(val, left = null, right = null) {
    this.value = val;
    this.left = left;
    this.right = right;
  }
}

const createBST = function(sortedArr) {
  let rootNode = new Node(sortedArr[0]);

  const constructNode = (start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    let node = new Node(sortedArr[mid]);
    node.left = constructNode(start, mid - 1);
    node.right = constructNode(mid + 1, end);
    return node;
  };

  return constructNode(0, sortedArr.length - 1);
};

// let nodes = [1, 2, 3, 4, 5, 6, 7];
// let BST = createBST(nodes);
// console.log(BST.value);
// console.log(BST.left.value);
// console.log(BST.left.right.value);
// console.log(BST.left.left.value);
// console.log(BST.right.value);
// console.log(BST.right.left.value);
// console.log(BST.right.right.value);
