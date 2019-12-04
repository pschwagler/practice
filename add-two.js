class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const addTwoNumbers = function(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  let head = new ListNode((l1.val + l2.val) % 10);
  let node = head;
  let carry = l1.val + l2.val >= 10 ? 1 : 0;
  l1 = l1 === null ? null : l1.next;
  l2 = l2 === null ? null : l2.next;
  while (l1 || l2) {
    if (!l1) {
      node.next = new ListNode((l2.val + carry) % 10);
      carry = l2.val + carry >= 10 ? 1 : 0;
    } else if (!l2) {
      node.next = new ListNode((l1.val + carry) % 10);
      carry = l1.val + carry >= 10 ? 1 : 0;
    } else {
      node.next = new ListNode((l1.val + l2.val + carry) % 10);
      carry = l1.val + l2.val + carry >= 10 ? 1 : 0;
    }
    node = node.next;
    l1 = l1 === null ? null : l1.next;
    l2 = l2 === null ? null : l2.next;
  }
  if (carry === 1) {
    node.next = new ListNode(1);
  }
  return head;
};
