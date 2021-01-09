import { get } from 'svelte/store';
import { nodeIdIncrement } from './stores';
import { deepClone } from './functions';
import Grid from './Grid.svelte';
import Container from './Container.svelte';
import HeadingComponent from './HeadingComponent.svelte';

const componentTypes = {
  'Container': Container,
  'Grid': Grid,
  'Heading': HeadingComponent
};

class NodeManager {

  createNode(nodeType, parentId = -1) {

    if(nodeType.componentType === null) {
      return;
    }

    const id = get(nodeIdIncrement);
    const utilities = deepClone(nodeType.defaultUtilities);
    const settings = deepClone(nodeType.settings);

    const node = {
      id: id,
      name: nodeType.displayName,
      component: componentTypes[nodeType.componentType],
      componentType: nodeType.componentType,
      icon: nodeType.icon,
      children: [],
      utilities: utilities,
      instanceClasses: utilities.join(' '),
      settings: settings,
      html: '',
      parentId: parentId
    };

    nodeIdIncrement.update(n => n + 1);

    if(nodeType.children && nodeType.children.length > 0) {
      const childrenSize = nodeType.children.length;
      for(let i = 0; i < childrenSize; i++) {
        node.children.push(this.createNode(nodeType.children[i], parentId));
      }
    }

    return node;
  }

  deleteNode(start, id) {
    let found = false;
    const len = start.length;
    for(let i = 0; i < len; i++) {
      if(start[i].id === id) {
        start.splice(i, 1);
        found = true;
        break;
      }

      if(start[i].children.length > 0) {
        found = this.deleteNode(start[i].children, id);
      }

      if(found) {
        break;
      }
    }
    return found;
  }

  findNode(start, id) {
    const len = start.length;
    let node = null;
    for(let i = 0; i < len; i++) {
      if(start[i].id === id) {
        node = start[i];
        break;
      }

      if(start[i].children.length > 0) {
        node = this.findNode(start[i].children, id);
      }

      if(node !== null) {
        break;
      }
    }
    return node;
  }
}

export const nodeManager = new NodeManager();