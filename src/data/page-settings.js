import { padding } from './settings';

let settings = [];
[padding].forEach(v => {
  const copy = Object.assign({}, v);

  if(copy.id === 'padding') {
    copy.value = 'p-4';
  }

  copy.identifier = 'Page';
  copy.isDeletable = true;
  settings.push(copy);
});

export default settings;