<script>
  import { createEventDispatcher } from 'svelte';
  import { selectedNode } from './stores';

  export let node;
  export let cssClasses;
  export let selectedNodeId;

  const dispatch = createEventDispatcher();

  function handleNodeClick(e) {
    dispatch('nodeClick', {
      mouseEvent: e,
      node: node
    });
  }

  function handleNodeKeyUp(e) {
    dispatch('nodeKeyUp', {
      keyEvent: e,
      node: node
    });
  }

  function handleChildNodeKeyUp(evt) {
    dispatch('nodeKeyUp', evt.detail);
  }

  function handleChildNodeClick(evt) {
    dispatch('nodeClick', evt.detail);
  }

  function handleLegendKeyDown(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
      return false;
    }
  }

  function handleLegendKeyUp(e) {
    node.name = $selectedNode.name = e.target.innerText;
    dispatch('nodeRenamed');
  }

  $: selectedNodeId = $selectedNode ? $selectedNode.id : -1;

</script>

<div class="{cssClasses}"
    title="Click on the name to rename it. Delete or backspace to remove this node."
    on:click|stopPropagation={handleNodeClick}
    on:keyup|stopPropagation={handleNodeKeyUp}
    tabindex={node.id}>
    <svelte:component
    this={node.component}
    {node}
    {selectedNodeId}>
      <div class="legend absolute top-0 left-0 z-50 text-xs bg-gray-200 opacity-50 p-1 text-center" tabindex="-1">
       <div contenteditable on:keydown|self|stopPropagation={handleLegendKeyDown} 
       on:keyup|stopPropagation={handleLegendKeyUp}>{node.name}</div> 
      </div>
      {#each node.children as child (child.id)}
        <svelte:self 
        bind:node={child} 
        {selectedNodeId}
        on:nodeKeyUp={handleChildNodeKeyUp}
        on:nodeClick={handleChildNodeClick}
        cssClasses="component-child" />
      {/each}
  </svelte:component>
</div>

<style>
  .legend {
    pointer-events: all;
  }
  div {
    outline: none;
  }
</style>