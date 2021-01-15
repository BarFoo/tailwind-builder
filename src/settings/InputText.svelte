<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let setting = {};

  function handleChange() {
    dispatch("settingUpdated", setting);
  }
</script>

<input type="text" bind:value={setting.value} placeholder={setting.placeholder} on:change={handleChange}  />