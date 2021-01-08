<script>
  import { createEventDispatcher } from 'svelte';
  import Select from 'svelte-select';

  const dispatch = createEventDispatcher();
  
  export let setting = {};

  $: items = setting.items;
  $: selectedValue = setting.value;

  function handleSelect(evt) {
    setting.value = evt.detail.value;
    dispatch('settingUpdated', setting);
  }
</script>

<Select {items} {selectedValue} showIndicator={true} isClearable={false} on:select={handleSelect} />