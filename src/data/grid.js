import spacingModifiers from './spacing-modifiers';

const grid = [
  {
    label: 'Grid',
    value: 'grid',
    group: 'Grid',
    name: 'grid'
  },
  {
    label: 'grid-cols-none',
    value: 'grid-cols-none',
    group: 'Grid',
    name: 'grid-cols'
  },
  {
    label: 'col-auto',
    value: 'col-auto',
    group: 'Grid',
    name: 'col'
  },
  {
    label: 'col-start-auto',
    value: 'col-start-auto',
    group: 'Grid',
    name: 'col-start'
  },
  {
    label: 'col-end-auto',
    value: 'col-end-auto',
    group: 'Grid',
    name: 'col-end'
  },
  {
    label: 'row-auto',
    value: 'row-auto',
    group: 'Grid',
    name: 'row'
  },
  {
    label: 'row-start-auto',
    value: 'row-start-auto',
    group: 'Grid',
    name: 'row-start'
  },
  {
    label: 'row-end-auto',
    value: 'row-end-auto',
    group: 'Grid',
    name: 'row-end'
  },
  {
    label: 'grid-flow-row',
    value: 'grid-flow-row',
    group: 'Grid',
    name: 'grid-flow'
  },
  {
    label: 'grid-flow-col',
    value: 'grid-flow-col',
    group: 'Grid',
    name: 'grid-flow'
  },
  {
    label: 'grid-flow-row-dense',
    value: 'grid-flow-row-dense',
    group: 'Grid',
    name: 'grid-flow'
  },
  {
    label: 'grid-flow-col-dense',
    value: 'grid-flow-col-dense',
    group: 'Grid',
    name: 'grid-flow'
  }
];

for(let i = 1; i <= 12; i++) {
  grid.push({
    label: 'Grid Columns ' + i,
    value: 'grid-cols-' + i,
    group: 'Grid',
    name: 'grid-cols'
  });
}

const gridColStartEndClasses = ['col-start-', 'col-end-', 'col-span-', 'row-start-', 'row-end-', 'row-span-'];

gridColStartEndClasses.forEach((cn) => {
  for(let i = 1; i <= 13; i++) {
    grid.push({
      label: cn + i,
      value: cn + i,
      group: 'Grid',
      name: cn
    });
  }
});

for(let i = 1; i <= 6; i++) {
  grid.push({
    label: 'Grid Rows ' + i,
    value: 'grid-rows-' + i,
    group: 'Grid',
    name: 'grid-rows'
  });
}

const gapClassPrefixes = ['gap-', 'gap-x-', 'gap-y-'];

gapClassPrefixes.forEach((gapClass) => {
  grid.push({
    label: gapClass + 'px',
    value: gapClass + 'px',
    group: 'Grid',
    name: gapClass
  });

  spacingModifiers.forEach((sm) => {
    grid.push({
      label: gapClass + sm,
      value: gapClass + sm,
      group: 'Grid',
      name: gapClass
    });
  });
});

export default grid;