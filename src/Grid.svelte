<script>
  import { onMount } from 'svelte';
  import { notify } from './stores/notify';
  import { padding, margin,  } from './data/settings';

  export let node;

  onMount(() => {
      if(node.settings.length === 0) {
          [padding, margin].forEach(v => {
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
      
      updateClasses();

      const unsubscribe = notify.subscribe(n => {
          if(n.type === 'settingChanged' && n.identifier === node.id) {
              updateClasses();
          }
      }); 

      return {
          destroy() {
              unsubscribe();
          }
      }
  });

  function updateClasses() {
      node.instanceClasses = node.settings.map(s => s.value).join(' ');
  }
</script>