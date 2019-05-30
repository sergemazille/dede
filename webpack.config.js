const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isProdEnv = process.env.NODE_ENV === 'production';
const Dotenv = require('dotenv-webpack');

const commonModule = {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/]
    },
    {
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader']
    }
  ]
};

const commonAlias = {
  alias: {
    root: path.resolve(__dirname, './'),
    dist: path.resolve(__dirname, 'dist/'),
    scripts: path.resolve(__dirname, 'src/scripts/'),
    webPageForms: path.resolve(__dirname, 'src/WebPageForms/'),
    components: path.resolve(__dirname, 'src/components/'),
    store: path.resolve(__dirname, 'src/store/')
  }
};

const extensionConfig = {
  mode: process.env.NODE_ENV || 'development',

  entry: {
    extension: './src/main_extension.js'
  },

  output: {
    filename: isProdEnv ? '[name].[chunkhash].js' : 'extension.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: commonModule,
  resolve: commonAlias,

  plugins: [
    // copie le fichier html du popup et y injecte le tag <script> avec le bon nom
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),

    // templates Vuejs
    new VueLoaderPlugin(),

    // variables d'environnement
    new Dotenv({
      path: isProdEnv ? './.env' : './.env.local'
    })
  ]
};

const webPageConfig = {
  mode: process.env.NODE_ENV || 'development',

  entry: {
    main: './src/main_webPage.js'
  },

  output: {
    filename: 'webPage.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: commonModule,
  resolve: commonAlias,

  plugins: [new VueLoaderPlugin()]
};

module.exports = [extensionConfig, webPageConfig];
