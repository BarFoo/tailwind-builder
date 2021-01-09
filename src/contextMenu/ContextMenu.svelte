<script>
	import Menu from './Menu.svelte';
	import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';

  import CodeIcon from '../icons/CodeIcon.svelte';
  import TrashIcon from '../icons/TrashIcon.svelte';
  import RenameIcon from '../icons/RenameIcon.svelte';
  import { selectedNode } from '../stores';
	
	let pos = { x: 0, y: 0 };
	let showMenu = false;
	
	async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}
		
		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
	}
	
	function closeMenu() {
		showMenu = false;
  }
  
  function getCode() {

  }

  function renameNode() {

  }

  function deleteNode() {

  }
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		<MenuOption on:click={getCode}>
      <CodeIcon />
      <span>Get Code</span>
    </MenuOption>
    <MenuDivider />
		<MenuOption on:click={renameNode} isDisabled={$selectedNode === null}>
      <RenameIcon />
      <span>Rename</span>
    </MenuOption>
		<MenuOption on:click={getCode} isDisabled={$selectedNode === null}>
      <TrashIcon />
      <span>Delete</span>
    </MenuOption>
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />