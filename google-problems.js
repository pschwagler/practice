/* Giving back to the LC community!

Round 1: (failed on time, eventually got the solution) --> didn't read through it correctly and got stuck implementing simple solution

https://leetcode.com/problems/repeated-substring-pattern/
Round 2:

Implement Auto-complete. Let's say we have a dictionary of valid words. When a user enters a prefix like "app", we should return top 5 words that match words in our dictionary like "application" or "apple". 
This question involved both design and code. Let's say given a prefix, you get 100 candidates, what makes your list of the top 5?

Round 3: (give a meh)

Given a long string (words & spaces) and a document width (# of characters), return the number of lines the document will have. We can't split words, so that means a word goes to the new line if the entire word cannot fit in the current line. Basically, this is like when Google Doc puts words on the next line as opposed to truncating the word at the end of the line. For simplicity, let's say there is no word that is longer than the width of document.
Follow up: Let's say we want to split the document into two columns. You are given two sets of text. One is for the left column while the other is for the right column (like in a newspaper). You want to find the column position (between 1 and document width) such that the final number of total lines from both sides of the column are as close to each other as possible. Example, if you move the column to the left, number of lines in left column increases because it's narrower while number of lines in right column decreases because it's wider.
Round 4: Pass I think!

https://leetcode.com/problems/long-pressed-name/
Given a string S1, is it an "extension" of another string S2? For example, "heeeeelllooooo" is an extension of "helo". The characters in S2 follow the same order as those in S1, but S1 has consecutive repeats of characters. First function, return true if S1 is an extension of S2.
Follow up 1: what if S2 is "hello" where characters can be appear at most twice in a row? In this case, if S1 was "hhheeeeloo", it would return false.
Round 5: [Behavioral]

Let's say you have noticed that two teams are working on very similar problems but are unaware that they both are. How would you get them to work together so they are not repeating work? In what cases is this not a good idea? What if both team leaders believe that their own implementation / algorithms are better and won't compromise?
Getting the offer and waiting for team matching. Good luck y'all!

*/

// ROUND 1
/* Given a non-empty string check if it can be constructed by taking a substring of it and appending multiple 
  copies of the substring together. You may assume the given string consists of lowercase English letters only and its length will not exceed 10000. */
var repeatedSubstringPattern = function(s) {
  function isMultiple(substr) {
    if (s.length % substr.length !== 0) return false;
    for (let i = 0; i < s.length; i += substr.length) {
      if (substr !== s.substr(i, substr.length)) return false;
    }
    return true;
  }

  for (let len = 1; len < Math.floor(s.length / 2) + 1; len++) {
    // console.log("testing if ", s.substr(0, len), "for", s);
    if (isMultiple(s.substr(0, len))) return true;
  }

  return false;
};
// 3 --> 1
// 4 --> 1, 2
// 5 --> 1, 2
// 6 --> 1, 2, 3
// console.log(repeatedSubstringPattern("aba"), "(false)");
// console.log(repeatedSubstringPattern("abab"), "(true)");
// console.log(repeatedSubstringPattern("abcab"), "(false)");
// console.log(repeatedSubstringPattern("abcabc"), "(true)");
// console.log(repeatedSubstringPattern("abcdefghabcdefgh"), "(true)");
// console.log(repeatedSubstringPattern("ababababab"), "(true)");
// console.log(repeatedSubstringPattern("ababababac"), "(false)");

// ROUND 3
/* ound 3:

Given a long string (words & spaces) and a document width (# of characters), return the number of lines the document will have. We can't split words, 
so that means a word goes to the new line if the entire word cannot fit in the current line. Basically, this is like when Google Doc puts words on the 
next line as opposed to truncating the word at the end of the line. For simplicity, let's say there is no word that is longer than the width of document.

Follow up: Let's say we want to split the document into two columns. You are given two sets of text. One is for the left column while the other is for 
the right column (like in a newspaper). You want to find the column position (between 1 and document width) such that the final number of total lines 
from both sides of the column are as close to each other as possible. Example, if you move the column to the left, number of lines in left column increases 
because it's narrower while number of lines in right column decreases because it's wider.
*/

const numLines = (str, width) => {
  let words = str.split(" ");
  let count = 1;
  let lineCount = 1;
  // let line = [];
  for (let word of words) {
    // line.push(word);
    lineCount += word.length + 1;
    if (lineCount > width + 1) {
      // line.pop();
      // console.log(line.join(" "));
      count++;
      lineCount = word.length + 1;
      // line = [word];
    }
  }
  // console.log(line.join(" "));
  return count;
};

// console.log(numLines("my first day on the job was fun", 7), 4);
const equalizeWidth = (str1, str2, width) => {
  let width1 = Math.floor(width / 2);
  let minDiff = Number.POSITIVE_INFINITY;
  let bestResult = [width1, width - width1];

  const search = (start, end) => {
    if (minDiff === 0 || start > end) {
      return;
    }
    width1 = Math.floor((start + end) / 2);
    let num1 = numLines(str1, width1);
    let num2 = numLines(str2, width - width1);
    let lineDiff = num1 - num2;
    // console.log(
    //   "searching at ",
    //   start,
    //   "vs",
    //   end,
    //   "now checking",
    //   width1,
    //   "vs",
    //   width - width1,
    //   num1,
    //   "vs",
    //   num2,
    //   "diff = ",
    //   lineDiff
    // );
    if (Math.abs(lineDiff) < minDiff) {
      minDiff = Math.abs(lineDiff);
      bestResult = [width1, width - width1];
    }
    if (lineDiff > 0) {
      // 1 column has more lines
      search(width1 + 1, end);
    } else {
      search(start, width1 - 1);
    }
  };
  search(1, width - 1);
  return bestResult;
};
// console.log(
//   equalizeWidth(
//     "my first day on the job was fun",
//     "my first day stunk really badly, like really really badly",
//     12
//   )
// );
// search at 6, 6
// search at

/* Round 4:

https://leetcode.com/problems/long-pressed-name/
Given a string S1, is it an "extension" of another string S2? For example, "heeeeelllooooo" is an extension of "helo". 
The characters in S2 follow the same order as those in S1, but S1 has consecutive repeats of characters. First function, return true if S1 is an extension of S2.
Follow up 1: what if S2 is "hello" where characters can be appear at most twice in a row? In this case, if S1 was "hhheeeeloo", it would return false.
*/
// 012345
// heello
// hello
// 01234

function isExtension(s1, s2) {
  // console.log(
  //   s1
  //     .split("")
  //     .map((char, index) => [char, index])
  //     .join("  ")
  // );
  // console.log(
  //   s2
  //     .split("")
  //     .map((char, index) => [char, index])
  //     .join("  ")
  // );
  let i1 = 0;
  let i2 = 0;

  while (i1 < s1.length || i2 < s2.length) {
    // console.log(i1, s1[i1], "vs", i2, s2[i2]);
    if (s1[i1] !== s2[i2]) {
      return false;
    }

    if (s2[i2 + 1] === s2[i2]) {
      i2++;
      i1++;
    } else {
      while (s1[i1 + 1] === s1[i1]) {
        i1++;
      }
      i1++;
      i2++;
    }
  }
  return true;
}

// rewrote to see if I could get quickly after exploring solution
function isExtension2(s1, s2) {
  let i1 = 0;
  let i2 = 0;

  while (i1 < s1.length || i2 < s2.length) {
    if (s1[i1] !== s2[i2]) return false;
    if (s2[i2 + 1] === s2[i2]) {
      i1++;
      i2++;
    } else {
      while (s1[i1 + 1] === s1[i1]) i1++;
      i1++;
      i2++;
    }
  }
  return true;
}

// console.log(isExtension2("heeeeellllllloooo", "helloooo"));
