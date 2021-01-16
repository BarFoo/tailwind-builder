import nodeTypes from "./node-types";

export default [
  {
    text: "Div",
    icon: "div",
    node: nodeTypes.divNode,
  },
  {
    text: "Grid",
    icon: "grid",
    node: nodeTypes.gridNode,
  },
  {
    text: "Container",
    icon: "container",
    node: nodeTypes.containerNode,
  },
  {
    text: "Heading",
    icon: "heading",
    children: [
      {
        text: "Heading 1",
        icon: "heading",
        node: nodeTypes.headingOneNode,
      },
      {
        text: "Heading 2",
        icon: "heading",
        node: nodeTypes.headingTwoNode,
      },
      {
        text: "Heading 3",
        icon: "heading",
        node: nodeTypes.headingThreeNode,
      },
      {
        text: "Heading 4",
        icon: "heading",
        node: nodeTypes.headingFourNode,
      },
      {
        text: "Heading 5",
        icon: "heading",
        node: nodeTypes.headingFiveNode,
      },
      {
        text: "Heading 6",
        icon: "heading",
        node: nodeTypes.headingSixNode,
      },
    ],
  },
];
