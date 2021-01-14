<script>
  import { previewBreakpoint, previousBreakpoint } from "./stores";
  import { getContext } from "svelte";
  import CodePopup from "./CodePopup.svelte";
  import DesktopIcon from "./icons/Desktop.svelte";
  import TabletIcon from "./icons/Tablet.svelte";
  import MobileIcon from "./icons/Mobile.svelte";
  import CodeIcon from "./icons/Code.svelte";

  const { open } = getContext("modal");
  const previewClick = (breakpoint) => $previewBreakpoint = breakpoint;

  const showCodeModal = () => {
    // Force to desktop breakpoint to get all correct utilities
    // Perhaps store the previous breakpoint and when modal is closed
    // go back to it?
    $previousBreakpoint = $previewBreakpoint;
    $previewBreakpoint = null;
    open(CodePopup);
  };
</script>

<div class="flex gap-3">
  <span class="code-icon align-middle" title="View Code" on:click={showCodeModal}><CodeIcon /></span>
  <span class="preview-icon" class:is-preview-active={$previewBreakpoint === "desktop"} title="Desktop Preview"
    on:click={() => previewClick("desktop")}><DesktopIcon /></span>
  <span class="preview-icon-tablet" class:is-preview-active={$previewBreakpoint === "tablet"} title="Tablet Preview"
    on:click={() => previewClick("tablet")}><TabletIcon /></span>
  <span class="preview-icon" class:is-preview-active={$previewBreakpoint === "mobile"} title="Mobile Preview"
    on:click={() => previewClick("mobile")}><MobileIcon /></span>
</div>

<style>
  .preview-icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  .preview-icon-tablet {
    width: 1.18rem;
    height: 1.5rem;
    cursor: pointer;
  }
  .code-icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  :global(.code-icon > svg) {
    fill: #666;
  }
  :global(.preview-icon:hover > svg, .preview-icon-tablet:hover > svg) {
    fill: #666;
  }
  :global(.preview-icon > svg, .preview-icon-tablet > svg) {
    fill: #aaa;
  }
  :global(.is-preview-active > svg) {
    fill: #000 !important;
  }
</style>