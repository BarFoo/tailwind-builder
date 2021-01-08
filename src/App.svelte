<script>
  import { nodes,  selectedNode, pageClasses } from './stores';
  import Node from './Node.svelte';
  import UtilitiesPanel from './UtilitiesPanel.svelte';
  import nodeTypes from './data/node-types';
  import { nodeManager } from './nodeManager';
  import NodeTreeview from './NodeTreeview.svelte';
  import icons from './icons';
  import {dndzone} from 'svelte-dnd-action';

  function onNodeKeyUp(dispatchEvent) {
    const e = dispatchEvent.detail.keyEvent;
    const node = dispatchEvent.detail.node;
    if(e.target === undefined || e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
    if((e.target.classList.contains('component') || e.target.classList.contains('component-child')) && (e.keyCode === 46 || e.keyCode === 8)) {
      $selectedNode = null;
      nodeManager.deleteNode($nodes, node.id);
      $nodes = $nodes;
    }
  }

  function onNodeClick(evt) {
    const node = evt.detail.node;
    const mouseEvent = evt.detail.mouseEvent;

    if(mouseEvent.button === 0) {
      $selectedNode = node;
    }
  } 

  function onPreviewClick(e) {
    if (e.target.id === 'preview') {
      $selectedNode = null;
    }
  }

  function createNode(nodeType) {
    
    const isRoot = $selectedNode === null;
    const node = nodeManager.createNode(nodeType);

    if(isRoot) {
      $nodes.push(node);
    } else {
      $selectedNode.children.push(node)
    }

    $nodes = $nodes;
  }

  function onNodeRenamed() {
    $nodes = $nodes;
  }

  function handleRootNodeSort(e) {
    $nodes = e.detail.items;
  }


</script>

<main id="main" class="bg-gray-200 h-screen grid grid-cols-12">
  <div class="flex flex-col overflow-hidden h-full col-span-9 lg:col-span-10 py-4 px-8" on:click|self={() => $selectedNode = null }>
    <nav class="flex flex-row text-sm mb-4 gap-2" on:click|self={() => $selectedNode = null}>
      {#each nodeTypes as nodeType}
        <span class="cursor-pointer" on:click={() => createNode(nodeType)}>
          <span class="inline-block align-middle"><svelte:component
              this={icons[nodeType.icon]} /></span>
          {nodeType.displayName}
        </span>
      {/each}
    </nav>
    <div
      id="preview"
      class="bg-white h-full max-h-full flex-1 overflow-auto {$pageClasses}"
      on:click|self={onPreviewClick}
      use:dndzone="{{items: $nodes}}"
      on:consider={handleRootNodeSort}
      on:finalize={handleRootNodeSort}
      type="preview">
      {#each $nodes as node (node.id)}
        <Node {node}
            on:nodeClick={onNodeClick}
            on:nodeKeyUp={onNodeKeyUp}
            on:nodeRenamed={onNodeRenamed}
            cssClasses="component">
        </Node>
      {/each}
    </div>
  </div>
  <div class="bg-gray-100 border border-l border-t-0 border-r-0 border-b-0 border-gray-300 h-full col-span-3 lg:col-span-2 p-4">
    <div class="h-3/6 overflow-auto">
      <UtilitiesPanel />
    </div>
    <div class="h-3/6 overflow-auto">
      <h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4 font-bold">Nodes</h2>
      {#if $nodes.length}
        {#each $nodes as node}
          <NodeTreeview {node} on:nodeRenamed={onNodeRenamed} />
        {/each}     
      {:else}
        <p>Nodes will appear here.</p>
      {/if}
    </div>    
  </div>
</main>

<style>
  :global(.is-selected) {
    border: solid 2px black !important;
  }
  h2 {
    font-size: 1.2rem;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border: 0px none #222;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #222;
  }
  ::-webkit-scrollbar-track {
    background: #E5E7EB;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #E5E7EB;
  }
  ::-webkit-scrollbar-track:active {
    background: #fff;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
</style>