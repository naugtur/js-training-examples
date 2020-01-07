module.exports = {
  entry: './index.jsx',
  devtool: 'source-map',
  output: {
    path: './',
    filename: 'build.js'
  },
  resolve: {
      modulesDirectories: ["node_modules"],
      extensions: ["", ".js", ".jsx"]
  },
  module: {
      loaders: [{
          test: /\.jsx|\.js$/,
          exclude: /node_modules/,
          loader: "babel"
      }]
  },
};
