<script>
  import { createEventDispatcher } from 'svelte';
  import { nodeInstances } from './stores/node-instances';

  export let node;
  export let selectedNodeId;

  const dispatch = createEventDispatcher();

  function handleNodeClick(e) {
    dispatch('nodeClick', {
      mouseEvent: e,
      node: node
    });
  }

  function handleNodeFocus() {
    dispatch('nodeFocus', {
      node: node
    });
  }

  function handleNodeKey(e) {
    console.log('Handle node key dispatch');
    dispatch('nodeKey', {
      keyEvent: e,
      node: node
    });
  }
</script>

<div class="component border-dashed border border-gray-400 relative {node.builderClasses} {node.instanceClasses}"
    title="Click on the name to rename it. Delete or backspace to remove this node."
    class:is-selected={node.id === selectedNodeId}
    on:click|self={handleNodeClick}
    on:focus|self={handleNodeFocus}
    on:keyup|self={handleNodeKey}
    bind:this={$nodeInstances[node.id]}
    tabindex={node.id}>
    <div
      class="legend absolute top-0 left-0 z-50 text-xs bg-gray-200 opacity-50 p-1 text-center"
      contenteditable="true"
      bind:textContent={node.name}
      tabindex="-1">
      {node.name}
    </div>
    <svelte:component
      this={node.component}
      bind:node={node}>
      {#each node.children as child (child.id)}
          <svelte:self bind:node={child} selectedNodeId={selectedNodeId}
          on:nodeClick={handleNodeClick}
          on:nodeFocus={handleNodeFocus}
          on:nodeKey={handleNodeKey} />
      {/each}
    </svelte:component>
</div>

<style>
  .component.is-selected {
    border: solid 2px black;
  }
  .container-root {
    min-height: 8rem;
  }
  .container-child {
    min-height: 4rem; 
  }
</style>