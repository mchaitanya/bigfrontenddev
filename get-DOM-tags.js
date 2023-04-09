// https://bigfrontend.dev/problem/get-DOM-tags

/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  // DFS the tree
  function dfs(node, set) {
    if (node == null) return;
    set.add(node.tagName.toLowerCase());
    for (const child of node.children) {
      dfs(child, set);
    }
  }

  const set = new Set();
  dfs(tree, set);
  return Array.from(set);
}
