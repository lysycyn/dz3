const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';

const devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
});

const isDevelopment = process.env.NODE_ENV;

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve('./build'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
            },
            {
                test: /\.(png|woff|woff2|eot|svg|ttf)$/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
    },
    devServer: {
        contentBase: './build',
        noInfo: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        compress: true,
        port: PORT,
        host: HOST,
    },

    plugins:
      isDevelopment === 'development'
      ? [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'],
        }),
        devFlagPlugin,
      ] :
      [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'],
        }),
        new FaviconsWebpackPlugin('./src/favicon.png'),
        new UglifyJSPlugin({ sourceMap: true }),
        devFlagPlugin,
      ]
};
