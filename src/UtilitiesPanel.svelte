<script>
    import { pageUtilities, selectedNode, nodes } from './stores';
    import TrashIcon from './icons/Trash.svelte';

    let utilityClass = '';
    $: title = ($selectedNode !== null ? $selectedNode.name : 'Page') + ' Utilities';
    $: hasSelectedNode = $selectedNode !== null;

    function addUtility() {
        if(utilityClass.trim().length > 0) {
            if(hasSelectedNode) {
                const existingIndex = findExistingUtility($selectedNode.utilities, utilityClass);
                if(existingIndex >= 0) {
                    $selectedNode.utilities[existingIndex] = utilityClass;
                } else {
                    $selectedNode.utilities.push(utilityClass);
                }
                $selectedNode = $selectedNode;
                nodes.refresh();
            } else {
                const existingIndex = findExistingUtility($selectedNode.utilities, utilityClass);
                if(existingIndex >= 0) {
                    $pageUtilities[existingIndex] = utilityClass;
                } else {
                    $pageUtilities.push(utilityClass);
                }
                $pageUtilities = $pageUtilities;
            }
            utilityClass = '';
        }
    }

    function findExistingUtility(utilities, str) {
        let matchingIndex = -1;
        const search = getUtilityPrefix(str);
        utilities.some((u, index) => {
            if(search === getUtilityPrefix(u)) {
                matchingIndex = index;
                return true;
            }
        });
        return matchingIndex;
    }

    function getUtilityPrefix(str) {
        if(str.indexOf('-') < 0) {
            return str;
        }
        const parts = str.split('-');
        parts.splice(parts.length - 1, 1);

        return parts.join('-');
    }
 
    function deleteUtility(index) {
        if(hasSelectedNode) {
            $selectedNode.utilities.splice(index, 1);
            $selectedNode = $selectedNode;
            nodes.refresh();
        } else {
            $pageUtilities.splice(index, 1);
            $pageUtilities = $pageUtilities;
        }
    }

    function handleSettingUpdated() {
        if(hasSelectedNode) {
            $selectedNode = $selectedNode;
        }
        nodes.refresh();
    }

    function handleUtilityKeyUp(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            addUtility();
            return false;
        }
    }

</script>

{#if $selectedNode}
    <h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4">{$selectedNode.name} Settings</h2>
    <div class="mb-4">
        <span class="block mb-1 font-bold">Name</span>
        <input type="text" class="bg-white p-2 w-full border border-gray-300" bind:value={$selectedNode.name} on:blur={() => nodes.refresh()} />
    </div>
    {#if $selectedNode.settings}
        {#each Object.entries($selectedNode.settings) as [k, setting]}
            <div class="mb-4">
                <span class="block mb-1 font-bold">{setting.displayName}</span>
                <svelte:component this={setting.displayType} {setting} on:settingUpdated={handleSettingUpdated} />
            </div>
        {/each}
    {/if}
{/if}

<h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4">{title}</h2>
<div class="mb-4">
    <input class="p-2 w-full border border-gray-300" type="text" bind:value={utilityClass} on:keyup={handleUtilityKeyUp} placeholder="Add or change utility..." />
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