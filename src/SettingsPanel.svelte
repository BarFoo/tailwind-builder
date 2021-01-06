<script>
    import { afterUpdate, onMount } from 'svelte'; 
    import { app } from './stores/app';
    import { notify } from './stores/notify';
    import { searchableSettings, allSettings } from './data/settings';
    import Dropdown from './settings/Dropdown.svelte';
    import Input from './settings/Input.svelte';
    import Select from 'svelte-select';
    import TrashIcon from './icons/TrashIcon.svelte';


    const settingTypes = {
        Dropdown: Dropdown,
        Input: Input,
    }; 
    let title = '';
    $: settings = [];
    let items = [];
    let selectedValue;
    let settingsKey = 1;
    const groupBy = (item) => item.group;

    function filterSearchableSettings() {
        items = items.filter(x => settings.findIndex(y => y.id === x.value) < 0);
    }

    function addSetting(evt) {
        if(evt.detail.value !== undefined) {
            const newSetting = Object.assign({}, allSettings.find(setting => setting.id === evt.detail.value));
            newSetting.isDeletable = true;

            if($app.selectedNode) {
                newSetting.identifier = $app.selectedNode.id;  
            } else {
                newSetting.identifier = 'Page';
            }

            settings.push(newSetting);
            filterSearchableSettings();
            settings = settings;
            settingsKey++;
            updateClasses();
        }
        selectedValue = undefined;
    }

    function deleteSetting(index) {
        settings.splice(index, 1);
        settings = settings;
        updateClasses();
    }

    function updateClasses() {
        if($app.selectedNode) {
            $app.selectedNode.instanceClasses = $app.selectedNode.settings.filter(s => s.id !== 'type' && s.value).map(s => s.value).join(' ');
        } else {
            $app.pageClasses = $app.pageSettings.filter(s => s.value).map(s => s.value).join(' ');
        }
    }
    
    onMount(() => {
        const unsubscribe = notify.subscribe(n => {
            if(n.type === 'settingChanged') {
                updateClasses();
            }
        }); 

        return {
            destroy() {
                unsubscribe();
            }
        }
    });

    afterUpdate(() => {
        items = [...searchableSettings];
        if($app.selectedNode) {
            settings = $app.selectedNode.settings;
            title = $app.selectedNode.name + ' Classes';
        } else {
            settings = $app.pageSettings;
            title = 'Page Classes';
        }

        filterSearchableSettings();
    });

</script>

<h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4">{title}</h2>
<div class="mb-4">
    {#each [settingsKey] as k (k)}
        <Select {items} placeholder="Add a class..." showIndicator={false} isClearable={true} on:select={addSetting} bind:selectedValue={selectedValue} {groupBy} />
    {/each}
</div>
{#each settings as setting, i}
    <div class="mb-4 text-sm">
        <label class="block mb-2 font-bold">
            {setting.displayName} 
            {#if setting.isDeletable}
                <span class="float-right cursor-pointer" on:click={() => deleteSetting(i)}>
                    <TrashIcon />
                </span>
            {/if}
        </label>
        <svelte:component
            this={settingTypes[setting.displayType]}
            bind:setting={setting} />
    </div>
{/each}

<style>
    h2 {
        font-size: 1.1rem;
        font-weight: bold;
    }
</style>