<script>
  import navItems from './data/nav-items';
  import { nodes, selectedNode } from './stores';
  import { nodeManager } from './nodeManager';
  import icons from './allIcons';
  import { activeMenuItem } from './stores';

  function createNode(nodeType) {

    if(nodeType.componentType === null) {
      return;
    }

    const isRoot = $selectedNode === null;
    const node = nodeManager.createNode(nodeType);

    if(isRoot) {
      $nodes.push(node);
    } else {
      node.parentId = $selectedNode.id;
      $selectedNode.children.push(node);
    }

    $nodes = $nodes;
  }

</script>

<ul class="flex flex-grow flex-row gap-3">
  {#each navItems as navItem, i}
    <li class="relative outline-none text-gray-500 hover:text-black" on:click={() => createNode(navItem)} 
      title={navItem.description} 
      on:click={() => $activeMenuItem = ($activeMenuItem === i ? -1 : i)}>
      <span class="cursor-pointer inline-block align-middle"><svelte:component
          this={icons[navItem.icon]} /></span>
      <span class="cursor-pointer">{navItem.displayName}</span>
      {#if navItem.children}
        <span class="cursor-pointer inline-block align-middle" class:is-active={$activeMenuItem === i}><svelte:component
          this={icons['Dropdown']} /></span>
        {#if $activeMenuItem === i}
          <div class="absolute left-0 w-full mt-2 origin-top-left rounded-md shadow-lg md:w-48 z-50">
            <div class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
              {#each navItem.children as child}
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