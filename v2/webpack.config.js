const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const path = require('path');

const ENV = process.env.NODE_ENV || 'production';

module.exports = {
  mode: ENV,
  entry: {
    main: path.resolve(__dirname, 'index'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/static',
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      chunks: ['main'],
      inject: false,
      body: ['main'],
    }),
    new ExtractCssChunks(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ]
  }
};
