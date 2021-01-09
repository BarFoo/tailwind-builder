import ComponentMenuItem from '../menu/ComponentMenuItem.svelte';
import ComponentMenuHeaderItem from '../menu/ComponentMenuHeaderItem.svelte';

const containerTypes = [
  [
    {
      label: 'div',
      value: 'div'
    },
    {
      label: 'main',
      value: 'main'
    },
    {
      label: 'section',
      value: 'section'
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
  ]
];

const headingTypes = [
  [
    {
      label: 'h1',
      value: 'h1'
    },
    {
      label: 'h2',
      value: 'h2'
    },
    {
      label: 'h3',
      value: 'h3'
    },
    {
      label: 'h4',
      value: 'h4'
    },
    {
      label: 'h5',
      value: 'h5'
    },
    {
      label: 'h6',
      value: 'h6'
    }
  ]
];

export default [
  {
    displayName: 'Container',
    icon: 'Container',
    componentType: 'Container',
    description: 'Div, header, footer etc.',
    defaultUtilities: ['container', 'p-4', 'mb-4'],
    settings: [
      {
        id: 'type',
        displayType: 'Dropdown',
        displayName: 'Type',
        items: containerTypes,
        value: 'div'
      }
    ]
  },
  {
    displayName: 'Grid',
    icon: 'Grid',
    componentType: 'Grid',
    description: 'Convenient grid creation',
    defaultUtilities: ['grid', 'grid-cols-2', 'p-4', 'mb-4'],
    settings: []
  },
  {
    displayName: 'Components',
    icon: 'Builder',
    componentType: null,
    description: 'Select ready made components, courtesy of Tailblocks.cc',
    defaultUtilities: [],
    children: [
      {
        component: ComponentMenuHeaderItem,
        item: {
          text: 'Contact'
        }
      },
      {
        component: ComponentMenuItem,
        item: {
          screenshotName: 'ContactOne',
          nodeToCreate: {
            displayName: 'Contact One',
            componentType: 'Container',
            defaultUtilities: ['text-gray-600', 'body-font', 'relative'],
            settings: [
              {
                id: 'type',
                displayType: 'Dropdown',
                displayName: 'Type',
                items: containerTypes,
                value: 'section'
              }
            ],
            children: [
              {
                displayName: 'Container',
                componentType: 'Container',
                defaultUtilities: ['px-5', 'py-24', 'mx-auto', 'flex', 'sm:flex-nowrap', 'flex-wrap'],
                settings: [
                  {
                    id: 'type',
                    displayType: 'Dropdown',
                    displayName: 'Type',
                    items: containerTypes,
                    value: 'div'
                  }
                ],
                children: [
                  {
                    displayName: 'Container',
                    componentType: 'Container',
                    defaultUtilities: ['lg:w-2/3', 'md:w-1/2', 'bg-gray-300', 'rounded-lg', 'overflow-hidden', 'sm:mr-10', 'p-10', 'flex', 'items-end', 'justify-start', 'relative'],
                    settings: [
                      {
                        id: 'type',
                        displayType: 'Dropdown',
                        displayName: 'Type',
                        items: containerTypes,
                        value: 'div'
                      }
                    ],
                    children: [
                      {
                        displayName: 'Contact One Left',
                        componentType: 'Container',
                        defaultUtilities: ['bg-white','relative','flex','flex-wrap', 'py-6', 'rounded', 'shadow-md'],
                        settings: [
                          {
                            id: 'type',
                            displayType: 'Dropdown',
                            displayName: 'Type',
                            items: containerTypes,
                            value: 'div'
                          }
                        ],
                        children: [
                          {
                            displayName: 'Container',
                            componentType: 'Container',
                            defaultUtilities: ['lg:w-1/2', 'px-6'],
                            settings: [
                              {
                                id: 'type',
                                displayType: 'Dropdown',
                                displayName: 'Type',
                                items: containerTypes,
                                value: 'div'
                              }
                            ],
                            children: [
                              {
                                displayName: 'Title',
                                componentType: 'Heading',
                                defaultUtilities: ['title-font', 'font-semibold', 'text-gray-900', 'tracking-widest', 'text-xs'],
                                settings: [
                                    {
                                      id: 'headingType',
                                      displayName: 'Type',
                                      displayType: 'Dropdown',
                                      items: headingTypes,
                                      value: 'h1'
                                    },
                                    {
                                      id: 'headingText',
                                      displayName: 'Text',
                                      displayType: 'InputText',
                                      placeholder: 'Enter your heading...',
                                      value: ''
                                    }
                                  ],
                                }
                              ]
                            }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      {
        component: ComponentMenuItem,
        item: {
          screenshotName: 'ContactTwo'
        }
      }
    ]
  }
];