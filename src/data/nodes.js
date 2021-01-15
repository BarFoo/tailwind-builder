// Components
import ContainerComponent from "../nodes/Container.svelte";
import GridComponent from "../nodes/Grid.svelte";
import HeadingComponent from "../nodes/Heading.svelte";
// Settings
import Dropdown from "../settings/Dropdown.svelte";
import InputText from "../settings/InputText.svelte";

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

export const headingNode = {
  canHaveChildren: false,
  component: HeadingComponent,
  name: "Heading",
  settings: {
    text: {
      displayName: "Text",
      displayType: InputText,
      value: "Lorem Ipsum",
    },
    type: {
      displayName: "Type",
      displayType: Dropdown,
      items: ["h1", "h2", "h3", "h4", "h5", "h6"],
      value: "h1",
    },
  },
  utilities: ["font-bold", "mb-2"],
};

export default {
  divNode,
  containerNode,
  gridNode,
  headingNode,
};
