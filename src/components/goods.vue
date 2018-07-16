<template>
  <div id="goods">
      <!-- 两栏布局:左边是一串菜单栏，右边是食物 -->
      <!-- $refs对象 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <!-- 这个数据也是请求回来的 -->
        <div v-for="(item,index) in goods" :key="index" class="menu-item" :class="{current: currentIndex===index}" @click="selectIndex(index,$event)">
          <div class="text-wrapper border-1px">
            <!-- type大于0，有特殊的icon -->
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
            <span class="text">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="(items,index) in goods" :key="index" class="foods-list-hook">
            <div class="items-title">{{items.name}}</div>
            <ul>
              <li v-for="(item2,index) in items.foods" :key="index" class="items-content-wrapper">
                <div class="item-icon">
                  <img :src="item2.icon">
                </div>
                <div class="items-content">
                    <div class="items-name">{{item2.name}}</div>
                    <div v-if="item2.description" class="items-description">{{item2.description}}</div>
                    <div class="ratings">
                      <span>月售{{item2.sellCount}}份</span>
                      <span style="margin-left:12px;">好评率{{item2.rating}}%</span>
                    </div>
                    <div class="prices">
                      <span class="price">{{item2.price}}</span>
                      <span v-if="item2.oldPrice" class="oldPrice" style="margin-left:8px">{{item2.oldPrice}}</span>
                    </div>
                    <!-- 添加购物车:外面的框用来定位 -->
                    <div class="cart-control-wrapper">
                        <cartcontrol :food="item2"></cartcontrol>
                    </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 留给购物车组件：在详情页有，评价页有，是通用的组件。 -->
      <!-- 数据在App.vue里面的seller里 "minPrice": 20 最小起送费用,"deliveryPrice": 4配送费 -->
      <!-- 用不了那么多数据，就传两个需要的 -->
      <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>
  </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import BScroll from 'better-scroll';
import shopcart from './shopcart';
import cartcontrol from './cartcontrol';
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classMap:[],
      goods: [],
      heightList: [],
      scrollY: 0
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  created() {
    this.classMap = ['decrease','discount','special','invoice_1','guarantee'];
    axios.get('/good/goods').then(res => {
      if(res.data.code === 0) {
        this.goods = res.data.data;
        console.log(this.goods);//数据拿回来了就去渲染
        Vue.nextTick(() => {
          // 给DOM绑定一个滑动事件
          this._initScroll();
          // 计算一下foods的高度
          this._caculateHeight();
        });
      }
    });
  },
  computed: {
    currentIndex() {
      for(let i = 0; i < this.heightList.length; i++) {
        let height1 = this.heightList[i];
        let height2 = this.heightList[i + 1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      if(this.goods.length !== 0) {
        this.goods.forEach((good) => {
            // 为了计算总数量
            good.foods.forEach(food => {
              if(food.count) {
                foods.push(food);
              }
            }) 
        });
      }
      return foods;
    }
  },
  methods: {
    selectIndex($index,$event) {
      if(!$event._constructed) {//如果不存在这个属性,则为原生点击事件，不执行下面的函数
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list-hook');
      this.foodScroll.scrollToElement(foodList[$index], 300);
    },
    // better-scroll是人家写好的库，需要安装一下:cnpm install better-scroll --save
    // 去git上面看这个组件 better-scroll git:滑动业务挺好得
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper,{
        probeType: 3,
        click: true
      });
      this.foodScroll.on('scroll',(pos) => {
        // 可能是一个负值
        this.scrollY = Math.abs(Math.round(pos.y));
       
      });
    },
    _caculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list-hook');
      let height = 0;
      this.heightList.push(height);
      for(let i = 0; i < foodList.length;i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.heightList.push(height);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl';
  #goods
    display flex
    position absolute
    top 174px
    bottom 48px
    left 0 
    right 0
    width 100%
    overflow hidden
    .icon
      display inline-block
      vertical-align top
      width 14px
      height 14px
      background-size 14px 14px
      &.decrease  
        bg-image('decrease_3')
      &.discount  
        bg-image('discount_3')
      &.guarantee  
        bg-image('guarantee_3')
      &.invoice_1 
        bg-image('invoice_3')
      &.special  
        bg-image('special_3')
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      overflow-y auto
      .menu-item
        padding 0 12px
        font-size 0
        line-height 16px
        &.current
          position relative
          margin-top -1px
          background-color #ffffff
          &::after
            border-top 1px solid #ffffff
          .text
            font-size 12px
            line-height 14px
            font-weight 500 !important
        .text-wrapper
          // 多行文字垂直居中
          display table-cell
          vertical-align middle 
          height 54px
          width 56px
          border-1px(rgba(7,17,27,0.1))
          .text
            font-size 12px
            font-weight 200 
            line-height 14px
    .foods-wrapper
      flex 1
      background-color #fff
      // overflow-y auto
      .items-title
        height 26px
        padding-left 14px
        font-size 12px
        color rgb(147,153,159)
        line-height 26px
        background-color #f3f5f7
        border-left 4px solid #d9dde1
      .items-content-wrapper
        display flex
        margin 18px
        padding-bottom 18px
        position relative
        background-color #ffffff
        border-1px(rgba(7,17,27,0.1))
        &:last-child 
          border-1px(rgb(255,255,255))
          margin-bottom 0
        .item-icon
          flex 0 0 57px
          width 57px
          img 
            width 57px
            height 57px
        .items-content
          flex 1
          padding-left 10px
          .items-name
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
            margin-top 2px
          .items-description, .ratings
            margin-top 8px
            font-size 10px
            color rgb(147,153,159)
            line-height 16px
          .ratings 
            span 
              display inline-block
          .prices
            font-size 20px
            color rgb(240,20,20)
            font-weight 700
            line-height 24px
            .oldPrice
              font-size 10px
              vertical-align top
              color rgb(147,153,159)
              font-weight 700
              line-height 20px
              text-decoration line-through
          .cart-control-wrapper
            position absolute 
            right 0
            bottom 12px

</style>
