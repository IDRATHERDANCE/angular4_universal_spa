const { root } = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');
// const { AngularWebpackPlugin } = require('@ngtools/webpack');
// const AngularWebpackPlugin = require('@ngtools/webpack');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * This is a common webpack config which is the base for all builds
 */

// module.exports = {
//   entry: {
//       polyfills: './app/polyfills.ts',
//       vendor: './app/vendor-aot.ts',
//       app: './app/boot-aot.ts'
//   },
//   output: {
//       path: helpers.root('dist/aot'),
//       publicPath: '/',
//       filename: '[name].bundle.js',
//       chunkFilename: '[id].chunk.js'
//   },
//   resolve: {
//       extensions: ['.js', '.ts']
//   },
//   module: {
//       loaders: [
//           {
//               test: /\.ts$/,
//               loader: '@ngtools/webpack'
//           },
//           {
//               test: /\.html$/,
//               loader: 'html-loader'
//           }
//       ]
//   },
//   plugins: [
//       new webpack.optimize.CommonsChunkPlugin({
//           name: ['app', 'vendor', 'polyfills']
//       }),
//       // AOT Plugin
//       new AotPlugin({
//           tsConfigPath: './tsconfig.aot.json',
//           entryModule: helpers.root('app/app.module#AppModule')
//       }),
//       new HtmlWebpackPlugin({
//           template: 'config/index.html'
//       }),
//       new webpack.optimize.UglifyJsPlugin({
//           beautify: false,
//           comments: false,
//           compress: {
//               screw_ie8: true,
//               warnings: false
//           },
//           mangle: {
//               keep_fnames: true,
//               screw_i8: true
//           }
//       }),
//       new webpack.DefinePlugin({
//           'process.env': {
//               'ENV': JSON.stringify(ENV)
//           }
//       })
//   ]
// };


module.exports = {
  // devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
  },
  module: {
    rules: [
      {
        test: /.*\.(js|ts)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: '@ngtools/webpack' }
        ],
      },
      { test: /\.html$/, use: 'raw-loader' },
      // {
      //   test: /\.(scss|css)$/i,
      //   use: [MiniCssExtractPlugin.loader, "sass-loader"],
      // },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'raw-loader',
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      { test: /\.css$/, include: root('src/app'), use: ['raw-loader', 'postcss-loader'] },
      // { test: /\.(scss|sass)$/, exclude: root('src/style'), use: ['raw-loader', 'postcss-loader', 'sass-loader'] },

    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/public/img', to: 'img/' }
      ],
    }),
    // new ExtractTextPlugin({ filename: 'css/[name].[fullhash].css' }),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.optimize\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { discardComments: { removeAll: true } }],
    //   },
    //   canPrint: true
    // }),
    // new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: { keep_fnames: true }, output: { comments: false } }),
    // new MiniCssExtractPlugin(),

    // new AngularWebpackPlugin({
    //   tsconfig: './tsconfig.json'
    // })

  ]
};
