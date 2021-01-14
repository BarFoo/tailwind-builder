<script>
  import { createEventDispatcher } from "svelte";
  import { selectedNode } from "./stores";

  const dispatch = createEventDispatcher();

  export let node;

  $: isSelected = $selectedNode ? $selectedNode.id === node.id : false;

  function click(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch("nodeClick", {
      evt: e,
      node
    });
  }

</script>

<svelte:component
  this={node.component}
  {isSelected}
  {node}
  on:click={click}>
    {#if node.children}
      {#each node.children as child}
        <svelte:self bind:node={child} on:nodeClick />
      {/each}
    {/if}
</svelte:component>