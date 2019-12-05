/* Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
*/

const lengthOfLongestSubstring = function(s) {
  if (s.length === 0) return 0;
  let lastIndex = { [s[0]]: 0 };
  let curr = 1;
  let max = 1;

  for (let i = 1; i < s.length; i++) {
    let prev = lastIndex[[s[i]]];
    if (prev === undefined || i - prev > curr) {
      curr++;
    } else {
      if (curr > max) {
        max = curr;
      }
      curr = i - prev;
    }
    lastIndex[s[i]] = i;
  }

  return curr > max ? curr : max;
};

console.log(lengthOfLongestSubstring("abcbd"), 3);
console.log(lengthOfLongestSubstring("pwwkew"), 3);
console.log(lengthOfLongestSubstring("abcabcbb"), 3);
console.log(lengthOfLongestSubstring("bbbbbb"), 1);
