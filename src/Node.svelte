<script>
  import { createEventDispatcher } from "svelte";
  import { selectedNode } from "./stores";

  import HtmlElement from "./HtmlElement.svelte";

  const dispatch = createEventDispatcher();

  export let node;

  $: isSelected = $selectedNode ? $selectedNode.id === node.id : false;

  function click(e) {
    // todo: A better way of stopping parent nodes from being selected..
    e.preventDefault();
    e.stopPropagation();
    dispatch("nodeClick", {
      evt: e,
      node
    });
  }
</script>

<HtmlElement {node} {isSelected} on:click={click} on:keyup>
  {#if node.children}
    {#each node.children as child}
      <svelte:self bind:node={child} on:nodeClick />
    {/each}
  {/if}
</HtmlElement>