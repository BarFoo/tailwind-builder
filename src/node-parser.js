import allNodes from "./data/nodes";

// TODO: Figure out a clever performant way of matching convenient nodes like container and grid
// We could use an array but during testing iterating over such an array for every node is far
// slower than object key approach like below..
const mappings = {
  div: allNodes.divNode,
  h1: allNodes.headingNode,
  h2: allNodes.headingNode,
  h3: allNodes.headingNode,
  h4: allNodes.headingNode,
  h5: allNodes.headingNode,
  h6: allNodes.headingNode,
};

/**
 * Takes a given html string and returns builder equivalent nodes
 * @param string html
 */
export const htmlToNodes = (html) => {
  // Work with a temporary template for traversing the html
  let template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;

  const nodes = [];

  if (template.content.hasChildNodes()) {
    for (let c = 0; c < template.content.children.length; c++) {
      const child = template.content.children[c];
      const tagName = child.tagName.toLowerCase();
      if (mappings[tagName]) {
        let node = { ...mappings[tagName] };
        if (child.classList) {
          node.utilities = child.classList.toString().split(" ");
        }
        // todo: Tidy this up.. its somewhat messy
        if (node.settings) {
          if (node.settings.type) {
            node.settings.type.value = tagName;
          }
          if (node.settings.text) {
            node.settings.text.value = child.innerText.trim();
          }
        }
        nodes.push(node);
      }
    }
  }

  template = undefined;
  return nodes;
};
