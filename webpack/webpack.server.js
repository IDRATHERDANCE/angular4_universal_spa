const { root } = require('./helpers');
const nodeExternals = require('webpack-node-externals');

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  externals: [
    nodeExternals({
      allowlist: [/@angular/, /@ng/]
    })
  ],
  entry: {
    'server': './src/main.server.ts'
  },
  output: {
    path: root('dist'),
    filename: '[name].[fullhash].js',
    chunkFilename: '[id].s.[fullhash].chunk.js'
  },
  module: {
    rules: [{
      // Explicit rule to run the linker over partial libraries
      test: /.*\.(js|ts)$/,
      include: /node_modules\/@reduxjs\/angular-redux/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            configFile: false,
            plugins: ['@angular/compiler-cli/linker/babel'], // Required!
          }
        }
      ]
    }]
  },
  target: 'node'
};
