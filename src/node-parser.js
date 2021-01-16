import { getNodeId } from "./node-id";
import { cloneDeep } from "lodash-es";
import nodeTypes from "./data/node-types";
import { capitalizeFirstLetter } from "./functions";
import InputText from "./settingControls/InputText.svelte";

// TODO: Figure out a clever performant way of matching convenient node types like container and grid..
export const findNodeType = (searchTag) => {
  let matchingNode;
  searchTag = searchTag.toLowerCase();
  for (const [k, node] of Object.entries(nodeTypes)) {
    if (node && node.tag === searchTag) {
      matchingNode = node;
      break;
    }
  }
  return matchingNode;
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
      const childEl = template.content.children[c];
      const tag = childEl.tagName.toLowerCase();

      // Support node types that are not builder defined
      const nodeType = findNodeType(tag) || {
        tag,
        name: capitalizeFirstLetter(tag),
        utilities: [],
      };

      let node = cloneDeep(nodeType);
      node.id = getNodeId();
      node.parentId = parentId;

      if (childEl.classList && childEl.classList.length > 0) {
        node.utilities = childEl.classList
          .toString()
          .split(" ")
          .filter((cl) => cl.trim() !== "");
      }

      // todo: Tidy this up.. its messy
      node.settings = node.settings || {};

      if (node.settings.type) {
        node.settings.type.value = tag;
      }

      if (node.settings.text) {
        let textVal;
        if (node.tag === "input") {
          textVal = childEl.value;
        } else {
          textVal = childEl.innerText.trim();
        }
        node.settings.text.value = textVal;
      }

      if (childEl.attributes && childEl.attributes.length) {
        for (let a = 0; a < childEl.attributes.length; a++) {
          const attr = childEl.attributes[a];
          const nodeName = attr.nodeName.toLowerCase();

          if (nodeName === "class") {
            continue;
          }

          node.settings[nodeName] = node.settings[nodeName] || {
            displayName: capitalizeFirstLetter(nodeName),
            attrName: nodeName,
            displayType: InputText,
          };

          node.settings[nodeName].value = attr.nodeValue;
        }
      }

      // If an element has no children, but it does have inner text, assign the text setting to the inner text
      // Iterate and concatenate the text node children of this
      let childText = "";
      for (
        var childNodeIndex = 0;
        childNodeIndex < childEl.childNodes.length;
        childNodeIndex++
      ) {
        const childElChildNode = childEl.childNodes[childNodeIndex];
        if (
          childElChildNode.nodeType === Node.TEXT_NODE &&
          childElChildNode.nodeValue &&
          childElChildNode.nodeValue.trim() !== ""
        ) {
          childText += childElChildNode.nodeValue.trim() + " ";
        }
      }

      if (childText.length > 0) {
        node.settings.text = node.settings.text || {
          displayName: "Text",
          displayType: InputText,
        };
        node.settings.text.value = childText.trim();
      }

      if (childEl.children && childEl.children.length > 0) {
        node.children = htmlToNodes(childEl.innerHTML, node.children, node.id);
      }

      nodes.push(node);
    }
  }

  template = undefined;
  return nodes;
};
