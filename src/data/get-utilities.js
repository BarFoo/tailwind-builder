export default function getUtilities(filterText) {
  filterText = filterText ? filterText.replace(' ', '-').toLowerCase() : '';

  return new Promise((resolve, reject) => {
    if(filterText === '') {
      reject();
    }

    resolve(allUtilities.filter(u => 
      u.value.startsWith(filterText) || 
      u.group.toLowerCase().startsWith(filterText) || 
      u.label.toLowerCase().startsWith(filterText)));
  });
}