<template>
    <div class="body-div">
        <div class="top-back">
            <img class="img1" src="@/assets/img/back_left_green.png" alt="" @click="goback">
            <i class="icon iconfont icon-hexinsuyang ts-img"></i>
            <p class="num-p">
                指标总分<span>{{ stuinfo.score }}</span>分
            </p>
        </div>
        <div class="personal-div">
            <p>
                <span>姓名</span>
                <span>{{ stuinfo.name }}</span>
            </p>
            <p>
                <span>性别</span>
                <span>{{ stuinfo.sex=='M'?'男':'女' }}</span>
            </p>
            <p>
                <span>班级</span>
                <span>{{ stuinfo.orgname }}</span>
            </p>
            <!--<p>-->
                <!--<span>出生年月</span>-->
                <!--<span>{{ stuinfo. }}</span>-->
            <!--</p>-->
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
    import echarts from 'echarts';

    export default {
        components: {
        },
        data(){
            return{
                uid:this.$route.params.uid,
                id:this.$route.params.id,
                stuinfo:[],

                dataName: [],
                data: [],

                
            }
        },
        created(){
            this.loadData();
            this.mapData();
        },
        watch:{
            data(){
                this.drawLine()
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            listNum(list){
                var ca = {};
                list.forEach(function(el,index){
                    if(index<5){
                        ca[el]=true
                    }else{
                        ca[el]=false
                    }
                })
                return ca
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        show: true,
                        bottom: 10,
                        selected:this.listNum(this.dataName),
                        data: this.dataName
                    },
                    series : [
                        {
                            name: '所占比例',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:this.data,
                            avoidLabelOverlap: true,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ],
                });
            },
            loadData(){
              var _self = this;
              this.$axios.post( process.env.API_ROOT+"app/tea/viewStu/"+this.uid+"/"+this.id,
                qs.stringify({

                })
              ).then(function(res){
                _self.stuinfo = res.data.info;

              }).catch(function(err){
                _self.errorUtil(err);
              })
            },
            mapData(){
              var _self = this;
              this.$axios.post( process.env.API_ROOT+"app/tea/ajaxStuTarget",
                qs.stringify({
                  stuId : _self.id,
                  uid : _self.uid,
                })
              ).then(function(res){
                _self.data.length = 0;
                _self.data = res.data;

                res.data.forEach(function(value,index,array){
                  _self.dataName.push(value.name);
                });


              }).catch(function(err){
                _self.errorUtil(err);
              })
            }
        }
    }
    </script>

    <style scoped>
    .body-div{background-color: #f4f4f4;}
    .top-back {text-align: center;font-size: 36px;color: #444;padding:20px;background-color: #fff;border-bottom: 1px solid #e3e2e2;/*no*/}
    .top-back .img1{position: absolute;width: 38px;height: 38px;left: 20px;top: 40px}
    .top-back .ts-img{font-size: 76px;color: #01c269}
    .num-p{font-size: 30px;color: #444;}
    .num-p span{color: #01c269;}

    .personal-div{padding: 0 20px;background-color: #fff;}
    .personal-div p{overflow:hidden;padding: 20px 0;border-bottom: 1px solid #e3e2e2;/*no*/}
    .personal-div p:last-child{border-bottom: none;}
    .personal-div p span:first-child{font-size: 28px;color: #444;float: left;}
    .personal-div p span:last-child{font-size: 28px;color: #a2a1a1;float: right;}

    .analysis-indicators{background-color: #fff;margin-top: 20px;}
    .title-div{margin: 0 20px;padding:20px 0;border-bottom: 1px solid #e3e2e2;/*no*/font-size: 30px;color: #444;}

    .growth-curve{background-color: #fff;margin-top: 20px;}
    </style>
