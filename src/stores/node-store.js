import { writable } from 'svelte/store';
export let nodeStore = writable({});
export let nodeStoreIdIncrement = writable(0);