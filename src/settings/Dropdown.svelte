<script>
  import Select from 'svelte-select';
  import { notify } from '../stores/notify';

  export let setting = {};

  function handleSelect(evt) {
    setting.value = evt.detail.value;
    notify.set({
      type: 'settingChanged',
      identifier: setting.identifier
    });
  }
</script>

<Select items={setting.items} selectedValue={setting.value} showIndicator={true} isClearable={false} on:select={handleSelect} />