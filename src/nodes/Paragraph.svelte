<script>
  import { selectedNode } from "../stores";

  let ref;

  $: text = node.settings["text"];

  export function getHTML() {
    return ref.innerHTML;
  }


</script>

<p bind:this={ref}>{text || "Click here to change this text."}</p>

<style>
  p {
    border: dashed 1px gray;
    position: relative;
    min-height: 2rem;
  }
</style>