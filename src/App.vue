<template>
  <div id="app">
    <!-- 分三部分 -->
    <!-- <div class="header">header</div> -->
    <!-- 把seller数据传递给组件 -->
    <v-header :seller="seller"></v-header>
    <!-- 路由:导航栏 -->
    <div class="tab border-1px">
      <div class="tab-item">
         <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
// 1.引入组件
import axios from 'axios';
import Goods from './components/goods';
import Header from "./components/header";
export default {
  name: "App",
  data() {
    return {
      seller: {}
    };
  },
  // 2. 注册组件
  components: {
    "v-header": Header,
    "v-goods": Goods
  },
  // 在App.vue刚一加载（vue实例刚刚创建完毕），就要去获取数据，然后传给v-header组件
  // get()里面是获取数据的路径
  created() {
    axios.get('/good/seller').then(res => {
      // console.log(res); //这是咱们要的数据，code是0就是咱们要的数据,把返回的数据赋值给data
      if(res.data.code === 0) {
        this.seller = res.data.data;
        console.log(this.seller);//所有的信息都给罗列出来了。
      }
    })
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import './assets/stylus/index.styl'
  #app 
    .tab 
      display flex
      height 40px
      line-height 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex 1
        text-align center
        font-size 14px
        color rgb(77,85,93)
        & > a 
          width 100%
          height 100%
          display block
        a.active 
          color rgb(240,20,20) !important
</style>
