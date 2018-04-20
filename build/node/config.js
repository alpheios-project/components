const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const projectRoot = process.cwd()

module.exports = {
  style: {
    // This will now be handled by a Webpack's MiniCssExtractPlugin so we don't really need to run any style tasks
    tasks: []
  },
  image: {
    tasks: [
      {source: 'src/images', target: 'dist/images', extensions: ['jpg', 'png', 'svg'], excludedDirs: ['inline-icons']}
    ]
  },
  webpack: {
    common: {
      resolve: {
        alias: {
          // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
          'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js')
        },
        mainFields: ['moduleExternal', 'module', 'main']
      },
      externals: {
        'alpheios-data-models': 'alpheios-data-models',
        'alpheios-inflection-tables': 'alpheios-inflection-tables',
        'alpheios-experience': 'alpheios-experience',
        'alpheios-res-client': 'alpheios-res-client',
        'intl-messageformat': 'intl-messageformat',
        'uuid': 'uuid'
      }
    },
    tasks: [
      {
        mode: 'production',
        context: path.join(projectRoot, 'src/'),
        entry: './plugin.js',
        externals: ['alpheios-data-models', 'alpheios-inflection-tables'],
        output: {
          path: path.join(projectRoot, 'dist/'),
          filename: 'alpheios-components.min.js',
          libraryTarget: 'umd'
        },
        module: {
          rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
              test: /\.js$/,
              use: ['source-map-loader'],
              enforce: 'pre'
            },
            {
              test: /\.json$/,
              use: 'raw-loader',
              type: 'javascript/auto' // To prevent running Webpack's default JSON parser on the output of raw-loader
            },
            {
              test: /\.(jpg|png)$/,
              use: [{
                loader: 'url-loader',
                options: {
                  limit: 25000
                }
              }]
            },
            {
              test: /\.svg$/,
              loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
              options: {
                // optional [svgo](https://github.com/svg/svgo) options
                svgo: {
                  plugins: [
                    {removeDoctype: true},
                    {removeComments: true}
                  ]
                }
              }
            },
            {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
              ]
            },
            {
              test: /\.scss$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
            },
            {
              test: /\.(htmlf)$/,
              use: {
                loader: 'html-loader'
              }
            }
          ]
        },
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
          ]
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: 'style/style.min.css'
          }),
          new VueLoaderPlugin()
        ]
      }
    ],
    devTasks: [
      {
        mode: 'development',
        context: path.join(projectRoot, 'src/'),
        entry: './plugin.js',
        externals: ['alpheios-data-models', 'alpheios-inflection-tables'],
        output: {
          path: path.join(projectRoot, 'dist/'),
          filename: 'alpheios-components.js',
          libraryTarget: 'umd'
        },
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
              test: /\.js$/,
              use: ['source-map-loader'],
              enforce: 'pre'
            },
            {
              test: /\.json$/,
              use: 'raw-loader',
              type: 'javascript/auto' // To prevent running Webpack's default JSON parser on the output of raw-loader
            },
            {
              test: /\.(jpg|png)$/,
              use: [{
                loader: 'url-loader',
                options: {
                  limit: 25000
                }
              }]
            },
            {
              test: /\.svg$/,
              loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
              options: {
                // optional [svgo](https://github.com/svg/svgo) options
                svgo: {
                  plugins: [
                    {removeDoctype: true},
                    {removeComments: true}
                  ]
                }
              }
            },
            {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
              ]
            },
            {
              test: /\.scss$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
            },
            {
              test: /\.(htmlf)$/,
              use: {
                loader: 'html-loader'
              }
            }
          ]
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: 'style/style.css'
          }),
          new VueLoaderPlugin()
        ]
      }
    ]
  }
}
