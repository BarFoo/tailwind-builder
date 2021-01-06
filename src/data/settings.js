import paddings from './paddings';
import margins from './margins';

export const padding = {
  id: 'padding', 
  displayName: 'Padding',
  displayType: 'Dropdown',
  items: paddings,
  value: 'p-0'
}

export const margin = {
  id: 'margin',
  displayName: 'Margin',
  displayType: 'Dropdown',
  items: margins,
  value: 'm-0'
};

export const display = {
  id: 'display',
  displayName: 'Display',
  displayType: 'Dropdown',
  items: [
    {
      label: ''
    }
  ]
}

export const boxSizing = {
  id: 'boxSizing',
  displayName: 'Box Sizing',
  displayType: 'Dropdown',
  items: [
    {
      value: 'box-border',
      label: 'Border (border-box)'
    },
    {
      value: 'box-content',
      label: 'Content (content-box)'
    }
  ],
  value: ''
};

// Used to search and add settings in the settings panel (or elsewhere)
// This name is a bit iffy, think of a better name!
// The value here must match the id of the type of setting to add
export const searchableSettings = [
  {
    label: 'Padding',
    value: 'padding',
    group: 'Spacing'
  },
  {
    label: 'Margin',
    value: 'margin',
    group: 'Spacing'
  },
  {
    label: 'Box Sizing',
    value: 'boxSizing',
    group: 'Layout'
  }
];

export const allSettings = [
  type,
  padding,
  boxSizing,
  margin
];