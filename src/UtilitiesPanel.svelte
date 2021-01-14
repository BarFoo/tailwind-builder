<script>
    import { pageUtilities, selectedNode, nodes } from './stores';
    import { findExistingUtility } from './functions';
    import TrashIcon from './icons/Trash.svelte';

    let utilityClass = '';
    $: title = ($selectedNode !== null ? $selectedNode.name : 'Page') + ' Utilities';
    $: hasSelectedNode = $selectedNode !== null;

    // Map is used for sorting responsive breakpoints into correct order
    $: utilities = (hasSelectedNode ? $selectedNode.utilities : $pageUtilities);
    let utilitiesScore = {};

    $: {
        if(utilities) {
            utilities.map((u) => {
                if(u.indexOf(':') < 0) {
                    utilitiesScore[u] = 1;
                } else {
                    let score;
                    if(u.startsWith('sm')) {
                        score = 2;
                    } else if(u.startsWith('md')) {
                        score = 3;
                    } else if (u.startsWith('lg')) {
                        score = 4;
                    } else if (u.startsWith('xl')) {
                        score = 5;
                    } else if (u.startsWith('2xl')) {
                        score = 6;
                    } else {
                        score = 7;
                    }
                    utilitiesScore[u] = score;
                }
            });
            utilities.sort(function(x, y) {
                if(x.indexOf(':') < 0) {
                    if(x < y) {
                        return -1;
                    }
                    if(x > y) {
                        return 1;
                    }
                    return 0;
                }
                return utilitiesScore[x] - utilitiesScore[y];
            });
        }
    } 

    function addUtility() {
        if(utilityClass.trim().length > 0) {
            const existingIndex = findExistingUtility(utilities, utilityClass);
            if(existingIndex >= 0) {
                utilities[existingIndex] = utilityClass;
            } else {
                utilities.push(utilityClass);
            }
            if(hasSelectedNode) {
                $selectedNode = $selectedNode;
                nodes.refresh();
            } else {
                $pageUtilities = [...utilities];
            }
            utilityClass = '';
        }
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
        <span class="block mb-1 font-bold">Name <span class="font-light text-sm">(Builder use only)</span>
        <input type="text" class="bg-white p-2 w-full border border-gray-300" bind:value={$selectedNode.name} on:blur={() => nodes.refresh()} />
    </div>
    {#if $selectedNode.settings}
        {#each Object.entries($selectedNode.settings) as [k, setting]}
            {#if !setting.readOnly}
                <div class="mb-4">
                    <span class="block mb-1 font-bold">{setting.displayName}</span>
                    <svelte:component this={setting.displayType} {setting} on:settingUpdated={handleSettingUpdated} />
                </div>
            {/if}
        {/each}
    {/if}
{/if}

<h2 class="border border-l-0 border-r-0 border-t-0 border-b border-gray-300 pb-2 mb-4">{title}</h2>
<div class="mb-4">
    <input class="p-2 w-full border border-gray-300" type="text" bind:value={utilityClass} on:keyup={handleUtilityKeyUp} placeholder="Add or change utility..." />
</div>
{#each utilities as utility, index}
    <p class="mb-1 text-sm">{utility} <span class="float-right cursor-pointer" on:click={() => deleteUtility(index)}><TrashIcon /></span></p>
{/each}

<style>
    h2 {
        font-size: 1.1rem;
        font-weight: bold;
    }
</style>