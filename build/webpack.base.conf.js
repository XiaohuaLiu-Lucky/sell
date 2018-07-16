'use strict'
const path = require('path'); //node自带的文件路径
const utils = require('./utils'); //工具类
const config = require('../config'); //配置文件config/index
const vueLoaderConfig = require('./vue-loader.conf'); //vue-loader.conf位置文件是用来解决各种css文件的，定义了诸如css,less,sass之类的和样式有关的loader
// 返回根路径下的文件和文件夹
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
// 创建ESLint的规则
// /这个东西暂时注释掉，eslint，对代码的格式有严格要求
const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'), //返回根路径
    //入口文件
    entry: {
        app: './src/main.js'
    },
    //出口文件
    output: {
        // 路径是config目录下的index.js中的build配置中的assetsRoot,也就是dist目录
        path: config.build.assetsRoot,
        filename: '[name].js',
        // 上线地址，也就是真正的文件引用路径，如果是production生成环境，其实这里都是'/'
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    // 自动解析拓展，这三种文件格式的引用不需要加文件拓展名。比如duyi.js用的时候可以写成duyi,他知道给你匹配上duyi.js。
    // resolve是webpack的内置选项，顾名思义，决定要做的事情，也就是说当时用import 'jquery'该如何去执行这件事件，就是resolve配置项要做的。
    // import jQuery from './additional/dist/js/jquery'这样会很麻烦，可以起个别名简化操作。
    resolve: {
        // // 省略扩展名，比方说import index from '../js/index', 会默认去找index文件，然后找index.js,.vue,.json
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            // 使用上面的resolve函数，意思是用@代替src的绝对路径
            '@': resolve('src'),
        }
    },
    // 不同的模块使用不同的loader，不同模块的打包配置
    module: {
        rules: [
            // ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                // 对vue文件，使用vue-loader解析
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                // babel-loader把es6解析成es5
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                // url-loader将文件大小低于下面option中limit的图片：小于1万字节，转化为一个base64位的DataURL，直接给你打成js文件，这样会省去很多请求，大于limit的，按[name].[hash:7].[ext]的命名方式放到了static/img下面，方便做cache
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                // // 音频和视频文件处理，同上
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                // // 字体处理，同上　
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}