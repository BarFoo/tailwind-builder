<script context="module">
	const _expansionState = {};
</script>
<script>
  import { isDragEnabled } from "../stores";
  import Icon from "../common/Icon.svelte";
  import { selectedNode } from "../stores";

  export let item;

  $: isActive = $selectedNode && $selectedNode.id === item.id;

  let expanded = _expansionState[item.id] || false;

	const toggleExpansion = () => {
    expanded = _expansionState[item.id] = !expanded;
  };
  const toggleActive = () => {
    isActive ? $selectedNode = null : $selectedNode = item;
  };

</script>

<li id={item.id} class="treeview__item" class:cursor-pointer={!$isDragEnabled}>
    {#if item.children && item.children.length > 0}
      <span class="display-block flex flex-row gap-1 items-center" on:click={toggleActive}>
        <span class="inline-block" class:arrowDown={expanded} on:click|stopPropagation={toggleExpansion}><Icon name="rightArrow" class="fill-current" /></span>
        <span class:isActive>{item.name}</span>
      </span>
      {#if expanded}
        <ul class="treeview__item-children">
          {#each item.children as child}
            <svelte:self item={child} />
          {/each}
        </ul>
      {/if}
    {:else}
      <span class="display-block flex flex-row gap-1 items-center" on:click={toggleActive}>
        <Icon name="radix" class="fill-current" />
        <span class:isActive>{item.name}</span>
      </span> 
    {/if}
  </li>

<style>
  /* Use of :global here to prevent Svelte stripping out this unused style */
  .treeview__item-children {
    list-style: none;
    padding: 0 0 0 1.2rem;
    margin: 0;
  }
  .arrowDown { transform: rotate(90deg); }
  .isActive {
    font-weight: bold;
  }
</style>