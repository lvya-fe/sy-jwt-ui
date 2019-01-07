<template>
    <div class="bottom-nav">
        <tabbar>
            <tabbar-item class="ripple" :class="(type==1)? 'selected' : ''" :link="'/stuIndex/'+uid">
                <img slot="icon" src="../../assets/img/shouye-1.png" v-if="type==1">
                 <img slot="icon" src="../../assets/img/shouye.png" v-if="type!=1">
                <span slot="label">首页</span>
            </tabbar-item>
            

            <tabbar-item class="ripple" :class="(type==2)? 'selected' : ''" :link="'/personalCenter/'+uid">
                <img slot="icon" src="../../assets/img/wo-1.png" v-if="type==2">
                <img slot="icon" src="../../assets/img/wo.png" v-if="type!=2">
                <span slot="label">我</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
import { TabbarItem, Tabbar } from "vux";
export default {
    name:'bottom-nav',
    data(){
    return{
      uid:this.$route.params.uid,
    }
   },
    props: {
      type: {
        type: Number,
        timer:null,
        default: "0"
      }
    },
    components:{
        TabbarItem,
        Tabbar
    }
}
</script>
<style>
    .bottom-nav .weui-tabbar {
        position: fixed;
        bottom: 0;
        height: 100px;
        background-color: #fff;
    }
    .bottom-nav .weui-tabbar__icon {
        width: 40px;
        height: 40px;
    }
    .bottom-nav .weui-tabbar__item {
        padding-top: 20px;
    }
    .bottom-nav .weui-tabbar__label{
        font-size: 26px;
    }
    .selected p{ color: #01c269}

</style>
