<script>
  import { selectedNode } from '../stores';

  export let node;

  $: isSelected = $selectedNode ? $selectedNode.id === node.id : false;
  $: cssClasses = node.instanceClasses;
  $: element = node.settings['headingElement'];
</script>

{#if element === 'h1'}
  <h1 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h1>
{:else if element === 'h2'}
  <h2 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h2>
{:else if element === 'h3'}
  <h3 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h3>
{:else if element === 'h4'}
  <h4 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h4>
{:else if element === 'footer'}
  <h5 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h5>
{:else if element === 'aside'}
  <h6 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h6>
{:else}
  <slot></slot>
{/if}

<style>
  h1, h2, h3, h4, h5, h6 {
    border: dashed 1px gray;
    min-height: 3rem;
    position: relative;
    z-index: 25;
  }
</style>