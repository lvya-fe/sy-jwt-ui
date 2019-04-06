<template>
  <div class="body-div">
    <div class="top-back">
      <img class="img1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
      <div class="n_title">指标分析</div>
    </div>
    <div class="empty-top"></div>
    <div class="personal-div">
      <i class="icon iconfont icon-hexinsuyang ts-img"></i>
      <p class="num-p">
        指标总分<span>{{ stu.score }}</span>分
      </p>
    </div>
    <!-- 图表折线图用之前的就可以了 -->
    <div class="analysis-indicators">
      <div class="title-div">
        指标分析
      </div>
      <div id="myChart" :style="{width: '100%', height: '320px'}"></div>
    </div>
    <!-- <div class="growth-curve">
        <div class="title-div">
            成长曲线
        </div>
    </div> -->
  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    components: {},
    data() {
      return {
        uid: this.$route.params.uid,
        stu: {},
        dataName: [],
        data: [],
      }
    },
    created() {
      this.loadData();
    },
    watch: {
      data() {
        this.drawLine()
      }
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      listNum(list) {
        var ca = {};
        list.forEach(function (el, index) {
          if (index < 5) {
            ca[el] = true
          } else {
            ca[el] = false
          }
        })
        return ca
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: 'scroll',
            show: true,
            bottom: 10,
            selected: this.listNum(this.dataName),
            data: this.dataName
          },
          series: [
            {
              name: '所占比例',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: this.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      loadData() {
        var _self = this;
        this.$axios.post(process.env.API_ROOT + "app/stu/v1/studentDetails",
          qs.stringify({
            uid: _self.$route.params.uid
          })
        ).then(function (res) {
          //学生信息
          _self.stu = res.data.stuInfo;

          _self.data.length = 0;
          _self.data = res.data.listTarget
          res.data.listTarget.forEach(function (value, index, array) {
            _self.dataName.push(value.name);
          });

          console.log(_self.data);
          console.log(_self.dataName);

        }).catch(function (err) {
          _self.errorUtil(err);
        })
      }
    }
  }
</script>

<style scoped>
  .body-div {
    background-color: #f4f4f4;
  }
  .top-back {
    text-align: center;
    font-size: 36px;
    color: #444;
    padding: 20px 20px 10px 20px;
    background-color: #fff;
  }

  .top-back .img1 {
    position: absolute;
    width: 38px;
    height: 38px;
    left: 20px;
    top: 20px
  }

  .num-p {
    font-size: 30px;
    color: #444;
  }

  .num-p span {
    color: #2ed184;
  }

  .personal-div {
    text-align: center;
    font-size: 36px;
    color: #444;
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
  .personal-div .ts-img {
    font-size: 76px;
    color: #2ed184;
  }

  .personal-div p {
    overflow: hidden;
    padding: 20px 0;
    border-bottom: 1px solid #e3e2e2; /*no*/
  }

  .analysis-indicators {
    background-color: #fff;
    margin-top: 20px;
  }

  .title-div {
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: 1px solid #e3e2e2; /*no*/
    font-size: 28px;
    color: #444;
  }

  .growth-curve {
    background-color: #fff;
    margin-top: 20px;
  }
</style>
