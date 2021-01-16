<script>
    export let name;
    export let width = "1rem";
    export let height = "1rem";
    let icons = [
        {
            box: "24 24",
            name: "div",
            svg: `<path fill="none" d="M0 0h24v24H0z"/><path d="M7.83 20A3.001 3.001 0 1 1 4 16.17V7.83A3.001 3.001 0 1 1 7.83 4h8.34A3.001 3.001 0 1 1 20 7.83v8.34A3.001 3.001 0 1 1 16.17 20H7.83zm0-2h8.34A3.008 3.008 0 0 1 18 16.17V7.83A3.008 3.008 0 0 1 16.17 6H7.83A3.008 3.008 0 0 1 6 7.83v8.34A3.008 3.008 0 0 1 7.83 18zM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>`,
        },
        {
            box: "36 36",
            name: "container",
            svg: `<path d="M32 30H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2zM4 8v20h28V8z" 
                  class="clr-i-outline clr-i-outline-path-1" />
                  <path d="M9 25.3a.8.8 0 0 1-.8-.8v-13a.8.8 0 0 1 1.6 0v13a.8.8 0 0 1-.8.8z" 
                  class="clr-i-outline clr-i-outline-path-2" />
                  <path d="M14.92 25.3a.8.8 0 0 1-.8-.8v-13a.8.8 0 0 1 1.6 0v13a.8.8 0 0 1-.8.8z" 
                  class="clr-i-outline clr-i-outline-path-3" />
                  <path d="M21 25.3a.8.8 0 0 1-.8-.8v-13a.8.8 0 0 1 1.6 0v13a.8.8 0 0 1-.8.8z" 
                  class="clr-i-outline clr-i-outline-path-4" />
                  <path d="M27 25.3a.8.8 0 0 1-.8-.8v-13a.8.8 0 0 1 1.6 0v13a.8.8 0 0 1-.8.8z" 
                  class="clr-i-outline clr-i-outline-path-5" />`,
        },
        {
            box: "24 24",
            name: "grid",
            svg: `<path fill="none" d="M0 0h24v24H0z"/><path d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zM11 13H4v6h7v-6zm9 0h-7v6h7v-6zm-9-8H4v6h7V5zm9 0h-7v6h7V5z"/>`,
        },
        {
          box: "32 32",
          name: "code",
          svg: `<g stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 9l-7 8l7 8M22 9l7 8l-7 8M18 7l-4 20"/></g>`
        },
        {
          box: "24 24",
          name: "dropdown",
          svg: `<path d="M7 10l5 5l5-5" />`
        },
        {
          box: "24 24",
          name: "desktop",
          svg: `<path fill="none" d="M0 0h24v24H0z"/><path d="M4 16h16V5H4v11zm9 2v2h4v2H7v-2h4v-2H2.992A.998.998 0 0 1 2 16.993V4.007C2 3.451 2.455 3 2.992 3h18.016c.548 0 .992.449.992 1.007v12.986c0 .556-.455 1.007-.992 1.007H13z"/>`
        },
        {
          box: "24 24",
          name: "mobile",
          svg: `<path fill="none" d="M0 0h24v24H0z"/><path d="M7 4v16h10V4H7zM6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm6 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>`
        },
        {
          box: "24 24",
          name: "radix",
          svg: `<path fill="none" d="M0 0h24v24H0z"/><path d="M4.5 10.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5S6 12.825 6 12s-.675-1.5-1.5-1.5zm15 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5S21 12.825 21 12s-.675-1.5-1.5-1.5zm-7.5 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z"/>`
        },
        {
          box: "24 24",
          name: "rightArrow",
          svg: `<path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>`
        },
        {
          box: "24 24",
          name: "save",
          svg: `<g stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></g>`
        },
        {
          box: "25 32",
          name: "tablet",
          svg: `<g><path d="M1.5 32h22c.827 0 1.5-.673 1.5-1.5v-29c0-.827-.673-1.5-1.5-1.5h-22C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5zM1 1.5a.5.5 0 0 1 .5-.5h22a.5.5 0 0 1 .5.5v29a.5.5 0 0 1-.5.5h-22a.5.5 0 0 1-.5-.5v-29z"/><path d="M3.5 27h18a.5.5 0 0 0 .5-.5v-23a.5.5 0 0 0-.5-.5h-18a.5.5 0 0 0-.5.5v23a.5.5 0 0 0 .5.5zM4 4h17v22H4V4z"/><circle cx="13" cy="29" r="1"/></g>`
        },
        {
          box: "24 24",
          name: "trash",
          svg: `<path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/>`
        },
        {
          box: "24 24",
          name: "heading",
          svg: `<path fill="none" d="M0 0h24v24H0z"/><path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z"/>`
        }
    ];

    let displayIcon = icons.find((e) => e.name === name);
</script>

<svg
    class={$$props.class}
    focusable="false"
    {width}
    {height}
    viewBox="0 0 {displayIcon.box}">{@html displayIcon.svg}</svg>