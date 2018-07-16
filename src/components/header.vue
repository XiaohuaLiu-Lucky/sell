<template>
  <div id="header">
    <!-- 分三部分 -->
    <!-- content包裹框 -->
      <div class="content-wrapper">
        <div class="avatar">
            <img :src="seller.avatar" alt="" class="set-img">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand bg-image"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分送达
          </div>
          <!-- 折扣：判断有没有折扣，有再去显示，没有就不显示 -->
          <!-- 这个折扣分两部分：一个为小图标：折，还有一个为文字-->
          <!-- 商家在设置折扣的时候，他想让顾客看到的折扣是会变的，这个地方不是写死的，图标会变，信息会变.他会设置把哪一个优惠条件放在第一个，需要灵活写-->
          <div v-if="seller.supports" class="supports">
            <span class="icon bg-image" :class="classMap[seller.supports[0].type]"></span>
            <span>{{seller.supports[0].description}}</span>
          </div>
          <!-- 判断有没有折扣，有再显示 -->
          <div class="num-wrapper" v-if="seller.supports">
            <span class="num">{{seller.supports.length}}个</span>
            <span class="icon-keyboard_arrow_right more"></span>
          </div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="bulletin-wrapper">
        <span class="bulletin-icon"></span>
        <span class="bulletin">{{seller.bulletin}}</span>
        <span class="icon-keyboard_arrow_right more"></span>
      </div>
      <!-- 背景图片 -->
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  // 接受父级组件传过来的数据，
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classMap: []
    }
  },
  created() {
    this.classMap = ['decrease','discount','special','invoice_1','guarantee'];
    console.log('分数：' + this.seller.score); //验证：测试数据拿到没有
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--引入图标字体，公共设置的方法：1px线，浮动啊-->
<style lang="stylus" ref="stylesheet/stylus">
  @import '../assets/stylus/index.styl'
  #header 
    position relative
    overflow hidden
    .content-wrapper
      position relative
      padding 24px 24px 18px
      background rgba(7,17,27,0.5)
      .avatar 
        float left 
        img 
          border-radius 2px
          set-img(64px)
      .content
        margin-left 64px
        padding-left 16px
        color rgb(255,255,255)
        .title
          .brand
            display inline-block
            bg-image('brand')
            width 30px
            height 18px
            background-size 30px 18px
            vertical-align top
          .name 
            font-size 16px
            font-weight bold
      .description
        margin-top 8px
        font-size 12px
        line-height 12px
      .supports
        margin-top 10px
        font-size 10px
        span 
          display inline-block
        .icon 
          display inline-block
          vertical-align top
          width 16px
          height 16px
          background-size 16px 16px
          &.decrease  
            bg-image('decrease_1')
          &.discount  
            bg-image('discount_1')
          &.guarantee  
            bg-image('guarantee_1')
          &.invoice  
            bg-image('invoice_1')
          &.special  
            bg-image('special_1')
      .num-wrapper
        color rgb(255,255,255)
        position absolute 
        right 12px
        bottom 14px
        padding 7px 8px
        font-size 10px
        border-radius 12px
        background-color rgba(0,0,0,0.2)
        line-height 12px
        .num
        .more
          width 2px
          vertial-align middle
    .bulletin-wrapper
      position relative
      height 28px
      background-color rgba(7,17,27,0.2)
      padding 0 16px 0 12px
      line-height 28px
      white-space nowrap 
      text-overflow ellipsis 
      overflow hidden
      color white
      font-size 10px
      .bulletin-icon
        display inline-block
        vertical-align middle
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
      .bulletin
        margin-left 4px
        margin-right 4px
        vertical-align middle
      .icon-keyboard_arrow_right
        position absolute 
        right 12px
        bottom 8px
    .background
      position absolute 
      top 0
      left 0
      z-index -1
      width 100%
      filter blur(10px)
      img 
        background-size cover
        width 100%

</style>

