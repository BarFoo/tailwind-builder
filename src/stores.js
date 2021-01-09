import { writable } from 'svelte/store';

export const selectedNode = writable(null);
export const nodes = writable([]);
export const nodeIdIncrement = writable(0);
export const pageUtilities = writable([]);
export const pageClasses = writable('');
export const activeMenuItem = writable(-1);