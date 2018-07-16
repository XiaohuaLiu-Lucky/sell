'use strict'
// 这里是整个项目主要的配置入口
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path'); //node自带的路径模块

module.exports = {
    // 分两种环境：dev和production
    dev: {

        // Paths
        assetsSubDirectory: 'static', //静态资源文件夹
        assetsPublicPath: '/', //发布路径
        proxyTable: {}, //配置代理API，需要代理的接口，可以跨域

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        // 启动服务器的端口，修改端口的地方,npm start
        port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false, //是否自动打开浏览器
        errorOverlay: true, //查询错误
        notifyOnErrors: true, //通知错我
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        // poll：事件轮询的一个东西
        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true, //使不使用ESLint
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false, //是否显示ESLint错误信息

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map', //webpack用来方便提示的一个配置

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'), // 编译后输入的index.html文件。node.js中，在任何模块文件内部，可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名

        // Paths 路径配置 dist是最后布到线上的文件。
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true, //是否开启SourceMap
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false, //是否开启gzip
        productionGzipExtensions: ['js', 'css'], //需要gzip压缩的文件拓展名

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}