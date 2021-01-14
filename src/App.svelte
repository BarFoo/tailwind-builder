<script>
  import { selectedNode, nodes, previousBreakpoint, previewBreakpoint } from "./stores";
  import Preview from "./Preview.svelte";
  import UtilitiesPanel from "./UtilitiesPanel.svelte";
  import NodeTreeview from "./NodeTreeview.svelte";
  import NodeMenu from "./NodeMenu.svelte";
  import Modal from "./Modal.svelte";
  import PreviewMenu from "./PreviewMenu.svelte";
</script>

<!-- Do not worry about the weird Modal syntax.. it must be wrapped for the Modal context -->
<Modal closeOnOuterClick={false} onClose={() => $previewBreakpoint = $previousBreakpoint}>
  <main id="main" class="h-screen grid grid-cols-12">
    <div class="bg-gray-200 overflow-hidden h-screen max-h-screen overflow-auto col-span-9 lg:col-span-10">
      <nav class="border-gray-300 border-b border-l-0 border-r-0 border-t-0  flex flex-row text-sm p-4" on:click|self={() => $selectedNode = null}>
        <NodeMenu />
        <PreviewMenu />
      </nav>
      <Preview />
    </div>
    <div class="bg-gray-100 border-gray-300 border-b-0 border-l border-r-0 border-t-0 h-full col-span-3 lg:col-span-2 p-4">
      <div class="h-3/5 overflow-auto">
        <UtilitiesPanel />
      </div>
      <div class="h-2/5 overflow-auto">
        <h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4 font-bold">Nodes</h2>
        {#if $nodes.length}
          {#each $nodes as node}
            <NodeTreeview {node} />
          {/each}   
        {:else}
          <p>Nodes will appear here.</p>
        {/if}
      </div>    
    </div>
  </main>
</Modal>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(.is-selected) {
    border: dashed 2px black !important;
  }
  h2 {
    font-size: 1.2rem;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border: 0px none #adadad;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #cdcdcd;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #222;
  }
  ::-webkit-scrollbar-track {
    background: #e1e1e1;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #e1e1e1;
  }
  ::-webkit-scrollbar-track:active {
    background: #fff;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

</style>