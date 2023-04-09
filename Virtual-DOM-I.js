// https://bigfrontend.dev/problem/Virtual-DOM-I/

/**
 * @param {HTMLElement}
 * @return {object} object literal presentation
 */
function virtualize(element) {
  if (element.nodeType === Node.TEXT_NODE) return element.textContent;

  const children = [];
  for (const child of element.childNodes) {
    const virtual = virtualize(child);
    if (typeof virtual !== "string" || virtual.trim() !== "") {
      children.push(virtual);
    }
  }

  const props = {};
  for (const attribute of element.attributes) {
    let name = attribute.name;
    if (name === "class") {
      name = "className";
    }
    props[name] = attribute.value;
  }

  if (children.length > 0) {
    if (children.length == 1 && typeof children[0] === "string") {
      props.children = children[0];
    } else {
      props.children = children;
    }
  }

  const result = { type: element.tagName.toLowerCase() };
  if (Object.keys(props).length > 0) {
    result.props = props;
  }
  return result;
}

// const html = document.createElement("div");
// html.innerHTML = `<h1> this is </h1><p class="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a></p>`;
// console.log(virtualize(html));

/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement}
 */
function render(obj) {
  // your code here
}
