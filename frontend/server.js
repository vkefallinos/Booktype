import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {clean} from 'require-clean';
import {exec} from 'child_process';
import express from 'express'
const BOOKTYPEAPP_PORT = 8000;
const APP_PORT = 3000
let appServer;
function startAppServer(callback) {
  const compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          test: /\.js$/,
        }
      ]
    },
    output: {filename: '/app.js', path: '/', publicPath: '/js/'}
  });
  appServer = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {
      '/static': `http://localhost:${BOOKTYPEAPP_PORT}/`,
      '/bookapp': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/accounts': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/groups': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/**/_edit/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/**/_info/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/**/_full/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/**/_history/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/**/_draft/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/_sputnik/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/_utils/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/__debug__/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
    },
    publicPath: '/js/',
    stats: {colors: true}
  });
  // Serve static resources
  appServer.use('/', express.static(path.resolve(__dirname, 'public')));
  appServer.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
    if (callback) {
      callback();
    }
  });
}
startAppServer()
