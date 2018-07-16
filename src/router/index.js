import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods'
import Seller from '@/components/seller'
import Ratings from '@/components/ratings'

Vue.use(Router)
    // 引入组件，创建路由
export default new Router({
    linkActiveClass: 'active',
    routes: [{
        path: '/', //首先进来有一个默认的跳转Goods页面
        name: 'goods',
        component: Goods
    }, {
        path: '/goods',
        name: 'goods',
        component: Goods
    }, {
        path: '/seller',
        name: 'seller',
        component: Seller
    }, {
        path: '/ratings',
        name: 'ratings',
        component: Ratings
    }]
})