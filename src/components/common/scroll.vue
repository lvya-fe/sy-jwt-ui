<template>
  <div ref="wrapper" class="scroll-wrapper">
    <div class='bscroll'>
      <slot></slot>
      <load-more v-show="showLoad" :show-loading="loadStatus" :tip="loadStatus?'正在加载': '暂无数据'"></load-more>
    </div>
  </div>
</template>
<style lang="less">

  .scroll-wrapper{
    height: calc(~'100vh - 2.7rem');
    overflow: hidden;
    margin-bottom: 1.5rem;
  }
</style>

<script>
  import {LoadMore} from "vux";
  import BScroll from 'better-scroll'

  export default {
    components: {
      LoadMore
    },
    data(){
      return {
        click: true,
        probeType: 2,
        bounce: true,
        bounceTime: 50,
        loadStatus: true,
      }
    },
    props: {
      scrollX: {type: Boolean, default: false},
      listenScroll: {type: Boolean, default: true},
      dataList: {type: Array, default: []},
      pullup: {type: Boolean, default: true},
      pulldown: {type: Boolean, default: false},
      beforeScroll: {type: Boolean, default: false},
      refreshDelay: {type: Number, default: 50},
      showLoad: {type: Boolean, default: false},
    },

    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      dataList() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    },
    mounted () {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: 2,
          bounce: true,
          bounceTime: 50,
        })
        // 是否派发滚动事件
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            console.log("scroll:",pos)
            me.$emit('scroll', pos)
          })
        }
        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            this.showLoad = true
            setTimeout(()=>{
              this.showLoad = false
            }, 1000)
            if (Math.abs(this.scroll.y) <= (Math.abs(this.scroll.maxScrollY) + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        } // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            console.log("touchend:", pos.y)
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }
        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    }

  }
</script>
