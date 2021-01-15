<script>
  export let text;
  export let icon = undefined;
  export let type;
  export let rounded = false;

  let buttonClasses;
  let iconClasses;
  switch(type) {
    case "info":
      buttonClasses = "bg-blue-500 hover:bg-blue-600 text-white";
      iconClasses = "bg-blue-400 text-white";
      break;
    case "success":
      buttonClasses = "bg-green-500 hover:bg-green-600 text-white";
      iconClasses = "bg-green-400 text-white";
      break;
    case "transparent":
      buttonClasses = "bg-transparent text-gray-600";
      break;
    default:
      buttonClasses = "bg-white text-gray-600";
      break;
  }

</script>

<div class="flex overflow-hidden" class:rounded={rounded}>
  {#if icon}
    <div class="button-icon shadow-border p-3 cursor-pointer {iconClasses}" on:click>
      <svelte:component this={icon} />
    </div>
  {/if}
  <button class="block text-sm shadow-border {buttonClasses} py-3 px-4 tracking-wide uppercase font-bold" class:p-8={icon === undefined} on:click>
    {text}
  </button>
</div>

<style>
  button {
    outline: 1px transparent;
    min-height: 48px;
  }
  :global(.button-icon > svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>