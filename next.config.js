require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack'); // eslint-disable-line

module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins || []; // eslint-disable-line

    config.plugins = [ // eslint-disable-line
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },

  // Publicly accessible acess token provided by mapbox
  publicRuntimeConfig: {
    mapboxAccessToken: process.env.MapboxAccessToken,
  },
};
