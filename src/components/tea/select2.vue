<template>

    <div class="whole">
        <div class="top-div">
            <div class="title">
                <img class="left-img" src="../../assets/img/back_left_green.png" alt="" @click="qx"> 请选择
                <button class="button" type="button" @click="qd">确定</button>
            </div>
            <div class="search-div">
                <div class="search-child">
                    <input type="text" v-model="query" placeholder="搜索">
                    <img src="../../assets/img/sousuo.png" alt="">
                </div>
            </div>
            <div class="tab-div">
                <div class="selected" v-if="type==1" @click="tag(1)">老师</div>
                <div class="selected" v-if="type==2" @click="tag(2)">组织</div>
                <div class="selected" v-if="type==3" @click="tag(3)">学生</div>
            </div>
        </div>



        <div class="con-area" v-show="tea1">
            <div class="con-area-child" v-for="(org,index) in orgsTealist">
                <span @click="teaIn(org)">{{org.title}}</span>
                <strong class="select-dian" v-show="org.dian2" >•</strong>
                <img class="right-img" src="../../assets/img/you.png" alt="" @click="teaIn(org)">
            </div>
        </div>
        <div class="bottom-title" @click.prevent.stop="tallBtn($event)" v-show="tea1">
            已选：{{selecttea}}
        </div>

        <div class="con-area" v-show="tea2">
            <!-- <div class="con-area-child">
              <input class="checkBox" type="checkbox"  ref="all3"  @click="chooseStuAll"
              v-model="checkstuCalculate">
              <span>全选</span>
            </div> -->

            <div class="child-title" >
                <span @click="teaOut">首页 /</span>
                <span>{{teaTab}}</span>
            </div>
            <div class="con-area-child" v-for="(teainfo, key, index) in teas"
                 v-bind:key="teainfo.id" v-if="teainfo.orgids.indexOf(orgid)!=-1">
                <input class="checkBox" type="checkbox" v-model="teainfo.check">
                <span>{{teainfo.name}}</span>
            </div>
        </div>


        <div class="con-area" v-show="tea3">
            <div class="child-title">
                <span >查询{{query}} </span>
            </div>
            <div class="con-area-child" v-for="(teainfo, key, index) in teas"
                 v-bind:key="teainfo.id" v-if="teainfo.isquery">
                <input class="checkBox" type="checkbox" v-model="teainfo.check">
                <span>{{teainfo.name}}</span>
            </div>
        </div>
        <button type="button" class="bottom-title-btn" v-show="tea3" @click="queryOut">返回</button>

        <div class="con-area" v-show="o1">
            <div class="child-title" v-if="tabs.length>0">
                <span @click="orgOutIndex">首页</span>
                <span v-for="tab in tabs"  @click="orgIn(tab,tab.id)">{{'/ '+tab.title+' '}}</span>
            </div>
            <div class="con-area-child">
                <input class="checkBox" type="checkbox"  ref="all3"  @click="chooseOrgAll"
                       v-model="checkorgCalculate">
                <span>全选</span>
            </div>
            <div class="con-area-child" v-for="(org,index) in listOrgToCalculate">
                <input class="checkBox" @change="chooseOrg(org)" type="checkbox" checked="true"  v-model="org.check">
                <span @click="orgIn(org,org.id)">{{org.title}}</span>
                <strong class="select-dian" v-show="org.dian" >•</strong>
                <img class="right-img" src="../../assets/img/you.png" alt=""  @click="orgIn(org,org.id)" v-show="org.ischild">
            </div>
        </div>
        <div class="bottom-title" @click.prevent.stop="tallBtn($event)" v-show="o1">
            已选：{{selectorg}}
        </div>
        <div class="con-area" v-show="o3">
            <div class="child-title" >
                <span >查询{{query}} </span>
            </div>
            <div class="con-area-child" v-for="(org,index) in listOrgToQuery">
                <input class="checkBox" @change="chooseOrg(org)" type="checkbox" checked="true"  v-model="org.check">
                <span @click="orgIn(org,org.id)">{{org.title}}</span>
            </div>
        </div>

        <div class="con-area" v-show="stu1">
            <div class="con-area-child" v-for="(org,index) in orgsStulist">
                <span @click="stuIn(org)">{{org.title}}</span>
                <strong class="select-dian" v-show="org.dian2" >•</strong>
                <img class="right-img" src="../../assets/img/you.png" alt="" @click="stuIn(org)">
            </div>
        </div>
        <div class="bottom-title" @click.prevent.stop="tallBtn($event)" v-show="stu1">
            已选：{{selectstu}}
        </div>

        <div class="con-area" v-show="stu2">
            <!-- <div class="con-area-child">
              <input class="checkBox" type="checkbox"  ref="all3"  @click="chooseStuAll"
              v-model="checkstuCalculate">
              <span>全选</span>
            </div> -->

            <div class="child-title" >
                <span @click="stuOut">首页 /</span>
                <span>{{stuname}}</span>
            </div>
            <div class="con-area-child" v-for="(stu, key, index) in stus" v-bind:key="stu.id" v-if="stu.orgid==orgid">
                <input class="checkBox" type="checkbox" v-model="stu.check">
                <span>{{stu.name}}</span>
            </div>
        </div>

        <div class="con-area" v-show="stu3">
            <div class="child-title" >
                <span >查询{{query}} </span>
            </div>
            <div class="con-area-child" v-for="(stu, key, index) in stus" v-bind:key="stu.id" v-if="stu.isquery">
                <input class="checkBox" type="checkbox" checked="true"  v-model="stu.check">
                <span>{{stu.name}}</span>
            </div>
        </div>
        <button type="button" class="bottom-title-btn" v-show="stu3" @click="queryOut">返回</button>
        <button type="button" class="bottom-title-btn" v-show="stu2" @click="stuOut">返回上一级</button>
        <button type="button" class="bottom-title-btn" v-show="o2" @click="orgOut">返回上一级</button>
        <button type="button" class="bottom-title-btn" v-show="o3" @click="queryOut">返回</button>
        <button type="button" class="bottom-title-btn" v-show="tea2" @click="tea2=false;tea1=true">返回上一级</button>
    </div>



</template>


<script>

    import qs from 'qs';
    import { Group, Cell, Flexbox, FlexboxItem } from 'vux'



    export default {
        name:'select2',

        props: {
            uid: {
                type: String,
                timer:null,
                default: ""
            },
            orgId: {
                type: String,
                timer:null,
                default: ""
            },
            xr: {
                type: Number,
                timer:null,
                default: ""
            },
            type: {
                type: Number,
                timer:null,
                default: ""
            }
        },
        data(){
            return{
                taskname:"",
                query:"",
                stuname:"",
                teaTab:"",
                listOrg:[],
                checkorg :false,
                orgs:[],
                stus:[],
                teas:[],
                stumap:[],
                teamap:[],
                porgs:[],
                teaids:"",
                stuids:"",
                tea1index:0,
                tea2index:0,
                tea1:true,
                tea2:false,
                tea3:false,
                o1:false,
                o2:false,
                o3:false,
                stu1:false,
                stu2:false,
                stu3:false,
                pid:0,
                o_pid:0,
                orgid:0
            }
        },
        filters: {
            dian1(info){
                info.taskbeans.forEach(function(item) {
                    if(item.check){
                        return true;
                    }
                });

                return false;
            }
        },
        watch: {
            query: function (newQuestion, oldQuestion) {

                this.tea3 = false;
                this.stu3 = false;
                this.o3 = false;
                if(this.type==1){
                    if(newQuestion){
                        this.querytea();
                        this.tea3 = true;
                        this.tea2 = false;
                        this.tea1 = false;
                    }else{
                        this.tea3 = false;
                        this.tea2 = false;
                        this.tea1 = true;
                    }
                }


                if(this.type==2){
                    if(newQuestion){
                        this.o1 = false;
                        this.o3 = true;
                    }else{
                        this.o1 = true;
                        this.o3 = false;
                    }
                }

                if(this.type==3){
                    if(newQuestion){
                        this.querystu();
                        this.stu1 = false;
                        this.stu2 = false;
                        this.stu3 = true;
                    }else{
                        this.stu1 = true;
                        this.stu2 = false;
                        this.stu3 = false;
                    }
                }


            }
        },
        computed: {



            tabs:function(){
                var self_ = this;
                var pid_ =this.pid;
                if(pid_==0){
                    return [];
                }

                var arr = [];
                this.listOrg.forEach(function(item) {
                    if(item.id==pid_){
                        arr.unshift(item);
                        if(item.pid==0){
                            return arr;
                        }
                        self_.listOrg.forEach(function(item2) {
                            if(item2.id==item.pid){
                                arr.unshift(item2);
                                return arr;
                            }
                        });
                    }
                });
                return arr;
            },

            stulist:function() {
                var self_ = this;
                self_.stus.forEach(function (stu) {
                    if(stu.check==undefined){
                        stu.check = false;
                    }
                })
                return this.stus.filter(function (item) {
                    return item.orgid == self_.orgid
                })
            },
            orgsStulist:function() {
                var self_ = this;
                this.listOrg.forEach(function(item) {
                    item.dian2 = false;
                    self_.stus.forEach(function (stu) {
                        if(stu.orgid==item.id){
                            if(stu.check){
                                item.dian2 = true;
                            }
                        }
                    })
                });
                return this.listOrg.filter(function (item) {
                    // return item.type == '2'
                    return item
                })
            },
            orgsTealist:function() {
                var self_ = this;
                this.listOrg.forEach(function(item) {
                    item.dian2 = false;
                    self_.teas.forEach(function (tea) {
                        if((","+tea.orgids+",").indexOf(","+item.id+",")!=-1){
                            if(tea.check){
                                item.dian2 = true;
                            }
                        }
                    })
                });
                return this.listOrg.filter(function (item) {
                    return item.type != '-1'
                })
            },
            listOrgToCalculate:function() {
                var self_ = this;
                var flg = true;
                this.listOrg.forEach(function(item) {
                    item.ischild = false;
                    item.dian = false;
                    self_.listOrg.forEach(function(item2) {
                        if(item2.pid==item.id){
                            item.ischild = true;
                            if(item2.check){
                                item.dian = true;
                            }else{
                                flg = false;
                            }
                        }
                    });
                });
                return this.listOrg.filter(function (item) {
                    return item.pid == self_.pid;
                })
            },

            listOrgToQuery:function() {
                var self_ = this;
                return this.listOrg.filter(function (item) {
                    return item.title.indexOf(self_.query)!=-1;
                })
            },
            checkorgCalculate:function() {
                var self_ = this;
                var flg = true;
                this.listOrg.forEach(function(item) {
                    if(self_.pid==item.pid){
                        if(!item.check){
                            flg = false;
                        }
                    }
                });
                return flg;
            },

            checkStuCalculate:function() {
                var self_ = this;
                var flg = true;
                this.stumap[this.orgid].forEach(function(item) {
                    if(item.check==false
                        ||item.check==undefined){
                        flg = false;
                    }
                });
                if(this.stus.length<=0){
                    flg = false;
                }
                return flg;
            },


            selectstu:function(){
                var text = "";
                this.stus.forEach(function(item) {
                    if(item.check){
                        text = text+" "+item.name;
                    }
                });
                if(text==""){
                    return "尚未选择"
                }
                return text;
            },
            selecttea:function(){
                var text = "";
                this.teas.forEach(function(item) {
                    if(item.check){
                        text = text+" "+item.name;
                    }
                });
                if(text==""){
                    return "尚未选择"
                }
                return text;
            },

            selectorg:function(){
                var text = "";
                this.listOrg.forEach(function(item) {
                    if(item.check){
                        text = text+" "+item.title;
                    }
                });
                if(text==""){
                    return "尚未选择"
                }
                return text;
            }
        },

        components: {

        },
        created(){
            // this.loadData();
            this.loadOrg();
            if(this.type==1){
                this.tag(1)
            }else if(this.type==2){
                this.tag(2)
            }else if(this.type==3){
                this.tag(3)
            }
        },
        methods:{
            qx(){
                var self_ = this;
                self_.$emit('qx');
            },
            qd(){
                var self_ = this;
                var rs = [];
                if(self_.type=="1"){
                    self_.teas.forEach(function(item) {
                        if(item.check){
                            rs.push({type:self_.type,id:item.id,name:item.name});
                        }
                    });
                }

                if(self_.type=="2"){
                    self_.listOrg.forEach(function(item) {
                        if(item.check){
                            rs.push({type:self_.type,id:item.id,name:item.title});
                        }
                    });
                }

                if(self_.type=="3"){
                    self_.stus.forEach(function(item) {
                        if(item.check){
                            rs.push({type:self_.type,id:item.id,name:item.name});
                        }
                    });
                }

                if(rs.length==0){
                    this.$vux.toast.show({type: 'warn',width:'10em', text: "请先选择"});
                    return false;
                }

                this.$emit('qd',rs);
            },
            tag(id){
                this.type=id;
                this.tea1 = false;
                this.tea2 = false;

                if(id==1) {
                    this.tea1 = true;
                    this.tea2 = false;
                    this.o1 = false;
                    this.o2 = false;
                    this.o3 = false;
                    this.stu1 = false;
                    this.stu2 = false;
                    this.stu3 = false;
                }else if(id==2){
                    this.pid= 0;
                    this.tea1 = false;
                    this.tea2 = false;
                    this.o1 = true;
                    this.o2 = false;
                    this.o3 = false;
                    this.stu1 = false;
                    this.stu2 = false;
                    this.stu3 = false;
                }else if(id==3){
                    this.tea1 = false;
                    this.tea2 = false;
                    this.o1 = false;
                    this.o2 = false;
                    this.o3 = false;
                    this.stu1 = true;
                    this.stu2 = false;
                    this.stu3 = false;
                }

            },


            chooseStuAll(event){
                var self_ = this;
                var flg = event.currentTarget.checked;
                this.stumap[this.orgid].forEach(function(stu) {
                    stu.check = flg;
                });
            },
            chooseOrgAll(event){
                var self_ = this;
                var flg = event.currentTarget.checked;
                this.listOrg.forEach(function(item) {
                    if(item.pid==self_.pid){
                        item.check = flg;
                        self_.RecursiveOrg(item,flg);
                        self_.pRecursiveOrg(item,flg);
                    }
                });
            },
            RecursiveOrg(item,zt){
                var self_ = this;
                this.listOrg.forEach(function(item2) {
                    if(item.id==item2.pid){
                        item2.check = zt;
                        self_.RecursiveOrg(item2,zt);
                    }
                });
            },
            pRecursiveOrg(item,zt){
                var self_ = this;
                this.listOrg.forEach(function(item2) {
                    if(item.pid==item2.id){
                        if(zt==true){
                            self_.listOrg.forEach(function(item3) {
                                if(item3.pid==item2.id){
                                    if(item3.check==false){
                                        zt = false;
                                    }
                                }
                            });
                        }
                        item2.check = zt;
                        self_.pRecursiveOrg(item2,zt);
                    }
                });
            },
            chooseOrg: function (info) {

                var self_ = this;
                self_.RecursiveOrg(info,info.check);
                self_.pRecursiveOrg(info,info.check);

            },



            loadOrg(){
                var _self = this;
                this.$axios.post( process.env.API_ROOT+"app/tea/common/select/selectOrg",
                    qs.stringify({
                        uid:_self.$route.params.uid,
                        orgId:'',
                        sreach_stu:'',
                        formItemId:_self.xr,
                    })
                ).then(function(res){
                    res.data.listOrg.forEach(function(item) {
                        item.check = false;
                    });
                    _self.listOrg = res.data.listOrg;

                }).catch(function(err){
                    _self.errorUtil(err);
                })

            },

            orgIn(info,id){

                if(info.ischild){
                    this.pid = id;
                    this.o1 =  true;
                    this.o2 =  true;
                }

            },
            orgOutIndex(){
                this.o1 =  true;
                this.o2 =  false;
                this.o3 =  false;
                this.pid = 0;
            },

            orgOut(){
                this.o1 =  true;
                this.o2 =  false;
                this.o3 =  false;
                var _self = this;
                this.listOrg.forEach(function(item) {
                    if(_self.pid==item.id){
                        _self.pid = item.pid;
                    }
                });

                // this.orgs =  this.porgs;
            },
            stuOut(){
                this.stu1 = true;
                this.stu2 = false;
            },

            stuIn(org){
                var orgid = org.id;
                this.stuname=org.title;
                this.stu1 = false;
                this.stu2 = true;
                this.orgid = orgid;
                if(this.stumap[orgid]==undefined){
                    var _self = this;
                    this.$axios.post( process.env.API_ROOT+"app/tea/common/select/selectStu",
                        qs.stringify({
                            uid:_self.$route.params.uid,
                            orgId:orgid,
                            sreach_stu:'',
                            formItemId:_self.xr
                        })
                    ).then(function(res){
                        res.data.listStu.forEach(function(item) {
                            if((","+_self.stuids+",").indexOf(","+item.id+",")==-1){
                                _self.stus.push(item);
                                _self.stuids = _self.stuids+","+item.id;
                            }
                        });
                        _self.stumap[orgid] = res.data.listStu;
                    }).catch(function(err){
                        _self.errorUtil(err);
                    })

                }
            },
            querystu(){
                var _self = this;
                this.$axios.post( process.env.API_ROOT+"app/tea/common/select/selectStu",
                    qs.stringify({
                        uid:_self.$route.params.uid,
                        sreach_stu:this.query,
                        formItemId:_self.xr
                    })
                ).then(function(res){
                    _self.stus.forEach(function(item) {
                        item.isquery= false;
                    });

                    var ids_ = "";
                    res.data.listStu.forEach(function(item) {
                        if((","+_self.stuids+",").indexOf(","+item.id+",")==-1){
                            item.isquery = true;
                            _self.stus.push(item);
                            _self.stuids = _self.stuids+","+item.id;
                        }else{
                            ids_ = ids_+","+item.id;
                        }
                    });

                    //补齐
                    _self.stus.forEach(function(item) {
                        if((","+ids_+",").indexOf(","+item.id+",")!=-1){
                            item.isquery= true;
                        }
                    });

                }).catch(function(err){
                    _self.errorUtil(err);
                })
            },
            teaIn(org){
                var orgid = org.id;
                this.teaTab=org.title;
                this.tea1 = false;
                this.tea2 = true;
                this.orgid = orgid;
                if(this.teamap[orgid]==undefined){
                    var _self = this;
                    this.$axios.post( process.env.API_ROOT+"app/tea/common/select/selectTea",
                        qs.stringify({
                            uid:_self.$route.params.uid,
                            orgId:orgid,
                            sreach_tea:'',
                            formItemId:_self.xr
                        })
                    ).then(function(res){
                        res.data.listTea.forEach(function(item) {
                            if((","+_self.teaids+",").indexOf(","+item.id+",")==-1){
                                _self.teas.push(item);
                                _self.teaids = _self.teaids+","+item.id;
                            }
                        });



                        _self.teamap[orgid] = res.data.listTea;
                    }).catch(function(err){
                        _self.errorUtil(err);
                    })

                }
            },
            querytea(){
                var _self = this;
                this.$axios.post( process.env.API_ROOT+"app/tea/common/select/selectTea",
                    qs.stringify({
                        uid:_self.$route.params.uid,
                        sreach_tea:this.query,
                        formItemId:_self.xr
                    })
                ).then(function(res){
                    _self.teas.forEach(function (item) {
                        item.isquery = false;
                    });

                    var ids_ = "";
                    res.data.listTea.forEach(function (item) {
                        if (("," + _self.teaids + ",").indexOf("," + item.id + ",") == -1) {
                            item.isquery = true;
                            _self.teas.push(item);
                            _self.teaids = _self.teaids + "," + item.id;
                        } else {
                            ids_ = ids_ + "," + item.id;
                        }
                    });

                    //补齐
                    _self.teas.forEach(function (item) {
                        if (("," + ids_ + ",").indexOf("," + item.id + ",") != -1) {
                            item.isquery = true;
                        }
                    });

                }).catch(function(err){
                    _self.errorUtil(err);
                })
            },
            teaOut(){
                this.tea1 = true;
                this.tea2 = false;
            },
            queryOut(){
                this.query = "";
            },
            tallBtn(event){
                event.target.scrollTop=0
                if(event.target.className.indexOf('tollHeight')!=-1){
                    event.target.className='bottom-title'
                }else{
                    event.target.className='tollHeight'
                }
            },
        }
    }
</script>

<style scoped>
    *{box-sizing: border-box}
    .whole{margin-left: auto;margin-right: auto;}
    .top-div{position: fixed;top: 0;right: 0;left: 0;z-index: 100;}
    .title{text-align: center;font-size:36px;position: relative;padding: 20px 0;background: #fff;border-bottom: 1px solid #e7e6e6;/*no*/}
    .title .left-img{width: 38px;height: 38px;position: absolute;left: 20px;top: 20px;}
    .title .button{position: absolute;right: 20px;top: 20px;;width: 138px;height: 48px;color: #01c269;outline: none;background: #fff;font-size: 36px;border-radius: 5px;/*no*/border:1px solid #fff;/*no*/}
    .search-div{background: #f4f4f4;}
    .search-child{padding: 20px;position: relative;display: flex;}
    .search-child input{width: 100%;height: 57px;border:1px solid #e7e6e6;/*no*/border-radius: 5px;/*no*/font-size: 26px;padding-left: 70px;}
    .search-child img{position: absolute;left: 50px;top:33px;width:28px;height:28px;}
    .tab-div{display: flex;text-align: center;background: #f4f4f4;}
    .tab-div > div{font-size: 30px;width: 100%;padding: 20px 0;border-bottom: 2px solid transparent;/*no*/}
    .tab-div > .selected{color: #01c269;border-bottom-color: #01c269;}
    .bottom-title-btn{position: fixed;bottom:0;font-size: 36px;color: #8c8b8b;padding:28px;left: 0;right: 0;border-top: 1px solid #e7e6e6;/*no*/background: #01c269;color: #fff;border: none;width: 100%;}
    .con-area{margin-bottom: 100px;margin-top: 280px;}
    .con-area-ts{margin-bottom: 100px;margin-top: 280px;}

    .bottom-title{position: fixed;bottom:0;font-size: 24px;color: #8c8b8b;padding:10px 40px 0;height:100px;line-height:45px;left: 0;right: 0;border-top: 1px solid #e7e6e6;/*no*/background: #fff;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
    .tollHeight{position: fixed;bottom:0;font-size: 24px;color: #8c8b8b;padding:10px 40px 0;left: 0;right: 0;border-top: 1px solid #e7e6e6;/*no*/background: #fff;height:510px;overflow:auto;line-height:45px;}


    .con-area-child{display:flex;padding: 30px 75px 30px 30px;position: relative;border-bottom: 1px solid #e7e6e6;/*no*/}
    .checkBox {width: 25px;height: 25px;background-color: #fff;-webkit-appearance:none;border: 1px solid #c9c9c9;/*no*/border-radius: 3px;/*no*/outline: none;padding: 2px;/*no*/position: absolute;top: 40px;left: 35px;}
    .checkBox:checked{background: url("../../assets/img/duigou.png")no-repeat center;background-size: cover;border: 1px solid #04BE02;/*no*/background-position: top left;}
    .con-area-child span {font-size: 30px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;margin-left: 50px;width:100%;}
    .con-area-child-ts span {font-size: 30px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;margin-left: 30px;}
    .select-dian{position: absolute;right: 75px;top: 30px;font-size: 26px;color: #01c269;}
    .right-img{position: absolute;right: 25px;top: 38px;width:24px;height:24px;}

    .child-title{font-size: 30px;padding: 30px ;color: #01c269;border-bottom: 1px solid #e7e6e6;/*no*/}
    .child-title span:first-child{border-left: 5px solid #01c269;padding-left: 10px;}
</style>
