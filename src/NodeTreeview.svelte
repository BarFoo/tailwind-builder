<script context="module">
	const _expansionState = {}
</script>
<script>
  import { selectedNode, nodes } from "./stores";
  import RadixIcon from "./icons/Radix.svelte";
  import RightArrowIcon from "./icons/RightArrow.svelte";

  export let node;

  let nameRef;
  let tabIndex = -1;

  $: children = node.children;
  $: isActive = $selectedNode !== null && $selectedNode.id === node.id;

  let expanded = _expansionState[node.id] || isActive;
	const toggleExpansion = () => {
    expanded = _expansionState[node.id] = !expanded;
  };
  const toggleActive = () => {
    isActive ? $selectedNode = null : $selectedNode = node;
  };
  
  $: arrowDown = expanded;

  const keyup = (e) => {
    if($selectedNode) {
      if(e.code === 'Delete') {
        nodes.remove($selectedNode.id);
        $selectedNode = null;
      }
    }
  }

</script>

<ul class="treeview text-sm outline-none" tabindex={tabIndex--} on:keyup={keyup}>
  <li class="treeview__item" on:click|stopPropagation={toggleActive}>
    {#if children && children.length > 0}
      <span class="arrow align-middle" class:arrowDown on:click|stopPropagation={toggleExpansion}><RightArrowIcon /></span>
      <span class:isActive bind:this={nameRef} bind:textContent={node.name} contenteditable=false>{node.name}</span>
      {#if expanded}
        {#each children as child}
          <svelte:self node={child} />
        {/each}
      {/if}
    {:else}
      <span class="inline-block align-middle"><RadixIcon /></span>
      <span class:isActive>{node.name}</span>
    {/if}
  </li>
</ul>

<style>
  .treeview {
    list-style: none;
    margin: 0 0 2px 0;
    padding: 0;
  }
  /* Use of :global here to prevent Svelte stripping out this unused style */
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