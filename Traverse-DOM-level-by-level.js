// https://bigfrontend.dev/problem/Traverse-DOM-level-by-level/

/**
 * @param {HTMLElement | null} root
 * @return {HTMLElement[]}
 */
function flatten(root) {
  if (root == null) return [];

  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    for (const child of node.children) {
      queue.push(child);
    }
  }
  return result;
}
