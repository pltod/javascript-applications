'use strict';

module.exports = {
  entry: './app/client/index.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM' }
    ]
  }
};
