import ContainerIcon from "../icons/Container.svelte";
import GridIcon from "../icons/Grid.svelte";

import { containerNode, gridNode } from "./nodes";

export default [
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
