const limit = 12;
const grid = [
  {
    label: 'Grid',
    value: 'grid',
    group: 'Grid',
    name: 'grid'
  },
  {
    label: 'Grid Cols None',
    value: 'grid-cols-none',
    group: 'Grid',
    name: 'grid-cols'
  }
];

for(let i = 1; i <= limit; i++) {
  grid.push({
    label: 'Grid Columns ' + limit,
    value: 'grid-cols-' + limit,
    group: 'Grid',
    name: 'grid-cols'
  });
}

export default grid;