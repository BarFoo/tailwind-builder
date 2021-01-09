<script>
    import { pageUtilities, pageClasses, selectedNode, nodes } from './stores';

    import TrashIcon from './icons/TrashIcon.svelte';
    import DropdownSetting from './settings/DropdownSetting.svelte';
    import InputTextSetting from './settings/InputTextSetting.svelte';

    let utilityClass = '';
    $: title = ($selectedNode !== null ? $selectedNode.name : 'Page') + ' Utilities';
    $: hasSelectedNode = $selectedNode !== null;

    const settingTypes = {
        'Dropdown': DropdownSetting,
        'InputText': InputTextSetting
    };

    function addUtility() {
        if(utilityClass.trim().length > 0) {
            if(hasSelectedNode) {
                $selectedNode.utilities.push(utilityClass);
            } else {
                $pageUtilities.push(utilityClass);
            }
            updateClasses();
            utilityClass = '';
        }
    }

    function deleteUtility(index) {
        if(hasSelectedNode) {
            $selectedNode.utilities.splice(index, 1);
        } else {
            $pageUtilities.splice(index, 1);
        }
        updateClasses();
    }

    function handleSettingUpdated() {
        if(hasSelectedNode) {
            $selectedNode = {...$selectedNode};
        }
        $nodes = [...$nodes];
    }

    function handleUtilityKeyUp(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            addUtility();
            return false;
        }
    }

    function updateClasses() {
        if(hasSelectedNode) {
            $selectedNode.instanceClasses = $selectedNode.utilities.join(' ');
        } else {
            $pageClasses = $pageUtilities.join(' ');
            $pageUtilities = [...$pageUtilities];
        }
        $selectedNode = $selectedNode;
        $nodes = [...$nodes];
    }

</script>

{#if $selectedNode != null && $selectedNode.settings.length}
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
    <input class="p-2 w-full border border-gray-300" type="text" bind:value={utilityClass} on:keyup={handleUtilityKeyUp} placeholder="Add a utility..." />
</div>
{#each (hasSelectedNode ? $selectedNode.utilities : $pageUtilities) as utility, i}
    <p class="mb-1 text-sm">{utility} <span class="float-right cursor-pointer" on:click={() => deleteUtility(i)}><TrashIcon /></span></p>
{/each}

<style>
    h2 {
        font-size: 1.1rem;
        font-weight: bold;
    }
</style>