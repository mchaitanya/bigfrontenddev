// https://bigfrontend.dev/problem/get-DOM-tree-height/

/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(tree) {
  if (tree == null) return 0;
  let height = 0;
  for (const child of tree.children) {
    height = Math.max(height, getHeight(child));
  }
  return height + 1;
}
