<script>
  import { beforeUpdate } from 'svelte';

  export let node;
  export let selectedNodeId;

  $: isSelected = selectedNodeId === node.id;

  const getSetting = (id) => node.settings.find(s => s.id === id).value;

  let type = getSetting('type');
  $: cssClasses = node.instanceClasses;

  beforeUpdate(() => {
    type = getSetting('type');
    isSelected = selectedNodeId === node.id;
  });
</script>

{#if type === 'div'}
  <div class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </div>
{:else if type === 'main'}
  <main class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </main>
{:else if type === 'header'}
  <header class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </header>
{:else if type === 'footer'}
  <footer class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </footer>
{:else if type === 'aside'}
  <aside class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </aside>
{:else if type === 'article'}
  <article class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </article>
{:else}
  <slot></slot>
{/if}

<style>
  div, main, header, footer, aside, article {
    border: dashed 1px gray;
    min-height: 6rem;
    position: relative;
    z-index: 25;
  }
</style>