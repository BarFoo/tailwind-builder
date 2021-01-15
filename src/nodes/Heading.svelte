<script>
  import { previewBreakpoint } from "../stores";
  import { parseBreakpointUtilities } from "../functions";

  export let isSelected;
  export let node;

  $: cssClasses = parseBreakpointUtilities(node.utilities, $previewBreakpoint).join(" ");
  $: type = settings["type"].value;
  $: text = settings["text"].value;
</script>

{#if type === "h1"}
  <h1 class={cssClasses} class:is-selected={isSelected} contenteditable="true" bind:textContent={text}>{text}</h1>
{:else if type === "h2"}
  <h2 class={cssClasses} class:is-selected={isSelected} contenteditable="true" bind:textContent={text}>{text}</h2>
{:else if type === "h3"}
  <h3 class={cssClasses} class:is-selected={isSelected} contenteditable="true" bind:textContent={text}>{text}</h3>
{:else if type === "h4"}
  <h4 class={cssClasses} class:is-selected={isSelected} contenteditable="true" bind:textContent={text}>{text}</h4>
{:else if type === "footer"}
  <h5 class={cssClasses} class:is-selected={isSelected} contenteditable="true" bind:textContent={text}>{text}</h5>
{:else if type === "aside"}
  <h6 class={cssClasses} class:is-selected={isSelected} contenteditable="true" bind:textContent={text}>{text}</h6>
{/if}

<style>
  h1:is(:empty), h2:is(:empty), h3:is(:empty), h4:is(:empty), h5:is(:empty), h6:is(:empty) {
    border: dashed 1px gray;
  }
</style>