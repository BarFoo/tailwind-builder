import { writable } from "svelte/store";
import { getNodeId } from "./node-id";
import { cloneDeep } from "lodash-es";

export const selectedNode = writable(null);
export const pageUtilities = writable([]);
export const activeMenuItem = writable(-1);
export const previewBreakpoint = writable("desktop");
export const previewInstance = writable(null);
export const previousBreakpoint = writable(null);

function createNodes() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    set,
    add(node, parentId) {
      const newNode = cloneDeep(node);
      newNode.id = getNodeId();
      newNode.parentId = parentId;
      update((state) => {
        if (newNode.parentId) {
          const parent = this.find(newNode.parentId, state);
          if (parent.canHaveChildren) {
            parent.children = parent.children || [];
            parent.children = [...parent.children, newNode];
          }
          return [...state];
        }
        return [...state, newNode];
      });
    },
    find(id, start) {
      let matching;
      for (let i = 0; i < start.length; i++) {
        if (start[i].id === id) {
          matching = start[i];
          break;
        }

        if (start[i].children && start[i].children.length) {
          matching = find(id, start[i].children);
        }
      }
      return matching;
    },
    remove(id) {
      const r = (start) => {
        for (let i = 0; i < start.length; i++) {
          if (start[i].id === id) {
            start.splice(i, 1);
            break;
          }

          if (start[i].children && start[i].children.length) {
            r(start[i].children);
          }
        }
      };
      update((state) => {
        r(state);
        return [...state];
      });
    },
    refresh() {
      update((state) => {
        return [...state];
      });
    },
    reset() {
      set([]);
    },
  };
}

export const nodes = createNodes();
