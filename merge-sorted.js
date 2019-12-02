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
  let head = new ListNode();
  let node = head;
  while (l1 && l2) {
    let val;
    if (!l1 || l2.val < l1.val) {
      val = l2.val;
      l2 = l2.next;
    } else {
      val = l1.val;
      l1 = l1.next;
    }
    node.next = new ListNode(val);
    node = node.next;
  }
};
