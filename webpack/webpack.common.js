const { root } = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  devtool: 'source-map',
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
    new ExtractTextPlugin({filename: 'css/[name].[hash].css'})
  ]
};
