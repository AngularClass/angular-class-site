var webpack = require('webpack');
var EnvPlugin = webpack.DefinePlugin;
var env = process.env.NODE_ENV || 'development';

var checkEnv = function(env, check) {
  env = env.toLowerCase();
  check = check.toLowerCase();
  return env === check;
};

var getRoot = function(env) {
  return env === 'production' ? 'http://produrl/api/v1' :
    'http://localhost:9000/api/v1';
};

var API = {
  root: JSON.stringify(getRoot(env))
};

var Env = {
  prod: checkEnv(env, 'production'),
  testing: checkEnv(env, 'testing'),
  dev: checkEnv(env, 'development'),
  version: JSON.stringify(process.env.BUILD_VERSION || '0.0.1')
};

var envs = new EnvPlugin({
  _ENV: Env,
  _API: API
});

module.exports = {
  output: {
    filename: 'bundle.js'
  },
  devtool: 'sourcemap',
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
  },

  plugins: [envs]
};
