import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {clean} from 'require-clean';
import {exec} from 'child_process';
import express from 'express'
import  ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
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
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=draftJsEmojiPlugin__[local]__[hash:base64:5]!postcss-loader'),
        }
      ]
    },
    postcss: [autoprefixer({ browsers: ['> 1%'] })],
    plugins: [
      new ExtractTextPlugin(`${path.parse(process.argv[2]).name}.css`),
    ],
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
      '/**/_apiedit/**': `http://localhost:${BOOKTYPEAPP_PORT}`,
      '/api/*': `http://localhost:${BOOKTYPEAPP_PORT}`,
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
