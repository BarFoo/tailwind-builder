<script>
  import { selectedNode, nodes, pageUtilities, previewBreakpoint } from "./stores";
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

  $: breakpointClass = `preview-${$previewBreakpoint} mx-auto`;

</script>

<div class="bg-white h-full max-h-full flex-1 overflow-auto outline-none {pageClasses} {breakpointClass}"
    on:click|self={() => $selectedNode = null} on:keyup={keyup} tabindex="-1">
    {#each $nodes as node (node.id)}
      <Node {node} on:nodeClick={nodeClick} />
    {/each}
</div>

<style>
  :global(.preview-mobile) {
    width: 411px;
    max-width: 411px;
  }
  :global(.preview-tablet) {
    width: 768px;
    max-width: 768px;
  }
  :global(.preview-desktop) {
    width: 100%;
    max-width: 100%;
  }
</style>