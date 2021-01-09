<script>
  import ContactOne from './screenshots/ContactOne.svelte';
  import ContactTwo from './screenshots/ContactTwo.svelte';
  import { nodes, selectedNode } from '../stores';
  import { nodeManager } from '../nodeManager';

  const screenshots = {
    'ContactOne': ContactOne,
    'ContactTwo': ContactTwo
  };

  export let item = {};

  function createNode() {
    const isRoot = $selectedNode === null;
    const node = nodeManager.createNode(item.nodeToCreate);

    if(isRoot) {
      $nodes.push(node);
    } else {
      node.parentId = $selectedNode.id;
      $selectedNode.children.push(node);
    }

    $nodes = $nodes;
  }

</script>

<div class="rounded-lg mb-2 border cursor-pointer" on:click={createNode}>
  <svelte:component this={screenshots[item.screenshotName]} />
</div>