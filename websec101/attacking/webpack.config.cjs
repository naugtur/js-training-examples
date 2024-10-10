const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
