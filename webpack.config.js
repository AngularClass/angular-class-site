
module.exports = {
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?stage=1', exclude: [/node_modules/, /app\/lib/] },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.styl/, loader: 'style!css!stylus' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },

  stylus: {
    use: [
      require('jeet')(),
      require('rupture')()
    ]
  }
};
