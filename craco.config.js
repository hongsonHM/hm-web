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
              "@primary-color": "#3A6351",
              "@border-radius-base": "5px",
              "@text-color": "#333",
              "@typography-title-font-weight": "700",
              "@typography-title-margin-bottom": "0.4em",
              "@menu-collapsed-width": "60px",
              "@menu-dark-bg" : '#3A6351',
              '@table-header-bg': 'rgba(130, 214, 0, 0.1)',
              '@table-row-hover-bg': 'rgba(130, 214, 0, 0.1)',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
