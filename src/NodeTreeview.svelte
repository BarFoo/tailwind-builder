<script context="module">
	const _expansionState = {}
</script>
<script>
  import { selectedNode } from './stores';
  import icons from './icons';
  import { nodeManager } from './nodeManager';
  import { createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let node;
  $: children = node.children;

  let expanded = _expansionState[node.id] || true;
	const toggleExpansion = () => {
		expanded = _expansionState[node.id] = !expanded;
	}
  $: arrowDown = expanded;

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
</script>

<ul class="treeview text-sm" title="Double click to rename, right click for menu. This has better sorting.">
  <li class="treeview__item">
    {#if children.length > 0}
      <span class="arrow align-middle" class:arrowDown on:click={toggleExpansion}><svelte:component this={icons['RightArrow']} /></span>
      <span bind:this={nameInstance} on:dblclick={doRename} 
        on:blur={() => nameInstance.contenteditable = false}
        contenteditable=false>{node.name}</span>
      {#if expanded}
        {#each children as child}
          <svelte:self node={child} />
        {/each}
      {/if}
    {:else}
      <span class="inline-block align-middle"><svelte:component this={icons['Radix']}></svelte:component></span>
      <span class="inline-block" bind:this={nameInstance} on:dblclick={doRename} 
        on:blur={() => nameInstance.contentEditable = false} on:keyup={handleRenameKeyUp} on:keydown={handleRenameKeyDown}
        contenteditable=false bind:textContent={node.name}>{node.name}</span>
    {/if}
  </li>
</ul>

<style>
  .treeview {
    list-style: none;
    margin: 0 0 2px 0;
    padding: 0;
  }
  .treeview__item > ul {
    padding-left: 1rem;
  }
  .arrowDown { transform: rotate(90deg); }
  .arrow {
		display: inline-block;
    cursor: pointer;
	}
</style>