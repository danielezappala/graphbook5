const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildDirectory = 'dist';
const outputDirectory = buildDirectory + '/client';

module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {   
            test: /\.(woff|woff2|eot|ttf|svg|mp3)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
          }
       ]
    }, 
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)]
        }),
        new HtmlWebpackPlugin({
          template: './public/index.html'
        })
      ]
};