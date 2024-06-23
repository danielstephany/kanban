const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require("dotenv-webpack")
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {

    return ({
        mode: env.production ? "production" : "development",
        entry: './src/index.tsx',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        devtool: env.production ? 'source-map' : 'inline-source-map',
        devServer: {
            static: './dist',
        },
        module: {
            rules: [
                {
                    test: /\.(?:js|mjs|cjs|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
                                ['@babel/preset-env', { targets: "defaults" }],
                                "@babel/preset-react"
                            ],
                            plugins: [
                                "@babel/plugin-transform-class-properties",
                                ['babel-plugin-styled-components', {"fileName": false}]
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/imgs',
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Task Master',
                filename: 'index.html',
                template: path.resolve(__dirname, './public/index.html'),
                inject: true,
            }),
            new Dotenv({
                path: path.resolve(__dirname, './.env.' + (env.production ? "prod" : "dev")),
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "./public/publicAssets",
                        to: "publicAssets"
                    },
                ],
            }),
        ],
        resolve: {
            alias: {
                "@src": path.resolve(__dirname, '../src'),
                '@mui/styled-engine': '@mui/styled-engine-sc'
            }
        },
        devServer: {
            //historyApiFallback allows the react router to work properly
            historyApiFallback: true,
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            port: 3000,
            hot: true
        },
    })
};