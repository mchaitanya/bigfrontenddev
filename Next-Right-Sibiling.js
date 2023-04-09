// https://bigfrontend.dev/problem/Next-Right-Sibiling/

/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling(root, target) {
  // Do level-order traversal.
  let level = [root];
  while (level.length > 0) {
    const next = [];
    for (let i = 0; i < level.length; i++) {
      const node = level[i];
      if (node === target) return i === level.length - 1 ? null : level[i + 1];
      next.push(...node.children);
    }
    level = next;
  }
  return null;
}
