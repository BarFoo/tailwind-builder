<script>
  import items from "./data/node-menu";
  import { nodes, selectedNode } from "./stores";
  import Icon from "./common/Icon.svelte";

  let activeMenuItem = null;
  let ref;

  const addNode = (node, index) => {
    if(node) {
      nodes.add(node, $selectedNode ? $selectedNode.id : null);
    } 

    activeMenuItem = activeMenuItem === index ? null : index;
  }

  const checkHideMenus = (e) => {
    if(!ref.contains(e.target)) {
      activeMenuItem = null;
    }
  }
</script>

<svelte:window on:click={checkHideMenus} />

<ul bind:this={ref} class="flex flex-grow flex-row gap-3">
  {#each items as item, index}
    <li class="relative flex flex-row items-center gap-1 outline-none text-gray-500 hover:text-black"
      title={item.description} 
      on:click={() => addNode(item.node, index)}>
      <Icon name={item.icon} class="fill-current cursor-pointer" />
      <span class="cursor-pointer">{item.text}</span>
      {#if item.children}
        <span class="cursor-pointer inline-block align-middle" class:is-active={activeMenuItem === index}><Icon name="dropdown" /></span>
        {#if activeMenuItem === index}
          <div class="absolute top-6 left-0 mt-2 origin-bottom-left shadow-lg whitespace-nowrap z-50">
            <ul class="bg-white shadow dark-mode:bg-gray-800">
              {#each item.children as child}
                <li class="inline-block flex gap-1 px-3 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => addNode(child.node, index)}>
                  <Icon name={child.icon} class="fill-current align-middle" />
                  <span>{child.text}</span>
                </li>
              {/each}
            </ul>
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