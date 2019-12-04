/*
Write a function merge_ranges[] that takes a list of multiple meeting time ranges and returns a list of condensed ranges.

For example, given:

  [[0, 1], [3, 5], [4, 8], [10, 12], [9, 10]]

your function would return:

  [[0, 1], [3, 8], [9, 12]]

  */

function merge_ranges(times) {
  let merged = [];
  for (let [start, end] of times) {
    let merge = false;
    for (let i = 0; i < merged.length; i++) {
      if (start <= merged[i][0] && end >= merged[i][0]) {
        merged[i][0] = start;
        merge = true;
      }
      if (start <= merged[i][1] && end >= merged[i][1]) {
        merged[i][1] = end;
        merge = true;
      }
    }
    if (!merge) {
      merged.push([start, end]);
    }
  }
  if (times.length !== merged.length) {
    // return merge_ranges(merged);
  }
  return merged;
}

console.log(
  merge_ranges([
    [0, 1],
    [3, 5],
    [4, 8],
    [10, 12],
    [9, 10]
  ])
);
