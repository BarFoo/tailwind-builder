<script>
  import { selectedNode, nodes, pageUtilities } from "./stores";
  import Node from "./Node.svelte";
  $: pageClasses = $pageUtilities.join(" ");

  const nodeClick = (evt) => $selectedNode = evt.detail.node;

  const keyup = (e) => {
    if($selectedNode) {
      if(e.code === 'Delete') {
        nodes.remove($selectedNode.id);
        $selectedNode = null;
      }
    }
  }
  
</script>

<div class="bg-white h-full max-h-full flex-1 overflow-auto outline-none {pageClasses}"
    on:click|self={() => $selectedNode = null} on:keyup={keyup} tabindex="-1">
    {#each $nodes as node (node.id)}
      <Node {node} on:nodeClick={nodeClick} />
    {/each}
</div>