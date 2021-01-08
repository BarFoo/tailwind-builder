import { get } from 'svelte/store';
import { nodeIdIncrement } from './stores';
import { deepClone } from './functions';
import Grid from './Grid.svelte';
import Container from './Container.svelte';

const componentTypes = {
  'Container': Container,
  'Grid': Grid
};

class NodeManager {

  createNode(nodeType) {

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
      instanceClasses: utilities.map(u => u.value).join(' '),
      settings: settings,
      html: ''
    };

    nodeIdIncrement.update(n => n + 1);
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
}

export const nodeManager = new NodeManager();