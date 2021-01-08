export default [
  {
    displayName: 'Container',
    icon: 'Container',
    componentType: 'Container',
    defaultUtilities: [
      {
          value: 'p-4',
          label: 'p-4',
          group: 'Padding',
          name: 'p'
      },
      {
        value: 'mb-4',
        label: 'mb-4',
        group: 'Margin',
        name: 'mb'
      }
    ],
    settings: [
      {
        id: 'type',
        displayType: 'Dropdown',
        displayName: 'Type',
        items: [
          {
            label: 'div',
            value: 'div'
          },
          {
            label: 'main',
            value: 'main'
          },
          {
            label: 'header',
            value: 'header'
          },
          {
            label: 'article',
            value: 'article'
          },
          {
            label: 'aside',
            value: 'aside'
          },
          {
            label: 'footer',
            value: 'footer'
          }
        ],
        value: 'div'
      }
    ]
  },
  {
    displayName: 'Grid',
    icon: 'Grid',
    componentType: 'Grid',
    defaultUtilities: [
      {
        value: 'mb-4',
        label: 'mb-4',
        group: 'Margin'
      },
      {
        value: 'grid-cols-2',
        label: 'grid-cols-2',
        group: 'Grid'
      },
      {
        value: 'grid',
        label: 'grid',
        group: 'Grid'
      }
    ],
    settings: []
  }
];