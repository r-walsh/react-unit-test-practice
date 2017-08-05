const webpack = require('webpack');
const Dashboard = require('webpack-dashboard/plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
    },
  },
  devtool: 'source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],

  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: 'babel-loader',
        test: /\.js/,
      },
      { use: ['style-loader', 'css-loader', 'stylus-loader'], test: /\.styl/ },
      { use: ['style-loader', 'css-loader'], test: /\.css/ },
    ],

    noParse: [/\/sinon\.js/],
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist/`,
    publicPath: 'http://localhost:8080/',
  },

  plugins: [new Dashboard()],

  resolve: {
    extensions: ['.js'],
  },
};
