<template>
  <div>

    <div v-if="loaded&&!completed&&spinner=='circles'" class="spinner ring-2">
      <div class="ball-holder">
        <div class="ball"></div>
      </div>
    </div>

    <div v-if="loaded&&!completed&&spinner=='spiral'" class="spinner wh-spinner-loading">
    </div>

    <div class="wh_completed" v-if="completed">
      {{completed}}
    </div>
  </div>

</template>

<script>
  //获取滚动条当前的位置
  function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  }

  //获取当前可视范围的高度
  function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = Math.min(
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    } else {
      clientHeight = Math.max(
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    }
    return clientHeight;
  }

  //获取文档完整的总高度 body
  function getScrollHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
  }

  export default {
    name: "HelloWorld",
    data() {
      return {
        loaded: false,
        completed: false
      };
    },
    props: {
      spinner: {
        default: "circles"
      }
    },
    created() {
      var that = this;
      this.change_state = {
        loaded: () => {
          that.loaded = false;
        },
        reset: () => {
          that.completed = false;
        },
        completed: (text = "暂无更多加载") => {
          that.completed = text;
        }
      };
      window.onscroll = function () {
        if (!that.loaded && !that.completed) {
          if (getScrollHeight() - (getScrollTop() + getClientHeight()) < 7) {
            that.loaded = true;
            that.$emit("infinite", that.change_state);
          }
        }
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @keyframes wh-spinner-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .wh-spinner-loading {
    -webkit-animation: wh-spinner-rotate 0.8s infinite linear;
    animation: wh-spinner-rotate 0.8s infinite linear;
    border: 4px solid transparent;
    border-radius: 50%;
    border-top-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    height: 30px;
    width: 30px;
    margin: auto;
  }

  .ring-2 {
    position: relative;
    width: 32px;
    height: 32px;
    margin: 0 auto;
    border: 3px solid #4b9cdb;
    border-radius: 100%;
  }

  .ball-holder {
    position: absolute;
    width: 8px;
    height: 32px;
    left: 12px;
    top: 0px;
    animation: wh-spinner-rotate 0.8s linear infinite;
    -webkit-animation: wh-spinner-rotate 0.8s linear infinite;
  }

  .ball {
    position: absolute;
    top: -7px;
    left: 0;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background: #4282b3;
  }

  .wh_completed {
    text-align: center;
    height: 30px;
    color:#777;
    line-height: 30px;
    font-size: 15px;
  }
</style>
