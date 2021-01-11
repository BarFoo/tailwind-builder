<script>
  import { selectedNode } from '../stores';

  export let node;

  $: isSelected = $selectedNode ? $selectedNode.id === node.id : false;
  $: cssClasses = node.instanceClasses;
  $: element = node.settings['containerElement'];
</script>

{#if element === 'div'}
  <div class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </div>
{:else if element === 'section'}
  <section class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </section>
{:else if element === 'main'}
  <main class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </main>
{:else if element === 'header'}
  <header class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </header>
{:else if element === 'footer'}
  <footer class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </footer>
{:else if element === 'aside'}
  <aside class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </aside>
{:else if element === 'article'}
  <article class={cssClasses} bind:this={node.html} class:is-selected={isSelected}>
    <slot></slot>
  </article>
{:else}
  <slot></slot>
{/if}

<style>
  div, main, header, footer, aside, article {
    border: dashed 1px gray;
    min-height: 12rem;
    position: relative;
    z-index: 25;
  }
</style>