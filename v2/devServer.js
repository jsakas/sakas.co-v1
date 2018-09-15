/**
 * Development Server
 */
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackCompiler = webpack(webpackConfig);
const server = express();
const port = 9000;

server.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  writeToDisk: true,
}));

server.use(webpackHotMiddleware(webpackCompiler));

server.use('/', express.static(path.join(__dirname, 'build')));
server.use('/**', express.static(path.join(__dirname, 'build', 'index.html')));

server.listen(port, () => {
  console.log(`Express server is listening on port ${port}...`);
});
