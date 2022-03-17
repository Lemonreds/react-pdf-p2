const path = require('path');

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../example/app.js'),
  output: {
    path: path.join(__dirname, '../example/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '../example/'),
    compress: true,
    host: '127.0.0.1',
    port: 3001,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
module.exports = devConfig;
