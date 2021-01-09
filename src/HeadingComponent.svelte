<script>
  import { beforeUpdate } from 'svelte';
  import { selectedNode } from './stores';

  export let node;

  $: isSelected = $selectedNode ? $selectedNode.id === node.id : false;

  const getSetting = (id) => node.settings.find(s => s.id === id);

  let type = getSetting('headingType');
  $: cssClasses = node.instanceClasses;

  beforeUpdate(() => {
    type = getSetting('headingType');
  });
</script>

{#if type === 'h1'}
  <h1 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h1>
{:else if type === 'h2'}
  <h2 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h2>
{:else if type === 'h3'}
  <h3 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h3>
{:else if type === 'h4'}
  <h4 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h4>
{:else if type === 'footer'}
  <h5 class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </h5>
{:else if type === 'aside'}
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