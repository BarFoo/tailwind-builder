<script context="module">
	const _expansionState = {}
</script>
<script>
  import { nodes, selectedNode } from './stores';
  import icons from './allIcons';
  import { nodeManager } from './nodeManager';
  import { createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let node;
  $: children = node.children;

  let expanded = _expansionState[node.id] || true;
	const toggleExpansion = () => {
    expanded = _expansionState[node.id] = !expanded;
  };
  const toggleActive = () => {
    isActive ? $selectedNode = null : $selectedNode = node;
  };
  

  $: arrowDown = expanded;
  $: isActive = $selectedNode !== null && $selectedNode.id === node.id;

  let nameInstance;

  function doRename() {
    nameInstance.contentEditable = true;
    nameInstance.focus();
  }

  function handleRenameKeyDown(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
      return false;
    }
  }

  function handleRenameKeyUp(e) {
    const newName = e.target.innerText;
    if($selectedNode) {
      $selectedNode.name = newName;
    }
    node.name = newName;
    dispatch('nodeRenamed');
  }

  function handleNodeKeyUp() {

  }
</script>

<ul class="treeview text-sm" title="Double click to toggle state, right click for menu.">
  <li class="treeview__item" on:keyup={handleNodeKeyUp}>
    {#if children.length > 0}
      <span class="arrow align-middle" class:arrowDown on:click={toggleExpansion}><svelte:component this={icons['RightArrow']} /></span>
      <span bind:this={nameInstance} on:keyup={handleRenameKeyUp} on:keydown={handleRenameKeyDown}
        on:blur={() => nameInstance.contenteditable = false}
        contenteditable=false class:isActive on:click={toggleActive}>{node.name}</span>
      {#if expanded}
        {#each children as child}
          <svelte:self node={child} />
        {/each}
      {/if}
    {:else}
      <span class="inline-block align-middle"><svelte:component this={icons['Radix']}></svelte:component></span>
      <span class="inline-block" bind:this={nameInstance} 
        on:blur={() => nameInstance.contentEditable = false} on:keyup={handleRenameKeyUp} on:keydown={handleRenameKeyDown}
        contenteditable=false on:click={toggleActive} class:isActive>{node.name}</span>
    {/if}
  </li>
</ul>

<style>
  .treeview {
    list-style: none;
    margin: 0 0 2px 0;
    padding: 0;
  }
  :global(.treeview__item > .treeview){
    padding-left: 1.2rem;
  }
  .treeview__item {
    cursor: pointer;
  }
  .arrowDown { transform: rotate(90deg); }
  .arrow {
		display: inline-block;
    cursor: pointer;
	}
  .isActive {
    font-weight: bold;
  }
</style>