<script>
  import { selectedNode, nodes, pageUtilities, previewBreakpoint, previewInstance } from "./stores";
  import Node from "./Node.svelte";

  $: pageClasses = $pageUtilities.join(" ");

  const nodeClick = (evt) => {
    const node = evt.detail.node;
    if(node) {
      if($selectedNode !== null && $selectedNode.id === node.id) {
        $selectedNode = null;
      } else {
        $selectedNode = node;
      }
    }
  }

  $: breakpointClass = $previewBreakpoint ? `preview-${$previewBreakpoint} mx-auto` : "";

</script>

<div class="bg-white h-full max-h-full flex-1 overflow-auto outline-none {pageClasses} {breakpointClass}"
    on:click|self={() => $selectedNode = null} tabindex="-1" bind:this={$previewInstance}>
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