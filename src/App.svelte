<script>
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { app } from './stores/app';
  import { nodeInstances } from './stores/node-instances';
  
  import Node from './Node.svelte';
  import Container from './Container.svelte';
  import Grid from './Grid.svelte';
  import SettingsPanel from './SettingsPanel.svelte';

  import ContainerIcon from './icons/ContainerIcon.svelte';
  import GridIcon from './icons/GridIcon.svelte';

  const navItems = [
    {
      displayName: 'Container',
      icon: ContainerIcon,
      component: Container,
      componentType: 'Container',
      rootBuilderClasses: 'container-root',
      childClasses: 'container-child'
    },
    {
      displayName: 'Grid',
      icon: GridIcon,
      component: Grid,
      componentType: 'Grid',
      rootBuilderClasses: 'grid-root',
      childClasses: 'grid-child'
    }
  ];

  let instances = {};

  function createNode(navItem) {
    let matchingTypes = 0;

    const isRoot = $app.selectedNode === null;
    const root = isRoot ? $app.nodes : $app.selectedNode.children;

    const node = {
      id: $app.nodeIdIncrement++,
      name: navItem.displayName,
      component: navItem.component,
      componentType: navItem.componentType,
      innerHTML: '',
      children: [],
      settings: [],
      builderClasses: isRoot ? navItem.rootBuilderClasses : navItem.childClasses,
      instanceClasses: ''
    };

    root[root.length] = node;
  }

  function handleSort(e) {
    $app.nodes = e.detail.items;
  }

  function handleNodeKey(dispatchEvent) {
    console.log('Something goes here');
    const e = dispatchEvent.detail.keyEvent;
    const node = dispatchEvent.detail.node;
    if (e.target.classList.contains("component")) {
      if(e.keyCode === 46 || e.keyCode === 8) {
        $app.selectedNode = null;
        deleteNode($app.nodes, node.id);
        $app.nodes = $app.nodes;
      }
      // TODO: Maybe support up, down, edit too
    }
  }

  function handleNodeClick(evt) {
    // TODO: Handle right click mouse event for context menu
  } 

  function handleNodeFocus(evt) {
    const node = evt.detail.node;
    if(node !== undefined) {
      $app.selectedNode = node;
    }
  }

  function handlePreviewClick(e) {
    if (e.target.id === 'preview') {
      $app.selectedNode = null;
    }
  }

  function deleteNode(start, nodeId) {
    let found = false;
    const len = start.length;
    for(let i = 0; i < len; i++) {
      if(start[i].id === nodeId) {
        start.splice(i, 1);
        found = true;
        break;
      }

      if(start[i].children.length > 0) {
        found = deleteNode(start[i].children, nodeId);
      }

      if(found) {
        break;
      }
    }
    return found;
  }

  function saveApp(val) {
    const toSave = Object.assign({}, val);
    toSave.selectedNode = null;
    localStorage.setItem("app", JSON.stringify(toSave));
  }

  app.subscribe(val => {
    // Do not save selected node, if a node is selected on page load
    // lifecycle methods DO NOT run. I do not know why, but this is
    // a temporary workaround..
    saveApp(val);
  });

  onMount(() => {
    setInterval(() => {
      $app = $app;
      saveApp($app);
    }, 1000);
  });

</script>

<main class="bg-gray-200 h-screen grid grid-cols-12">
  <div
    class="flex flex-col overflow-hidden h-full col-span-9 xl:col-span-10 py-4 px-8">
    <nav class="flex flex-row text-sm mb-4 gap-2">
      {#each navItems as navItem}
        <span
          class="cursor-pointer"
          on:click={() => createNode(navItem)}>
          <span class="inline-block align-middle"><svelte:component
              this={navItem.icon} /></span>
          {navItem.displayName}
        </span>
      {/each}
    </nav>
    <div
      id="preview"
      class="bg-white h-full max-h-full flex-1 overflow-auto {$app.pageClasses}"
      class:is-selected={$app.selectedNode === null} 
      on:consider={handleSort}
      on:finalize={handleSort}
      on:click|self={handlePreviewClick}>
      {#each $app.nodes as node (node.id)}
        <Node {node} selectedNodeId={$app.selectedNode ? $app.selectedNode.id : -1}
            on:nodeClick={handleNodeClick}
            on:nodeFocus={handleNodeFocus}
            on:nodeKey={handleNodeKey}>
        </Node>
      {/each}
    </div>
  </div>
  <div
    class="bg-gray-100 border border-l border-t-0 border-r-0 border-b-0 border-gray-400 h-full col-span-3 xl:col-span-2 p-4">
    <SettingsPanel />
  </div>
</main>

<style>
  .is-selected {
    border: solid 2px black;
  } 
</style>