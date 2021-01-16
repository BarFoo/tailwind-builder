import InputText from "../settingControls/InputText.svelte";

const headingSettings = {
  text: {
    displayName: "Text",
    displayType: InputText,
    value: "Lorem Ipsum",
  },
};

export const divNode = {
  tag: "div",
  name: "Div",
  utilities: [],
};

export const containerNode = {
  tag: "div",
  name: "Container",
  utilities: ["container", "mx-auto"],
};

export const gridNode = {
  tag: "div",
  name: "Grid",
  utilities: [
    "grid",
    "grid-cols-1",
    "lg:grid-cols-3",
    "md:grid-cols-2",
    "mb-4",
    "gap-4",
  ],
};

export const headingOneNode = {
  tag: "h1",
  name: "H1",
  settings: { ...headingSettings },
  utilities: ["font-bold", "text-2xl", "mb-2"],
};

export const headingTwoNode = {
  tag: "h2",
  name: "H2",
  settings: { ...headingSettings },
  utilities: ["font-bold", "text-xl", "mb-2"],
};

export const headingThreeNode = {
  tag: "h3",
  name: "H3",
  settings: { ...headingSettings },
  utilities: ["font-bold", "mb-2"],
};

export const headingFourNode = {
  tag: "h4",
  name: "H4",
  settings: { ...headingSettings },
  utilities: ["font-bold", "mb-2"],
};

export const headingFiveNode = {
  tag: "h5",
  name: "H5",
  settings: { ...headingSettings },
  utilities: ["font-bold", "mb-2"],
};

export const headingSixNode = {
  tag: "h6",
  name: "H6",
  settings: { ...headingSettings },
  utilities: ["font-bold", "mb-2"],
};

export default {
  divNode,
  containerNode,
  gridNode,
  headingOneNode,
  headingTwoNode,
  headingThreeNode,
  headingFourNode,
  headingFiveNode,
  headingSixNode,
};
