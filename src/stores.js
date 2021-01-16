import { writable } from "svelte/store";
import { getNodeId } from "./node-id";
import { cloneDeep } from "lodash-es";

export const selectedNode = writable(null);
export const pageUtilities = writable(["p-4"]);
export const previewBreakpoint = writable("desktop");
export const previewInstance = writable(null);
export const previousBreakpoint = writable(null);
export const isDragEnabled = writable(false);

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
        if (newNode.parentId && newNode.parentId >= 0) {
          const parent = this.find(newNode.parentId, state);
          parent.children = parent.children || [];
          parent.children = [...parent.children, newNode];
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
          matching = this.find(id, start[i].children);
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
    swap(fromId, toId) {
      update((state) => {
        let from = this.find(fromId, state);
        let to = this.find(toId, state);
        let tmpFrom = cloneDeep(from);

        from = to;
        to = tmpFrom;

        return [...state];
      });
    },
  };
}

export const nodes = createNodes();
