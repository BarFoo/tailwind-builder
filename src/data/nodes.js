// Components
import ContainerComponent from "../nodes/Container.svelte";
import GridComponent from "../nodes/Grid.svelte";
// Settings
import Dropdown from "../settings/Dropdown.svelte";

export const divNode = {
  canHaveChildren: false,
  component: ContainerComponent,
  name: "Div",
  utilities: [],
  settings: {
    type: {
      readOnly: true,
      value: "div",
    },
  },
};

export const containerNode = {
  canHaveChildren: true,
  component: ContainerComponent,
  name: "Container",
  utilities: ["container", "mx-auto"],
  settings: {
    type: {
      displayName: "Type",
      displayType: Dropdown,
      items: ["div", "main", "section", "article", "aside", "header", "footer"],
      value: "div",
    },
  },
};

export const gridNode = {
  canHaveChildren: true,
  component: GridComponent,
  name: "Grid",
  utilities: ["grid", "grid-cols-1", "lg:grid-cols-3", "md:grid-cols-2"],
};
