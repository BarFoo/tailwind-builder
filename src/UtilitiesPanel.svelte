<script>
    import { beforeUpdate, onMount, onDestroy } from 'svelte'; 
    import { pageUtilities, pageClasses, selectedNode } from './stores';
    import { groupByKey } from './functions';
    import loadOptions from './data/get-utilities';

    import Select from 'svelte-select';
    import TrashIcon from './icons/TrashIcon.svelte';

    import Dropdown from './settings/Dropdown.svelte';

    $: utilitiesKey = 1;
    $: title = ($selectedNode ? $selectedNode.name : 'Page') + ' Utilities';
    $: utilities = $selectedNode ? $selectedNode.utilities : $pageUtilities;

    let utilitiesGrouped = {};

    $: {
        utilitiesGrouped = groupByKey(utilities, 'group');
        console.log(utilitiesGrouped);
    }
 
    const groupBy = (item) => item.group;

    const settingTypes = {
        'Dropdown': Dropdown
    };

    function addUtility(evt) {
        if(evt.detail.value !== undefined) {

            const existingUtility = utilities.find(u => u.name === evt.detail.name);

            if(existingUtility) {
                existingUtility.value = evt.detail.value;
            } else {
                const newUtility = Object.assign({}, evt.detail);
                utilities.push(newUtility);
            }

            updateClasses();
            utilitiesKey++;
        }
    }

    function deleteUtility(index) {
        utilities.splice(index, 1);
        updateClasses();
    }

    function deleteUtilitiesByGroup(groupName) {
        utilities = utilities.filter(u => u.group !== groupName);
    }

    function updateClasses() {
        if($selectedNode) {
            $selectedNode.instanceClasses = $selectedNode.utilities.map(u => u.value).join(' ');
        } else {
            $pageClasses = $pageUtilities.map(s => s.value).join(' ');
        }
    }

    function handleSettingUpdated() {
        
    }

    beforeUpdate(() => {
        updateClasses();
    });

    onMount(() => {
        updateClasses();
    });

</script>

{#if $selectedNode && $selectedNode.settings.length}
    <h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4">{$selectedNode.name} Settings</h2>
    {#each $selectedNode.settings as setting}
        <div class="mb-4 text-sm">
            <label class="block mb-1 font-bold">{setting.displayName} {#if setting.showValue}<span class="float-right font-light">{setting.value}</span>{/if}</label>
            <svelte:component this={settingTypes[setting.displayType]} {setting} on:settingUpdated={handleSettingUpdated} />
        </div>
    {/each}
{/if}

<h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4">{title}</h2>
<div class="mb-4">
    {#each [utilitiesKey] as k (k)}
        <Select {loadOptions} 
        placeholder="Add utility..." 
        showIndicator={false} 
        isClearable={true} 
        noOptionsMessage="Search"
        on:select={addUtility} {groupBy} />
    {/each}
</div>
{#each Object.entries(utilitiesGrouped) as [key, children]}
    <div class="mb-2 text-sm">
        <label class="block mb-1 font-bold">
            {key} 
            <span class="float-right cursor-pointer" on:click={() => deleteUtilitiesByGroup(key)}>
                <TrashIcon />
            </span>
        </label>
        {#each children as utility}
            <p>
                <span class="float-right cursor-pointer" on:click={() => deleteUtility(utility.index)}><TrashIcon /></span>
                {utility.value}
            </p>
        {/each}
    </div>
{/each}

<style>
    h2 {
        font-size: 1.1rem;
        font-weight: bold;
    }
</style>