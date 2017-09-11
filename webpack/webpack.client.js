const { root } = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  entry : {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'browser': './src/main.browser.ts'
  },
  output : {
    path: root('dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  target: 'web',
  plugins: [
      new HtmlWebpackPlugin({
        template: root('./src/public/index.html'),
        output: root('dist'),
        inject: 'head'
      }),
      new ScriptExtPlugin({
        defaultAttribute: 'defer'
      }),
      new CommonsChunkPlugin({
        name: ['vendor', 'polyfills']
      }),
      new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|html)$/,
          threshold: 10240,
          minRatio: 0.8
      })
  ]
};

