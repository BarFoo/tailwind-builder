<script>
	import { afterUpdate } from 'svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { nodeStore, nodeStoreIdIncrement } from './stores/node-store';
	import { settingsStore } from './stores/settings-store';

	import Legend from './Legend.svelte';
	import Container from './Container.svelte';
	import SettingsPanel from './SettingsPanel.svelte';

	import ContainerIcon from './icons/container.svelte';
	import GridIcon from './icons/grid.svelte';

	const flipDurationMs = 300;

	$nodeStore = [];

	let currentSettings = [];
	let currentSettingTitle = 'Settings';
	let selectedNodeId = -1;

	const componentTypes = {
		'container': Container
	};

	const navItems = [
		{
			displayName: "Container",
			icon: ContainerIcon,
			componentType: "container" 
		}
	];

	function showSettings(node) {
		currentSettingTitle = node.name + ' Settings';
		currentSettings = node.instance.getSettings();
		console.log(currentSettings);
	}

	function createNode(componentType, name) {

		let matchingTypes = 0;

		for (let i=0; i < $nodeStore.length; i++) {
			if ( 'componentType' in $nodeStore[i] && $nodeStore[i].componentType === componentType) {
				matchingTypes++;
			}
		}

		const node = { 
			id: $nodeStoreIdIncrement, 
			component: componentTypes[componentType], 
			name: name + " #" + (matchingTypes + 1),
			componentType: componentType,
			hasAutoDisplayedSettings: false
		};

		$nodeStore[$nodeStore.length] = node;
		selectedNodeId = node.id;
		$nodeStoreIdIncrement++;
	}

	function handleSort(e) {
        $nodeStore = e.detail.items;
	}

	function handleNodeKey(e, nodeId) {
		if(e.target.classList.contains('component') && (e.keyCode === 46 || e.keyCode === 8)) {
			deleteNode(nodeId);
		}
	}

	function handleNodeClick(evt, node) {
		// todo: If evt is right mouse click show context menu..
	}

	function handleNodeFocus(evt, node) {
		if(!node.hasAutoDisplayedSettings) return;
		selectedNodeId = node.id;
		showSettings(node);
	}

	function deleteNode(nodeId) {
		$nodeStore = $nodeStore.filter(function(n, index, arr) {
			if(n.id !== nodeId) return n;
		});
	}

	afterUpdate(() => {
		// We have to do this here since instance isn't available at the time of creating the node
		const nodeStoreLength = $nodeStore.length;
		if(nodeStoreLength > 0) {
			const latestNode = $nodeStore[nodeStoreLength - 1];
			if(latestNode.id === selectedNodeId && !latestNode.hasAutoDisplayedSettings) {
				showSettings(latestNode);
				latestNode.hasAutoDisplayedSettings = true;
			}
		}
	});

</script>

<main class="bg-gray-200 h-screen grid grid-cols-12">
	<div class="flex flex-col overflow-hidden h-full col-span-9 xl:col-span-10 py-4 px-8">
		<nav class="flex flex-row text-sm mb-4 gap-2">
			{#each navItems as navItem}
				<span class="cursor-pointer" on:click={() => createNode(navItem.componentType, navItem.displayName)}>
					<span class="inline-block align-middle"><svelte:component this={navItem.icon} /></span>
					{navItem.displayName}
				</span>
			{/each} 
		</nav>
		<div class="bg-white h-full max-h-full flex-1" use:dndzone={{items: $nodeStore, flipDurationMs: flipDurationMs, dropTargetStyle: {}}} 
		on:consider={handleSort} on:finalize={handleSort}> 
			{#each $nodeStore as node(node.id)}
				<div  class="component h-32 border-dashed border border-gray-300 relative" title="Click on the name to rename it. Delete or backspace to remove this node."
				class:is-selected={selectedNodeId === node.id}
				on:click={(e) => handleNodeClick(e, node)}
				on:focus={(e) => handleNodeFocus(e, node)}
				on:blur={(e) => selectedNodeId = -1}
				on:keyup={(e) => handleNodeKey(e, node.id)}
				animate:flip={{duration: flipDurationMs}}>
					<div class="legend absolute top-0 left-0 z-50 text-xs bg-gray-200 opacity-50 p-1 text-center" 
					contenteditable="true" 
					bind:innerHTML={node.name}
					tabindex="-1">
						{node.name}
					</div>
					<svelte:component this={node.component} bind:this={node.instance} />
				</div>
			{/each}
		</div>
	</div>
	<div class="bg-gray-100 border border-l border-t-0 border-r-0 border-b-0 border-gray-400 h-full col-span-3 xl:col-span-2 p-4">
		<SettingsPanel settings={currentSettings} title={currentSettingTitle} />
	</div>
</main>
  
<style>
	.component > .legend {
		display: none;
	}

	.component:hover > .legend, .component.is-selected > .legend {
		display: block;
	}
</style>
