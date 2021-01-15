<script>
  import { previewBreakpoint } from "../stores";
  import { parseBreakpointUtilities } from "../functions";

  export let isSelected;
  export let node;

  $: cssClasses = parseBreakpointUtilities(node.utilities, $previewBreakpoint).join(" ");
  $: type = node.settings.type.value;
  $: text = node.settings.text.value;
</script>

{#if type === "h1"}
  <h1 class={cssClasses} class:is-selected={isSelected} on:click>{text}</h1>
{:else if type === "h2"}
  <h2 class={cssClasses} class:is-selected={isSelected} on:click>{text}</h2>
{:else if type === "h3"}
  <h3 class={cssClasses} class:is-selected={isSelected} on:click>{text}</h3>
{:else if type === "h4"}
  <h4 class={cssClasses} class:is-selected={isSelected} on:click>{text}</h4>
{:else if type === "h5"}
  <h5 class={cssClasses} class:is-selected={isSelected} on:click>{text}</h5>
{:else if type === "h6"}
  <h6 class={cssClasses} class:is-selected={isSelected} on:click>{text}</h6>
{/if}