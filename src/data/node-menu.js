import ContainerIcon from "../icons/Container.svelte";
import GridIcon from "../icons/Grid.svelte";
import DivIcon from "../icons/Div.svelte";

import { divNode, containerNode, gridNode } from "./nodes";

export default [
  {
    text: "Div",
    icon: DivIcon,
    node: divNode,
  },
  {
    text: "Container",
    icon: ContainerIcon,
    node: containerNode,
  },
  {
    text: "Grid",
    icon: GridIcon,
    node: gridNode,
  },
];
