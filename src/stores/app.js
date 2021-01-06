import { writable } from 'svelte/store';
import pageSettings from  '../data/page-settings';

export const app = writable(JSON.parse(localStorage.getItem("app")) || {
  nodes: [],
  nodeIdIncrement: 0,
  pageSettings: Object.assign([], pageSettings),
  selectedNode: null,
  pageClasses: ''
});