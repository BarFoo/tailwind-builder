<script>
  import { onDestroy } from "svelte";
  import { previewInstance, previewBreakpoint, previousBreakpoint } from "./stores";
  import CodeEditor from "./CodeEditor.svelte";

  import beautify from "js-beautify";

  let code;
  
  const SVELTE_COMMENTS = /\<\!\-\-\<.*?\>\-\-\>/gm;
  const BUILDER_CLASSES = ["has-min-height","is-selected"];

  let copy = $previewInstance.cloneNode(true);

  const clean = (el) => {
    if(el.children && el.children.length > 0) {
      for(let c = 0; c < el.children.length; c++) {
        const child = el.children[c];
        if(child.classList) {
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
        }
                  
        clean(child);
      }
    }
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
<CodeEditor {code} loc={true} lang="html" />
<div class="bg-gray-200 p-3 text-right">
  <button class="bg-indigo-500 py-2 px-4 text-white hover:bg-indigo-600">Save Changes</button>
</div>