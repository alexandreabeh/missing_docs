const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = {
  addOns: ["@storybook/addon-links", "@storybook/addon-essentials"],
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: "babel-loader",
        },
        {
          loader: "@storybook/source-loader",
        },
      ],
    });
    config.module.rules.push({
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          loader: "babel-loader",
        },
        {
          loader: "@mdx-js/loader",
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
