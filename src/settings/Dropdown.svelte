<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let setting = {};

  $: items = setting.items;

  const handleInput = () => dispatch("settingUpdated");
</script>

<select class="bg-white p-2 w-full border border-gray-300" bind:value={setting.value} on:input={handleInput}>
  {#each items as item}
    <option>{item}</option>
  {/each}
</select>