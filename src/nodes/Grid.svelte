<script>
  import { previewBreakpoint } from "../stores";
  import { parseBreakpointUtilities, hasHeightUtility } from "../functions";

  export let isSelected;
  export let node;

  $: cssClasses = parseBreakpointUtilities(node.utilities, $previewBreakpoint).join(" ");
  $: hasHeight = hasHeightUtility(node.utilities);
</script>

<div class={cssClasses} class:is-selected={isSelected} class:has-min-height={!hasHeight} on:click>
  <slot></slot>
</div>

<style>
  div {
    border: dashed 1px gray;
  }
  .has-min-height {
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