<script>
  import items from "./data/node-menu";
  import { nodes, activeMenuItem, selectedNode } from "./stores";

  import DropdownIcon from "./icons/Dropdown.svelte";

  const addNode = (node) => nodes.add(node, $selectedNode ? $selectedNode.id : null);

</script>

<ul class="flex flex-grow flex-row gap-3">
  {#each items as item, i}
    <li class="relative outline-none text-gray-500 hover:text-black"
      title={item.description} 
      on:click={() => addNode(item.node)}>
      <span class="cursor-pointer inline-block align-middle"><svelte:component
          this={item.icon} /></span>
      <span class="cursor-pointer">{item.text}</span>
      {#if item.children}
        <span class="cursor-pointer inline-block align-middle" class:is-active={$activeMenuItem === i}><DropdownIcon /></span>
        {#if $activeMenuItem === i}
          <div class="absolute left-0 w-full mt-2 origin-top-left rounded-md shadow-lg md:w-48 z-50">
            <div class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
              {#each item.children as child}
                <svelte:component this={child.component} item={child.item} />
              {/each}
            </div>
          </div>
        {/if}
      {/if}
    </li>
  {/each}
</ul>

<style>
  .is-active {
    transform: rotate(180deg);
  }
</style>