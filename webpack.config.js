const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

let ENV = 'development'
process.env.apiHost = 'http://DEV-DOMAIN'
if (process.env.NODE_ENV === 'production') {
  ENV = 'production'
  process.env.apiHost = 'https://PROD-DOMAIN'
}

const browserBabelCfg = () => {
  const babelCfg = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'))
  // babelCfg.plugins.shift()
  babelCfg.babelrc = false
  return babelCfg
}

let plugins = [
  new CleanWebpackPlugin(['./dist']), // Clear dist before build
  new CopyWebpackPlugin([
    {
      from: './assets/**/*',
      to: '.'
    }
  ]),
  new HtmlWebpackPlugin({
    template: './src/index.html', // input
    filename: 'index.html',
    minify: true
  }),
  new webpack.EnvironmentPlugin({ // Add apiHost env variable for api
    apiHost: process.env.apiHost
  })
]

const browserConfig = {
  entry: [
    'babel-polyfill',
    'isomorphic-fetch',
    './src/Client.js'
  ],
  devtool: (ENV === 'development') ? 'cheap-module-eval-source-map' : false,
  mode: ENV,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    sourceMapFilename: 'bundle.map'
  },
  resolve: {
    extensions: ['*', '.js', '.css', '.png', '.jpg', '.gif', '.jpeg'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /(statics\/css\/[^/]+|node_modules\/.+)\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: browserBabelCfg()
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        include: __dirname,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              name: 'img.[name].[hash:base64:7].[ext]',
              publicPath: (ENV === 'production') ? './' : undefined
            }
          }
        ]
      }
    ]
  },
  plugins: plugins,
  optimization: {
    minimize: (ENV === 'production'),
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          }
        }
      })
    ],
    /*
    splitChunks: {
      cacheGroups: {
        default: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/].+js/
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'initial'
        }
      }
    }
    */
    // dynamically loading js through websocket
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          reuseExistingChunk: true
        },
        vendors: {
//          name: 'vendor',
//          chunks: 'initial',
          test: /[\\/]node_modules[\\/].+js/
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
// Config for server-side rendering
const serverConfig = {
  entry: [
    'isomorphic-fetch',
    './src/Server.js'
  ],
  mode: ENV,
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'server.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    })
  ]
}
module.exports = [browserConfig, serverConfig]
