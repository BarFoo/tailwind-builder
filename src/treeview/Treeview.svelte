<script>
  import { isDragEnabled } from "../stores";
  import TreeviewItem from "./TreeviewItem.svelte";
  
  export let items;
</script>


<ul class="treeview text-sm outline-none" class:cursor-move={$isDragEnabled}>
  {#each items as item (item.id)}
    <TreeviewItem {item} />
  {/each}
</ul>

<style>
  .treeview {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>