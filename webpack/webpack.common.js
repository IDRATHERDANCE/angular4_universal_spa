const { root } = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  // devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
  },
  output: {
    path: root('dist')
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: '@ngtools/webpack'},
      { test: /\.html$/, loader: 'raw-loader' },
      {test: /\.css$/, include: root('src/app'), loader: 'raw-loader!postcss-loader'},
      {
        test: /\.(scss|sass)$/,
        exclude: root('src/app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']})
      },
      {test: /\.(scss|sass)$/, exclude: root('src/style'), loader: 'raw-loader!postcss-loader!sass-loader'}
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: root('src/public')
    }]),
    new ExtractTextPlugin({filename: 'css/[name].[hash].css'}),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.optimize\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { discardComments: { removeAll: true } }],
    //   },
    //   canPrint: true
    // }),
    new webpack.optimize.UglifyJsPlugin({sourceMap: false, mangle: { keep_fnames: true }, output: {comments: false}})
  ]
};
