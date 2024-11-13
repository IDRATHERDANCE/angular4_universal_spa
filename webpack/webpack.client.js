const { root } = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'browser': './src/main.browser.ts'
  },
  output: {
    path: root('dist'),
    filename: '[name].[fullhash].js',
    chunkFilename: '[id].s.[fullhash].chunk.js'
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: root('./src/public/index.html'),
      output: root('dist'),
      inject: 'head'
    }),
    // new ScriptExtPlugin({
    //   defaultAttribute: 'defer'
    // }),
    // new CommonsChunkPlugin({
    //   name: ['vendor', 'polyfills']
    // })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  }
};
