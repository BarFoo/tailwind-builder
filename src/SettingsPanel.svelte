<script>
    import Dropdown from './settings/Dropdown.svelte';

    export let settings = [];
    export let title = '';

    const settingTypes = {
        'dropdown': Dropdown
    };

    const instances = [];

    function handleValueChanged(setting, evt) {
        setting.value = evt.detail.newValue;
    }
</script>

<h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4">{title}</h2>
{#each settings as setting, i}
<div class="mb-4 text-sm">
    <label class="block mb-2 font-bold">{setting.displayName}</label>
    <svelte:component this={settingTypes[setting.displayType]} values={setting.values} on:valueChanged={(e) => handleValueChanged(setting, e)} />
</div>
{/each}

<style>
    h2 {
        font-size: 1.1rem;
        font-weight: bold;
    }
</style>