<script>
  export let isSelected;
  export let node;
  $: cssClasses = node.utilities.join(" ");
</script>

<div class={cssClasses} class:is-selected={isSelected} on:click>
  <slot></slot>
</div>

<style>
  div {
    border: dashed 1px gray;
    min-height: 18rem;
  }
  div:not(:empty) {
    border: none;
    min-height: auto;
  }
  div:not(:empty):hover {
    border: dashed 1px lightgray;
  }
</style>