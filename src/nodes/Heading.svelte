<script>
  export let isSelected;
  export const settings = {
    "type": {
      displayName: "Type",
      displayType: "Dropdown",
      items: ["h1", "h2", "h3", "h4", "h5", "h6", "h7"],
      value: "div",
    }
  };
  export const utilities = ["font-bold", "mb-2"];
  $: cssClasses = utilities.join(" ");
  $: type = settings["type"].value;
</script>

{#if type === "h1"}
  <h1 class={cssClasses} class:is-selected={isSelected}> 
    <slot></slot>
  </h1>
{:else if type === "h2"}
  <h2 class={cssClasses} class:is-selected={isSelected}>
    <slot></slot>
  </h2>
{:else if type === "h3"}
  <h3 class={cssClasses} class:is-selected={isSelected}>
    <slot></slot>
  </h3>
{:else if type === "h4"}
  <h4 class={cssClasses} class:is-selected={isSelected}>
    <slot></slot>
  </h4>
{:else if type === "footer"}
  <h5 class={cssClasses} class:is-selected={isSelected}>
    <slot></slot>
  </h5>
{:else if type === "aside"}
  <h6 class={cssClasses} class:is-selected={isSelected}>
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