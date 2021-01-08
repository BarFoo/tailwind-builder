<script>
  import { beforeUpdate } from 'svelte';

  export let node;
  export let selectedNodeId;

  $: isSelected = selectedNodeId === node.id;

  beforeUpdate(() => {
    isSelected = selectedNodeId === node.id;
  });
</script>

<div class="{node.instanceClasses}" class:is-selected={isSelected}>
  <slot></slot>
</div>

<style>
  div {
    position: relative;
  }
  div:empty  {
    border: dashed 1px gray;
    min-height: 18rem;
  }
  div > div, main, header, footer, aside, article {
    border: dashed 1px gray;
    min-height: 18rem;
  }
</style>