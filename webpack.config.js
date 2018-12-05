const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {

    const production = env.production === 'production';

    const sassLoader = {
        loader: 'sass-loader',
        options: { sourceMap: true}
    };

    return {

        mode: production ? 'production' : 'development',

        entry: [
            path.resolve(__dirname, 'assets', 'scripts', 'main.js'),
            path.resolve(__dirname, 'assets', 'scss', 'main.scss'),
        ],

        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'assets', 'dist'),
            publicPath: '/assets/dist/'
        },
        
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: { publicPath: 'assets/styles' }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: production ? true : false,
                                importLoaders: 2,
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, 'build/postcss.config.js')
                                },
                            }
                        },
                        
                        (production ? sassLoader : 'fast-sass-loader')
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
            ]
        },

        resolve: {
            extensions: ['.js'],
            alias: { 'jquery': 'jquery/dist/jquery.min.js' }
        },
        
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),

            new CleanWebpackPlugin('assets/dist', {
                beforeEmit: true
            }),

            new FriendlyErrorsWebpackPlugin(),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),          
        ],

        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
            ]
        },
        
        devServer: {
            publicPath: '/assets/dist/',
            port: 9000,
            contentBase: '_site',
            watchContentBase: true,
            inline: true,
            open: true,
            overlay: true,
            historyApiFallback: true,
            quiet: true,
        },

        watchOptions: {
            ignored: ['node_modules']
        },
    }
}