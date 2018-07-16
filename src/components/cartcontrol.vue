<template>
    <!-- font-size 0去掉行内样式的间隙，他是会继承的，需要在子元素里单独设置字体大小 -->
    <div id="cart-control">
        <span class="decrease icon-remove_circle_outline" v-show="food.count > 0" @click="remove($event)"></span>
        <span class="count" v-show="food.count > 0">{{ food.count }}</span>
        <span class="increase icon-add_circle" @click="add($event)"></span>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        // 之前绑定了一个BSscroll插件，这个插件点击会有一个事件的反应,点击原生的DOM也会有一个事件的反应
        // 所以就要判断一些，点击时原生的，还是BSscroll的事件。原生的咱们就return不走，BSscroll的事件再往下走
        add(event) {
            if(event._constructed) {
                // 食物数量为0，给food添加一个count属性，count属性是在cartcontrol里添加的
                // count属性在data.json里面是没有这个数据的
                if(!this.food.count) {
                    Vue.set(this.food,'count');
                    this.food.count = 1; //从0到1的过程
                }else { //不为0，有这个属性的时候，直接++
                    this.food.count ++;
                }
            }
        },
        remove(event) {
            if(event._constructed) {
                this.food.count --;
            }
        }
    }
}
</script>
<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl';
    #cart-control 
        font-size 0
        .icon-remove_circle_outline,.icon-add_circle
            display inline-block
            width  24px
            height 24px
            line-height 24px
        .decrease,.increase
            padding 6px
            color #00a0dc
            font-size 24px
        .count 
            display inline-block
            text-align center
            width 12px
            font-size 10px
            color rgb(147,153,159)
            line-height 24px
            vertical-align top
            padding-top 6px
            font-weight 500
</style>


