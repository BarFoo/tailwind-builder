<script>
    import { onMount } from 'svelte';
    import { type, padding, margin } from './data/settings';

    export let node;

    onMount(() => {
        if(node.settings.length === 0) {
            [type, padding, margin].forEach(v => {
                node.settings.push(Object.assign({}, v));
            });

            node.settings.forEach(s => {
                s.identifier = node.id;
                s.isDeletable = false;
                if(s.id === 'padding') {
                    s.value = 'p-4';
                }
            });
        }

    });
</script>

<slot></slot>