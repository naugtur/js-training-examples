
const path = require('path');
const LavaMoat = require('@lavamoat/webpack');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: false,
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
  plugins:[
    // new LavaMoat({
    //   generatePolicy: false,
    // })
  ]
};

