const { root } = require('./helpers');
const nodeExternals = require('webpack-node-externals');
/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  externals: [
    nodeExternals({
      whitelist: [/@angular/, /@ng/]
    })
  ],
  entry : {
    'server': './src/main.server.ts'
  },
  output : {
    path: root('dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].s.[hash].chunk.js'
  },
  target: 'node'
};
