<pre
	use:codedit={{ code, autofocus, loc, ...$$restProps }}
	class="language-{lang}"
	{style}
	on:change
></pre>

<script context="module"> 
	import { CodeJar } from "codejar";
	import {withLineNumbers} from "codejar/linenumbers";
	import Prism from "prismjs";

	export function codedit(node, { code, autofocus = false, loc = false, ...options }) {

		const highlight = loc ? withLineNumbers(Prism.highlightElement) :
								Prism.highlightElement;

		const editor = CodeJar(node, highlight, options);

		editor.onUpdate(code => {
			const e = new CustomEvent("change", { detail: code });
			node.dispatchEvent(e);
		});

		function update({ code, autofocus = false, loc = false, ...options }) {
			editor.updateOptions(options);
			if (editor.toString() !== code) {
				editor.updateCode(code);
			}
		}

		update({ code, autofocus, loc, ...options });

		autofocus && node.focus();

		return {
			update,
			destroy() {
				editor.destroy();
			}
		};
	}
</script>

<script>
	export let lang = "";
	export let code = "";
	export let autofocus = true;
	export let loc = true;
	export let style = undefined;
</script>

<style global>
	@import "prismjs/themes/prism.css";
	@import "prismjs/themes/prism-okaidia.css";

	pre[class*="language-"] {
		border-radius: 0;
		margin: 0;
	}
</style>