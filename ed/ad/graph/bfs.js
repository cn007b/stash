/**
 * BFS - Breadth First Search.
 *
 * step 1: Put root node into queue.
 * step 2: Dequeue element, process value and put into queue node's children.
 * step 2: Goto step 2.
 *
 * @param {number} f From node.
 * @param {number} t To node.
 * @param {object} ed Edges in format: key - vertex, value - array of connected vertices.
 *                    Like: {1: [ 2, 3 ], 2: [ 1 ], 3: [ 1 ]}
 * @returns {number} -1 In case no path for nodes and positive number which is path between nodes.
 */
function bfs(f, t, ed) {
  let q = [{i: f, deep: 1}]; // queue
  let visited = []; // visited

  while (q.length > 0) {
    let curObj = q.shift();
    let c = curObj.i; // current vertex
    visited.push(c);
    if (typeof ed[c] === 'undefined') {
      // If no edges for current vertex.
      continue;
    }
    for (let i = 0; i < ed[c].length; i++) {
      let node = ed[c][i];
      if (node === t) {
        return curObj.deep;
      }
      if (visited.indexOf(node) === -1) {
        q.push({i: node, deep: curObj.deep + 1});
      }
    }
  }

  return -1;
}
