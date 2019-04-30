const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    path: path.resolve('build'), // 必须使用绝对地址，输出文件夹
    filename: "[name].js", // 打包后输出文件的文件名
  }, 
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: __dirname + 'node_modules',
        include: __dirname + 'src',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 512,
              name: '[name].[hash:4].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(html|htm)$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src']
          }
        }]
      }, 
      {
        test: /\.css$/,
        // 写法和之前基本一致
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin("css/[name].[hash:4].css"),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['vendor', 'index']
    }),
    new HtmlWebpackPlugin({
      template: './src/login.html',
      filename: 'login.html',
      chunks: ['vendor', 'login']
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  //抽离公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        //抽离第三方插件
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          minChunks: 2
        },
        //抽离自己的公共代码
        common: {
          chunks: 'initial',
          name: 'utils',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  devServer: {
    contentBase: './build',
    host: 'localhost',
    port: 8888,
    open: true,
    hot: true
  }
}
