import ContainerIcon from "../icons/Container.svelte";
import GridIcon from "../icons/Grid.svelte";
import DivIcon from "../icons/Div.svelte";

import nodes from "./nodes";

export default [
  {
    text: "Div",
    icon: DivIcon,
    node: nodes.divNode,
  },
  {
    text: "Grid",
    icon: GridIcon,
    node: nodes.gridNode,
  },
  {
    text: "Container",
    icon: ContainerIcon,
    node: nodes.containerNode,
  },
];
