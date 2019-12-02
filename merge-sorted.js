/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

var mergeTwoLists = function(l1, l2) {
  if (!l1 && !l2) return null;
  let head = new ListNode();
  let node = head;
  let prev;
  while (l1 && l2) {
    let val;
    prev = node;
    if (l2.val < l1.val) {
      val = l2.val;
      l2 = l2.next;
    } else {
      val = l1.val;
      l1 = l1.next;
    }
    node.val = val;
    node.next = new ListNode();
    node = node.next;
  }
  while (l1) {
    node.val = l1.val;
    node.next = new ListNode();
    prev = node;
    node = node.next;
    l1 = l1.next;
  }
  while (l2) {
    node.val = l2.val;
    node.next = new ListNode();
    prev = node;
    node = node.next;
    l2 = l2.next;
  }
  if (prev) prev.next = null;

  return head;
};
