/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  plugins: ["@snowpack/plugin-svelte", "@snowpack/plugin-dotenv"],
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
};
