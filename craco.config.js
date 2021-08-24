const CracoLessPlugin = require("craco-less");

/**
 * TODO: Customize the color and properties of ant design
 * Required: @craco/craco
 * Ver: 1.0.0
 * Source: https://ant.design/docs/react/customize-theme
 */
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#3eb8f8",
              "@border-radius-base": "5px",
              "@text-color": "#333",
              "@typography-title-font-weight": "700",
              "@typography-title-margin-bottom": "0.4em",
              "@menu-collapsed-width": "60px",
              "@menu-dark-bg" : '#3eb8f8',
              '@table-header-bg': '#3eb8f8',
              '@table-row-hover-bg': '#3eb8f810',
              '@table-border-radius-base': '10px',
              '@table-header-color': '#fff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
