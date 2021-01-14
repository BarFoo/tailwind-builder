// Components
import ContainerComponent from "../nodes/Container.svelte";
import GridComponent from "../nodes/Grid.svelte";
// Settings
import Dropdown from "../settings/Dropdown.svelte";

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
  utilities: ["grid", "grid-cols-3", "mx-auto"],
};
