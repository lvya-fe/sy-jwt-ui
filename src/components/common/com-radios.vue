<template>
    <div>
        <ul class="radioLists">
            <li v-for="radio in lists" class="vux-1px-t" :key="radio.id" @click="radioChange(radio.value)">
                <!-- <input type="radio" :value="radio.value" > -->
                <p :class="{'checked': checkVal == radio.value ,'disabled': disabled}">{{radio.value}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            checkedVal:'',//选中项
        }
    },
    props:{
        lists:{
            type: Array,
            default: []
        },
        checkVal:{
            type: String,
            default: ''
        },
        index:{
            type:Number,
            default:null
        },
        disabled:{
            type: Boolean,
            default:false
        }
    },
    methods:{
        radioChange(val){
            this.checkedVal = val;
            this.$emit('changeVal',this.checkedVal,this.index);
        }
    },
    watch:{
        checkVal(val,oval){
            this.checkedVal = val;
        },
    }
}
</script>
<style lang="less" >
    .radioLists{
        padding: 0 30px;
        li{
            position: relative;
            list-style: none;
            &:nth-child(1){
                &.vux-1px-t:before{
                    border: none;
                }
            }
            input{
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
                z-index: 100;
            }
            p{
                padding-left: 0 !important;
                background: url('../../assets/img/radio1.png') no-repeat right center;
                background-size: 40px 40px;
                &.disabled{
                    background: none;
                }
                &.checked{
                    background: url('../../assets/img/radio_check1.png') no-repeat right center;
                    background-size: 40px 40px;
                    &.disabled{
                        background: url('../../assets/img/checked.png') no-repeat right center;
                        background-size: 35px 31px;
                    }
                }
                
            }
        }
    }
</style>
