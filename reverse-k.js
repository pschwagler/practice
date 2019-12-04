class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }

  printAll() {
    let node = this;
    let arr = [this.val];
    let i = 0;
    while (node.next && i++ < 5) {
      arr.push(node.next.val);
      node = node.next;
    }
    console.log(arr.join(", "));
  }
}

var reverseKGroup = function(head, k) {
  let reverse = [];
  let node = head;
  for (let i = 0; i < k; i++) {
    reverse.push(node);
    node = node.next;
    if (!node) return head;
  }

  head = reverse.pop();
  let tmp = head;
  while (reverse.length) {
    tmp.next = reverse.pop();
    tmp = tmp.next;
  }

  head.printAll();

  while (node) {
    for (let i = 0; i < k; i++) {
      reverse.push(node);
      node = node.next;
      if (!node) return head;
    }

    tmp.next = reverse.pop();
    tmp = tmp.next;
    while (reverse.length) {
      tmp.next = reverse.pop();
      tmp = tmp.next;
    }
    head.printAll();
  }
  return head;
};

//Tests
let n1 = new Node(1, new Node(2, new Node(3, new Node(4, new Node(5)))));

reverseKGroup(n1, 3);
