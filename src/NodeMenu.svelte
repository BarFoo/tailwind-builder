<script>
  import items from "./data/node-menu";
  import { nodes, activeMenuItem, selectedNode, previewBreakpoint } from "./stores";

  import DesktopIcon from "./icons/Desktop.svelte";
  import TabletIcon from "./icons/Tablet.svelte";
  import MobileIcon from "./icons/Mobile.svelte";

  import DropdownIcon from "./icons/Dropdown.svelte";

  const addNode = (node) => nodes.add(node, $selectedNode ? $selectedNode.id : null);
  const previewClick = (breakpoint) => $previewBreakpoint = breakpoint;

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

<ul class="flex gap-2">
  <span class="preview-icon" class:is-preview-active={$previewBreakpoint === 'desktop'} title="Desktop Preview"
    on:click={() => previewClick("desktop")}><DesktopIcon /></span>
  <span class="preview-icon-tablet" class:is-preview-active={$previewBreakpoint === 'tablet'} title="Tablet Preview"
    on:click={() => previewClick("tablet")}><TabletIcon /></span>
  <span class="preview-icon" class:is-preview-active={$previewBreakpoint === 'mobile'} title="Mobile Preview"
    on:click={() => previewClick("mobile")}><MobileIcon /></span>
</ul>

<style>
  .is-active {
    transform: rotate(180deg);
  }
  .preview-icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  .preview-icon-tablet {
    width: 1.18rem;
    height: 1.5rem;
    cursor: pointer;
  }
  :global(.preview-icon:hover > svg, .preview-icon-tablet:hover > svg) {
    fill: #666;
  }
  :global(.preview-icon > svg, .preview-icon-tablet > svg) {
    fill: #aaa;
  }
  :global(.is-preview-active > svg) {
    fill: #000 !important;
  }
</style>