<script>
  import { selectedNode } from '../stores';

  export let node;

  $: isSelected = $selectedNode !== null ? $selectedNode.id === node.id : false;
</script>

<div class="{node.instanceClasses}" class:is-selected={isSelected}>
  <slot></slot>
</div>

<style>
  div {
    border: dashed 1px gray;
    position: relative;
    min-height: 12rem;
  }
</style>