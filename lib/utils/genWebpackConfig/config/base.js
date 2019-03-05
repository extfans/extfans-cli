const resolveCliPath = require('../../resolveCliPath');
const resolvePath = require('../../resolvePath');
const resolveBrowserPath = require('../../resolveBrowserPath');

const webpack = require('webpack');

const getCssLoaders = require('./utils/getCssLoaders');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'none',
  // 别名
  resolve: {
    alias: {
      // 实现用import '@/'来从src文件夹开始定位
      '@': resolvePath('browser/base/src'),
      // 实现用import '~/'来从目标浏览器的src文件夹开始定位
      '~': resolveBrowserPath('src'),
      '@extfans/lib': resolvePath('node_modules/@extfans/lib/src')
    }
  },
  resolveLoader: {
    modules: [resolveCliPath('node_modules')],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  },
  output: {
    // 用于存放编译后文件的文件夹
    path: resolvePath('dist'),
    // 资源访问前缀
    publicPath: '/',
    filename: 'static/js/[id].js',
    chunkFilename: 'static/js/[id].js'
  },
  module: {
    rules: [
      {
        test: /\.vue/,
        loader: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: getCssLoaders(true)
      },
      {
        test: /\.css$/,
        use: getCssLoaders(false)
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/imgs/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: 'static/audios/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: {
    // 直接通过EnvironmentPlugin定义
    nodeEnv: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG', 'BROWSER'])
  ]
};