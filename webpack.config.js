const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
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
            '@views': path.resolve(__dirname, 'src/views'),
            '@actions': path.resolve(__dirname, 'src/actions'),
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@constants': path.resolve(__dirname, 'src/constants'),
        },
    },
    entry: {
        app: ['./src/index.js'],
        csat: ['./src/views/csat/csat.js'],
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
        // compress: true,
        historyApiFallback: true,
        allowedHosts: 'all',
        hot: true,
    },
    devtool: 'source-map',
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
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new HTMLWebpackPlugin({
            template: './src/csat.html',
            filename: 'csat.html',
            chunks: ['csat'],
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
            ],
        }),
    ],
};
