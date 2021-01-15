<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let setting = {};

  function handleChange() {
    dispatch("settingUpdated", setting);
  }
</script>

<input type="text" class="bg-white p-2 w-full border border-gray-300" 
bind:value={setting.value} placeholder={setting.placeholder} on:change={handleChange}  />