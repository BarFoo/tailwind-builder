<script>
  // TODO: Review this all the time.. hopefully a cleaner way for dynamic html elements happens in the future..
  // I am well aware how messy this is, but this is unfortunately a missing feature from Svelte itself
  // and so the only other way is using actions which doesn't quite work for our needs.
  import { previewBreakpoint } from "./stores";
  import { parseBreakpointUtilities } from "./functions";

  export let node;
  export let isSelected;

  let tag = node.tag;
  $: cssClasses = parseBreakpointUtilities(node.utilities, $previewBreakpoint).join(" ");

  // Reserved attributes are builder specific or ones we are forced to extract
  let reservedAttrs = ["text"];
  let text = '';

  // These are all attributes not pre-defined and not builder specific
  // Some we have to extract like alt because of compilation issues otherwise
  let attrs = {};

  $: {
    if(node.settings) {
      if(node.settings.text) {
        text = node.settings.text.value;
      }

      for(const [settingName, setting] of Object.entries(node.settings)) {
        // Check if it is a valid attribute
        let tempEl = document.createElement(node.tag);
        const isValid = settingName in tempEl;
        if(isValid && !reservedAttrs.includes(settingName)) {
          attrs[settingName] = setting.value;
        }
        tempEl = undefined;
      }
    }
  }
</script>


{#if tag === "div"}
  <div class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></div>
{:else if tag === "span"}
  <span class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></span>
{:else if tag === "h1"}
  <h1 class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></h1>
{:else if tag === "h2"}
  <h2 class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></h2>
{:else if tag === "h3"}
  <h3 class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></h3>
{:else if tag === "h4"}
  <h4 class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></h4>
{:else if tag === "h5"}
  <h5 class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></h5>
{:else if tag === "h6"}
  <h6 class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></h6>
{:else if tag === "p"}
  <p class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}<slot></slot></p>
{:else if tag === "svg"}
  <svg class={cssClasses} on:click on:keyup {...attrs}><slot></slot></svg>
{:else if tag === "g"}
  <g {...attrs}><slot></slot></g>
{:else if tag === "path"}
  <path {...attrs}><slot></slot></path>
{:else if tag === "a"}
  <a href="/" class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}</a>
{:else if tag === "abbr"}
  <abbr class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}</abbr>
{:else if tag === "address"}
  <address class={cssClasses} class:isSelected on:click on:keyup {...attrs}><slot></slot></address>
{:else if tag === "area"}
  <area alt={attrs.alt} on:click on:keyup />
{:else if tag === "article"}
  <article class={cssClasses} class:isSelected on:click on:keyup {...attrs}><slot></slot></article>
{:else if tag === "aside"}
  <aside class={cssClasses} class:isSelected on:click on:keyup {...attrs}><slot></slot></aside>
{:else if tag === "b"}
  <b class={cssClasses} class:isSelected on:click on:keyup {...attrs}>{text}</b>
{:else if tag === "blockquote"}
  <blockquote class={cssClasses} on:click on:keyup {...attrs}>{text}</blockquote>
{:else if tag === "br"}
  <br />
{:else if tag === "button"}
  <button class={cssClasses} on:click on:keyup {...attrs}>{text}<slot></slot></button>
{:else if tag === "caption"}
  <caption on:click on:keyup>{text}</caption>
{:else if tag === "code"}
  <code class={cssClasses} on:click on:keyup>{text}</code>
{:else if tag === "data"}
  <data on:click on:keyup {...attrs}>{text}</data> 
{:else if tag === "datalist"}
  <datalist on:click on:keyup {...attrs}><slot></slot></datalist>
{:else if tag === "dd"}
  <dd on:click on:keyup {...attrs}>{text}</dd>
{:else if tag === "dt"}
  <dt on:click on:keyup {...attrs}>{text}</dt>
{:else if tag === "dl"}
  <dl on:click on:keyup {...attrs}>{text}</dl>
{:else if tag === "dialog"}
  <dialog class={cssClasses} on:click on:keyup {...attrs}><slot></slot></dialog>
{:else if tag === "dir"}
  <dir on:click on:keyup {...attrs}><slot></slot></dir>
{:else if tag === "em"}
  <em on:click on:keyup {...attrs}><slot></slot></em>
{:else if tag === "fieldset"}
  <fieldset class={cssClasses} on:click on:keyup {...attrs}><slot></slot></fieldset>
{:else if tag === "figure"}
  <figure class={cssClasses} on:click on:keyup {...attrs}><slot></slot></figure>
{:else if tag === "footer"}
  <footer class={cssClasses} class:isSelected on:click on:keyup {...attrs}><slot></slot></footer>
{:else if tag === "form"}
  <form class={cssClasses} on:click on:keyup {...attrs}><slot></slot></form>
{:else if tag === "header"}
  <header class={cssClasses} class:isSelected  on:click on:keyup {...attrs}><slot></slot></header>
{:else if tag === "hgroup"}
  <hgroup class={cssClasses} on:click on:keyup {...attrs}><slot></slot></hgroup>
{:else if tag === "hr"}
  <hr class={cssClasses} />
{:else if tag === "i"}
  <i>{text}</i>
{:else if tag === "img"}
  <!-- svelte-ignore a11y-missing-attribute -->
  <img class={cssClasses} class:isSelected  on:click on:keyup {...attrs} />
{:else if tag === "input"}
  <input class={cssClasses} class:isSelected  on:click on:keyup {...attrs} />
{:else if tag === "label"}
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class={cssClasses} class:isSelected  on:click on:keyup {...attrs}>{text} <slot></slot></label>
{:else if tag === "legend"}
  <legend class={cssClasses} class:isSelected  on:click on:keyup {...attrs}>{text}</legend>
{:else if tag === "li"}
  <li class={cssClasses} class:isSelected  on:click on:keyup {...attrs}>{text} <slot></slot></li>
{:else if tag === "main"}
  <main class={cssClasses} on:click on:keyup {...attrs}><slot></slot></main>
{:else if tag === "nav"}
  <nav class={cssClasses} on:click on:keyup {...attrs}><slot></slot></nav>
{:else if tag === "picture"}
  <picture on:click on:keyup {...attrs}><slot></slot></picture>
{:else if tag === "pre"}
  <pre class={cssClasses} on:click on:keyup {...attrs}>{text}</pre>
{:else if tag === "section"}
  <section class={cssClasses} on:click on:keyup {...attrs}><slot></slot></section>
{:else if tag === "table"}
  <table class={cssClasses} on:click on:keyup {...attrs}><slot></slot></table>
{:else if tag === "tbody"}
  <tbody class={cssClasses} on:click on:keyup {...attrs}><slot></slot></tbody>
{:else if tag === "td"}
  <td class={cssClasses} on:click on:keyup {...attrs}>{text}<slot></slot></td>
{:else if tag === "textarea"}
  <textarea class={cssClasses} on:click on:keyup {...attrs}>{text}</textarea>
{:else if tag === "tfoot"}
  <tfoot class={cssClasses} on:click on:keyup {...attrs}><slot></slot></tfoot>
{:else if tag === "tr"}
  <tr class={cssClasses} on:click on:keyup {...attrs}><slot></slot></tr>
{:else if tag === "ul"}
  <ul class={cssClasses} class:isSelected on:click on:keyup {...attrs}><slot></slot></ul>
{:else if tag === "ol"}
  <ol class={cssClasses} class:isSelected on:click on:keyup {...attrs}><slot></slot></ol>
{/if}

<style>
  div:empty, p:empty {
    border: 1px dashed gray;
  }
  div:empty, p:empty {
    min-height: 6rem;
  }
  .isSelected {
    border: 2px dashed;
  }
  .isSelected:empty {
    border: 2px dashed black;
  }
</style>