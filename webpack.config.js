const webpack = require('webpack');
const path = require('path');
const Dashboard = require('webpack-dashboard/plugin');
const rc = require('./package.json').babel;

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    main: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ],
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    overlay: false,
    stats: { colors: true },
    publicPath: 'http://127.0.0.1:8080',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: rc,
        },
        test: /\.js/,
      },
      { use: ['style-loader', 'css-loader', 'stylus-loader'], test: /\.styl/ },
      { use: ['style-loader', 'css-loader'], test: /\.css/ },
    ],
  },

  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.js'],
  },

  plugins: [new Dashboard()],
};
