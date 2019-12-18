const buildAdjacency = prereqs => {
  let adjacency = {};
  for (let [prereq, course] of prereqs) {
    if (!adjacency[prereq]) {
      adjacency[prereq] = [course];
    } else {
      adjancency[prereq].push(course);
    }
    if (!adjacency.hasOwnProperty(course)) {
      adjacency[course] = null;
    }
  }
  return adjacency;
};

const canFinish = function(numCourses, prerequisites) {
  let adjacency = buildAdjacency(prerequisites);
  let foundPath = false;
  let currentPath = [];

  const searchNodes = course => {
    if (foundPath || currentPath.length > numCourses) return;
    if (adjacency[course] === null) {
      foundPath = true;
      for (let c of Object.keys(adjacency)) {
        if (!currentPath.includes(c) && c !== course) {
          foundPath = false;
        }
      }
      return;
    }

    for (let next of adjacency[course]) {
      currentPath.push("" + next);
      searchNodes(next);
      currentPath.pop();
    }
  };

  for (let course of Object.keys(adjacency)) {
    currentPath.push(course);
    searchNodes(course);
    currentPath.pop();
  }

  return foundPath;
};

console.log(
  canFinish(3, [
    [1, 0],
    [0, 3]
  ])
);
