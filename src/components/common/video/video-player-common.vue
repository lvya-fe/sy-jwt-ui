<!--
组件名称：视频播放组件
props:
  options  视频信息 ，类型object. .sync方式
  showDelete 是否显示删除 bool 默认flase

event:
  @deleteVideo 删除视频

-->

<template>
  <div v-if="initVideo" class="video-player-common">
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="videoOptions"
    ></video-player>
    <div class="delete-video" @click="deleteVideo" v-if="showDelete">
      <img src="@/assets/img/shanchub.png" alt="">
    </div>

    <!--<video id="my-video" src="http://c.tfedu.net/o_1alrflico1qii12j5172a1k2c1egl9.mp4" controls x5-playsinline="" playsinline="" webkit-playsinline=""  x-webkit-airplay="allow" preload="auto"></video>-->

  </div>
</template>

<script>
  import VideoPoster from "@/assets/img/common/video/default.jpg"
  export default {
    name: 'VideoPlayerCommon',
    props: {
      options: {type: Object, default: {}},
      showDelete: {type: Boolean, default: false}
    },
    data () {
      return {
        initVideo: false,
        videoOptions: {
          // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'none', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "mp4",
            src: '' //url地址
          }],
          poster: VideoPoster, //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    watch: {
      options () {
        this.initData()
      }
    },
    methods: {
      initData () {
        let sources = [{
          // type: this.options,
          type: "video/mp4",
          // src: 'http://sy-oss.lvya.org/2019/04/03/upload_dveikmslkjb80yvcf4lrdqvzlgwrf4nm.mp4'
          src: this.options.valex || this.options.val || this.options.formItemValue
        }]

        this.videoOptions.sources = sources
        this.initVideo = true
      },

      deleteVideo () {
        this.initVideo = false
        let options = {...this.options}
        options.valex = options.val = options.formItemValue = ''
        this.$emit('update:options', options)
        this.$emit('deleteVideo')
      }
    },
    mounted () {
      this.initData()
    }
  }
</script>
<style lang="less">
  @import "less/video.less";
</style>
