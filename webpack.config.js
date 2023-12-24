/* eslint-disable */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode: mode,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@atoms': path.resolve(__dirname, 'src/components/atoms'),
            '@molecules': path.resolve(__dirname, 'src/components/molecules'),
            '@organisms': path.resolve(__dirname, 'src/components/organisms'),
            '@ajax': path.resolve(__dirname, 'src/modules/ajax.js'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@router': path.resolve(__dirname, 'src/modules/router.js'),
            '@utils': path.resolve(__dirname, 'src/modules/utils.js'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@actions': path.resolve(__dirname, 'src/actions'),
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@constants': path.resolve(__dirname, 'src/constants'),
        },
    },
    entry: {
        app: ['./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8000,
        compress: true,
        historyApiFallback: true,
        allowedHosts: 'all',
        hot: true,
    },
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                include: path.resolve(__dirname, 'src/'),
                options: {
                    runtime: require.resolve('handlebars/runtime'),
                },
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimize: mode === 'production',
        minimizer: mode === 'production' ? [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: { drop_console: true },
                },
            }),
        ] : [],
        usedExports: true,
        removeEmptyChunks: true,
        splitChunks: mode === 'production' ? {
            cacheGroups: {
                api: {
                    name: 'api',
                    test: /[\\/]api[\\/]/,
                    chunks: 'all',
                },
                actions: {
                    name: 'actions',
                    test: /[\\/]actions[\\/]/,
                    chunks: 'all',
                },
                dispatcher: {
                    name: 'dispatcher',
                    test: /[\\/]dispatcher[\\/]/,
                    chunks: 'all',
                },
                stores: {
                    name: 'stores',
                    test: /[\\/]stores[\\/]/,
                    chunks: 'all',
                },
                views: {
                    name: 'views',
                    test: /[\\/]views[\\/]/,
                    chunks: 'all',
                },
            },
        } : {},
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/sw.js'),
                    to: path.resolve(__dirname, 'dist'),
                },
                {
                    from: path.resolve(__dirname, 'manifest.json'),
                    to: path.resolve(__dirname, 'dist'),
                },
                {
                    from: path.resolve(__dirname, 'hamster-icon.svg'),
                    to: path.resolve(__dirname, 'dist'),
                },
                {
                    from: path.resolve(__dirname, 'hamster-icon.png'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        ...(mode === 'production' ? [new CompressionPlugin()] : []),
    ],
};
/* eslint-enable */
