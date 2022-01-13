var path = require('path');
var SRC_DIR = path.join(__dirname, './client/src');
var DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
  entry: {
    main: { import: `${SRC_DIR}/index.jsx`, filename: `bundle.js` },
    //'register-test':  { import: `${SRC_DIR}/tests/register.jsx`, filename: `tests/[name].js` }
  },
  output: {
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
       }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
};