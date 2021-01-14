<script>
  export let isSelected;
  export let node;

  $: cssClasses = node.utilities.join(" ");
  $: type = node.settings.type.value;
</script>

{#if type === "div"}
  <div class={cssClasses} class:is-selected={isSelected} on:click>
    <slot></slot>
  </div>
{:else if type === "section"}
  <section class={cssClasses} class:is-selected={isSelected} on:click>
    <slot></slot>
  </section> 
{:else if type === "main"}
  <main class={cssClasses} class:is-selected={isSelected} on:click>
    <slot></slot>
  </main>
{:else if type === "header"}
  <header class={cssClasses} class:is-selected={isSelected} on:click>
    <slot></slot>
  </header>
{:else if type === "footer"}
  <footer class={cssClasses} class:is-selected={isSelected} on:click>
    <slot></slot>
  </footer>
{:else if type === "aside"}
  <aside class={cssClasses} class:is-selected={isSelected} on:click>
    <slot></slot>
  </aside>
{:else if type === "article"}
  <article class={cssClasses} class:is-selected={isSelected} on:click>
    <slot></slot>
  </article>
{:else}
  <slot></slot>
{/if}

<style>
  div, main, section, header, footer, aside, article {
    border: dashed 1px gray;
    min-height: 12rem;
  }
  div:not(:empty), main:not(:empty), section:not(:empty), header:not(:empty), footer:not(:empty),
  aside:not(:empty), article:not(:empty) {
    min-height: auto;
    border: none;
  }
</style>