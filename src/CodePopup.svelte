<script>
  import { onDestroy, getContext } from "svelte";
  import { nodes, previewInstance, previewBreakpoint, previousBreakpoint } from "./stores";
  import CodeEditor from "./CodeEditor.svelte";
  import beautify from "js-beautify";
  import { htmlToNodes } from "./node-parser";

  import Button from "./common/Button.svelte";

  let code;
  let updatedCode;
  let hasCodeChanged;

  const SVELTE_COMMENTS = /\<\!\-\-\<.*?\>\-\-\>/gm;
  const BUILDER_CLASSES = ["has-min-height","is-selected"];

  let copy = $previewInstance.cloneNode(true);

  const { close } = getContext("modal");

  const clean = (el) => {
    if(el.children && el.children.length > 0) {
      for(let c = 0; c < el.children.length; c++) {
        const child = el.children[c];
        if(child.classList && child.classList.length > 0) {
          const toRemove = [];
          for(let i = 0; i < child.classList.length; i++) {
            const cls = child.classList[i];
            if(cls.startsWith("svelte-") || BUILDER_CLASSES.includes(cls)) {
              toRemove.push(cls);
            }
          }
          toRemove.forEach((clsToRemove) => {
            child.classList.remove(clsToRemove);
          });
        } else {
          child.removeAttribute("class");
        }
                  
        clean(child);
      }
    }
  }

  const codeChanged = (evt) => {
    updatedCode = evt.detail;
    hasCodeChanged = true;
  }

  const updateNodes = () => {
    if(updatedCode === undefined || updatedCode.length === 0) {
      if(hasCodeChanged) {
        $nodes = [];
      }
      close();
      return;
    }
    
    const newNodes = htmlToNodes(updatedCode);
    $nodes = [...newNodes];
    close();
  }

  clean(copy);
  code = copy.innerHTML.replace(SVELTE_COMMENTS,"");
  code = beautify.html(code);

  // Reset previous and preview breakpoint
  $previewBreakpoint = $previousBreakpoint;
  $previousBreakpoint = null;

  onDestroy(() => {
    copy = undefined;
  });
</script>

<div class="bg-gray-200 p-3">
  <span class="text-2xl font-semibold mb-2">View/Edit Code</span>
</div>
<CodeEditor {code} loc={true} lang="html" on:change={codeChanged} />

<div class="bg-gray-200 p-3 flex gap-4 items-end">
  <div class="flex-grow">
    <Button icon="save" type="success" text="save changes" on:click={updateNodes} />
  </div>
  
  <Button text="Cancel" on:click={() => close()} />
</div>