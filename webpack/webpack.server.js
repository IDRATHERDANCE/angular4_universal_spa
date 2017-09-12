const { root } = require('./helpers');
const nodeExternals = require('webpack-node-externals');
// const CompressionPlugin = require("compression-webpack-plugin");
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
  target: 'node',
  // plugins: [
  //   new CompressionPlugin({
  //       asset: "[path].gz[query]",
  //       algorithm: "gzip",
  //       test: /\.(js|html)$/,
  //       threshold: 10240,
  //       minRatio: 0.8
  //   })
  // ]
};
