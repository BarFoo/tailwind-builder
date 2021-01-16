<script>
  import { previewBreakpoint, previousBreakpoint } from "./stores";
  import { getContext } from "svelte";
  import CodePopup from "./CodePopup.svelte";
  import Icon from "./common/Icon.svelte";

  const { open } = getContext("modal");
  const previewClick = (breakpoint) => $previewBreakpoint = breakpoint;

  const showCodeModal = () => {
    $previousBreakpoint = $previewBreakpoint;
    $previewBreakpoint = null;
    open(CodePopup);
  };
</script>

<div class="flex gap-3">
  <span class="code-icon align-middle" title="View Code" on:click={showCodeModal}><Icon name="code" width="1.5rem" height="1.5rem" /></span>
  <span class="preview-icon" class:is-preview-active={$previewBreakpoint === "desktop"} title="Desktop Preview"
    on:click={() => previewClick("desktop")}><Icon name="desktop" width="1.5rem" height="1.5rem" /></span>
  <span class="preview-icon" class:is-preview-active={$previewBreakpoint === "tablet"} title="Tablet Preview"
    on:click={() => previewClick("tablet")}><Icon name="tablet" width="1.18rem" height="1.5rem" /></span>
  <span class="preview-icon" class:is-preview-active={$previewBreakpoint === "mobile"} title="Mobile Preview"
    on:click={() => previewClick("mobile")}><Icon name="mobile" width="1.5rem" height="1.5rem" /></span>
</div>

<style>
  .preview-icon, .code-icon {
    cursor: pointer;
  }
  /* Use of global to prevent builder stripping out unused styles.. maybe just allow unused styles? */
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