'use strict'
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge'); // 使用webpack配置合并插件
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf'); //用到公共的基础配置里的东西，所以引入进来，抽出来是为了不写重复代码
const CopyWebpackPlugin = require('copy-webpack-plugin'); //资源拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 这个插件自动生成HTML模板，并注入到.html文件中
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); //用于更友好地展示webpack的警告、错误等信息的插件
const portfinder = require('portfinder'); //自动打开可用端口的包
// 当前环境的HOST,端口
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    // 在2.6之前的版本中是dev-server.js是单独拿出来的。后来的版本中就把他集成成一个了devServer对象，但是他们做的事件都是一样的
    devServer: {
        clientLogLevel: 'warning', //重新加载server的时候，控制台的一些错误以警告的方式显示
        historyApiFallback: { //处理回退的时候匹配资源
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true, //磨坏热替换特性，热加载，不需要重启服务就把原来的模块给替换掉了。
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true, //是否压缩
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser, //是否自动打开浏览器。
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false, //当你编译出错的时候是否有错误提示
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(), //模块热替换插件，修改模块，用这个插件来修改，修改后，不需要刷新页面。
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true // 将js文件放到body后
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})