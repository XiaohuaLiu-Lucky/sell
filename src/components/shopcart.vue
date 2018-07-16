<template>
  <div id="shopcart">
      <!-- 内容区 -->
      <div class="content-wrapper">
          <!-- 购物车 -->
         <div class="cart-icon-wrapper">
              <div class="chart-icon icon-shopping_cart" :class="{noZChart:totalCount != 0}"></div>
              <div class="total-count" v-show="totalCount != 0">{{totalCount}}</div>
         </div>
         <!-- 配送 -->
         <div class="deliver-fee">
             <!-- 有数量肯定有价格，0元商品不让上架，至少都是0.01元 -->
             <div class="price border-1px-right" :class="{noZPrice:totalCount != 0}">￥{{totalPrice}}</div>
             <div class="deliveryPrice">另需配送费￥{{deliveryPrice}}元</div>
         </div>
         <!-- 起送：会根据totalCount来进行一个加减计算 -->
         <div class="deliver-base" :class="{ok: totalPrice >= minPrice}">{{inform}}</div>
      </div>
      <!-- 浮层 -->
      <div class="cart-list-wrapper" v-show="showList">
          <!-- 遮罩层 -->
          <div class="cart-gray"></div>
          <!-- 食物列表 -->
          <div class="cart-list">
              <!-- 头部 -->
              <div class="cart-list-header">
                  <span class="cart-title">购物车</span>
                  <span class="clear">清空</span>
              </div>
              <!-- 列表详情 -->
              <div class="food-item" v-for="food in selectFoods" :key="food.id">
                  <span class="food-title">{{food.name}}</span>
                  <span class="food-price">{{food.price}}</span>
                  <!-- 加减数量的组件 -->
                  <cartcontrol class="cart-control" :food="food"></cartcontrol>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import cartcontrol from './cartcontrol';
export default {
  name: "shopcart",
  props: {
      deliveryPrice: {
          type: Number
      },
      minPrice: {
          type: Number
      },
      selectFoods: {
          type: Array,
          default() {
              return [{
                  count: 20,
                  price: 2
              },{
                  count: 1,
                  price: 20
              }];
          }
      }
  },
  data() {
    return {
      fold: true
    };
  },
  computed: {
      totalCount() {
          let totalCountNum = 0;
          this.selectFoods.forEach((food)=>{
              totalCountNum += food.count;
          });
          return totalCountNum;
      },
      totalPrice() {
          let totalPriceNum = 0;
           this.selectFoods.forEach((food) => {
              totalPriceNum += food.price * food.count;
          });
          return totalPriceNum;
      },
      inform() {
          if(this.totalPrice === 0) {
              return `￥${this.minPrice}`;
          }else if(this.totalPrice > 0 && this.totalPrice < this.minPrice) {
              return `还差￥${this.minPrice - this.totalPrice}起送`;
          }else {
              return `去结算`;
          }
      },
      showList() {
          if(!this.totalCount) {
              this.fold = true;
              return false;
          }
          return !this.fold;
      }
  },
  components: {
    cartcontrol
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus">
@import '../../static/style.css';
@import '../assets/stylus/index.styl'
#shopcart 
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 300
    .content-wrapper
        width 100%
        height 100%
        display flex
        background-color #141d27
        .cart-icon-wrapper
            flex 0 0 80px
            width 80px
            position relative
            .chart-icon 
                position relative
                width 44px
                height 44px
                border-radius 50%
                border 6px solid #141d27
                background-color #2b343c
                margin-left 18px
                margin-top -10px
                font-size 24px
                color rgba(255,255,255,0.4)
                line-height 44px
                text-align center
                &.noZChart
                    background-color #00a0dc
                    color #ffffff
            .total-count
                position absolute 
                right 0px
                top -6px 
                text-align center
                background-color rgb(240,20,20)
                color #ffffff
                width 24px
                height 16px
                font-size 9px
                font-weight 700
                line-height 16px
                box-shadow 0px 4px 8px 0px rgba(0,0,0,0.4)
                border-radius 16px
        .deliver-fee
            flex 1
            padding 12px 0 12px 12px
            height 24px
            .price
                display inline-block
                line-height 24px
                height 24px
                color rgba(255,255,255,0.4)
                font-size 16px
                font-weight 700
                padding-right 12px
                border-1px-right(rgba(255,255,255,0.1))
                &.noZPrice
                    color #ffffff
            .deliveryPrice
                display inline-block
                padding-left 12px
                font-size 12px
                color rgba(255,255,255,0.4)
                height 24px
                line-height 24px
                font-weight 700
        .deliver-base
            flex 0 0 105px
            padding 0 8px
            height 48px
            line-height 48px
            color rgba(255,255,255,0.2)
            font-weight 700
            font-size 12px
            background-color #2b333b
            text-align center
            &.ok
                background-color #008000
                color #ffffff
    .cart-list-wrapper
        position fixed
        top 0px
        bottom 48px
        width 100%
        display flex
        flex-direction column
        z-index -1
        .cart-gray
            flex 1
            background-color rgba(7,17,27,0.6)      
        .cart-list
            width 100% 
            position fixed 
            bottom 48px
            left 0
            background-color #ffffff
            overflow auto 
            max-height 217px
            .cart-list-header
                height 40px
                line-height 40px
                padding 0 18px
                border-1px(rgba(7,17,27,0.1))
                background-color #f3f5f7
                .cart-title
                    font-size 14px
                    font-weight 200
                    color rgb(7,17,27)
                .clear 
                    position absolute 
                    right 18px
                    font-size 12px
                    color rgb(0,160,220)
            .food-item
                position relative
                width 100%
                height 48px
                line-height 48px
                margin 0 18px
                border-1px(rgba(7,17,27,0.1))
                .food-title
                    font-size 14px
                    color rgb(2,17,27)
                .food-price
                    position absolute
                    right 120px
                    font-size 10px
                .cart-control
                    position absolute 
                    right 20px
                    top 6px
                    display inline-block
</style>
