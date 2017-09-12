const { root } = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
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
    chunkFilename: '[id].b.[hash].chunk.js'
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
      })
  ]
};

