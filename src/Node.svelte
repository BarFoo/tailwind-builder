<script>
  export let node;
</script>

<svelte:component
  this={node.component}
  on:click
  on:keyup
  {node}>
    {#if node.children}
      {#each node.children as child (child.id)}
        <svelte:self 
        bind:node={child}
        on:click
        on:keyup
        cssClasses="component-child" />
      {/each}
    {/if}
</svelte:component>