import allNodes from "./data/nodes";

import { getNodeId } from "./node-id";
import { cloneDeep } from "lodash-es";

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
export const htmlToNodes = (html, nodes, parentId) => {
  // Work with a temporary template for traversing the html
  let template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;

  nodes = nodes || [];
  parentId = parentId || -1;

  if (template.content.hasChildNodes()) {
    for (let c = 0; c < template.content.children.length; c++) {
      const child = template.content.children[c];
      const tagName = child.tagName.toLowerCase();
      if (mappings[tagName]) {
        let node = cloneDeep(mappings[tagName]);
        node.id = getNodeId();
        node.parentId = parentId;
        if (child.classList && child.classList.length > 0) {
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
        if (child.children && child.children.length > 0) {
          node.children = htmlToNodes(child.innerHTML, node.children, node.id);
        }
        nodes.push(node);
      }
    }
  }

  template = undefined;
  return nodes;
};
