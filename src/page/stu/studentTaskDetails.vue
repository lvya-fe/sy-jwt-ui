<template>
    <div>
        <div class="top-back" v-show="show3">
            <img class="img-1" v-show="!noback" src="../../assets/img/back_left_green.png" alt="" @click="goback">
            <div class="n_title">{{ task.title }}</div>
            <router-link to="" class="img-2">
                <i class="icon iconfont icon-shiyongcishu ripple" @click="propShow"></i>
            </router-link>
            <button v-if="formZt=='X'||formZt=='N'" type="button" @click="add" v-show="isshow1">提交</button>
            <button v-if="formZt=='Y'||formZt=='O'||formZt=='C'" type="button" class="noBtn" v-show="isshow2"></button>
        </div>
        <div v-if="(formZt=='X'||formZt=='N')&&zt!=0" class="taskdetails_content" v-show="show3">
            <!-- 驳回原因 -->
            <div class="taskdetails_ts" v-if="formZt=='N'">
                <span>•驳回原因</span>
                <div class="checkbox_div">
                    {{ bhBz }}
                </div>
            </div>
            <template v-for="item in itmes">


                <!-- 单行输出 -->
                <div class="taskdetails_child" v-if="item.type==1&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input type="text" v-model="item.val" :maxlength="item.charnumber" v-on:input="item.val=item.val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')">
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==1">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 多行输入 -->
                <group v-if="item.type==2&&item.citeDataType!=1" :title="(item.notnull=='Y')?'<strong style='+'color:#ff0000;vertical-align:middle;'+'>*</strong>'+item.name:item.name" class="texCon">
                    <x-textarea :max="item.charnumber" placeholder="" v-model="item.val"  @on-focus="item.val?item.val=item.val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,''):''" @on-blur="item.val?item.val=item.val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,''):''"></x-textarea>
                </group>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==2">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 日期 -->
                <group v-if="item.type==22&&item.citeDataType!=1" class="datetimeCon">
                    <datetime
                        v-model="item.val"
                        :title="(item.notnull=='Y')?'<strong style='+'color:#ff0000;vertical-align:middle;'+'>*</strong>'+item.name:item.name"
                        placeholder="请选择日期">
                    </datetime>
                </group>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==22">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':removeStr(itemRefer.val,8) }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 日期时间 -->
                <group v-if="item.type==3&&item.citeDataType!=1" class="datetimeCon">
                    <datetime
                        v-model="item.val"
                        :title="(item.notnull=='Y')?'<strong style='+'color:#ff0000;vertical-align:middle;'+'>*</strong>'+item.name:item.name"
                        format="YYYY-MM-DD HH:mm"
                        placeholder="请选择日期时间">
                    </datetime>
                </group>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==3">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':removeStr(itemRefer.val,3) }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 整数 -->
                <div class="taskdetails_child" v-if="item.type==19&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input type="tel" v-model="item.val" :maxlength="item.charnumber" @input="number(item.val,item.id)"/>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==19">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>

                <!-- 小数 -->
                <div class="taskdetails_child" v-if="item.type==20&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input type="number" v-model="item.val" :maxlength="item.charnumber" onkeyup= "if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" onkeydown="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);} "/>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==20">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 百分比 -->
                <div class="taskdetails_child" v-if="item.type==21&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input class="bfb" type="number" placeholder="例如(60.23)" v-model="item.val" :maxlength="item.charnumber" onkeyup= "if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" onkeydown="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);} "/>
                    <strong class="bfStrong">%</strong>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==21">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 身份证 -->
                <div class="taskdetails_child" v-if="item.type==27&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input type="text" v-model="item.val" maxlength="18" onKeyup="value=value.replace(/[^\d|xX]/g,'')"/>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==27">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 邮编 -->
                <div class="taskdetails_child" v-if="item.type==26&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input type="text" v-model="item.val" maxlength="6" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"  onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"/>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==26">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 邮箱 -->
                <div class="taskdetails_child" v-if="item.type==14&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input type="text" v-model="item.val" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" />
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==14">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 单选 -->
                <div class="taskdetails_ts" v-if="item.type==4&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="checkbox_div">
                        <div class="border-par">
                            <template v-for="select in item.formSelectItems">
                                    <div class="add_input_parent">
                                        <input class="radio" v-model="item.val" type="radio" :value="select.val" :name="select.itemId" :id="select.id">
                                        <label :for="select.id">{{ select.name }}</label>
                                    </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==4">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 多选 -->
                <div class="taskdetails_ts" v-if="item.type==5&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="checkbox_div">
                        <div class="border-par">
                            <template v-for="select in item.formSelectItems">
                                <div class="add_input_parent">
                                    <input class="checkBox" v-model="item.val" type="checkbox" :name="select.itemId" :id="select.id" :value="select.val">
                                    <label :for="select.id">{{ select.name }}</label>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==5">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val.replace(/,/g,' | ') }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 文本 -->
                <div class="taskdetails_ts" v-if="item.type==8">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="checkbox_div">
                        <!-- {{ item.bz }} -->
                        <x-textarea disabled placeholder="" v-model="item.bz" ></x-textarea>
                    </div>
                </div>
                <!-- <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==8">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div> -->
                <!-- 选择列表 -->
                <div class="taskdetails_ts" v-if="item.type==16&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <template>
                        <select v-model="item.val">
                            <option v-for="(items,index) in item.formSelectItems" :key="index" :value="items.val">{{ items.name }}</option>
                        </select>
                    </template>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==16">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 多选择列表 -->
                <div class="taskdetails_ts" v-if="item.type==17&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="select_peo" @click="muBtn(item.id,item.val)">
                        <strong v-if="item.val.length>0" v-for="(con,index) in item.val" :key="index">{{ con }}</strong>
                    </div>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==17">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val.replace(/,/g,' | ') }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <!-- 省市区 -->
                <div class="taskdetails_child" v-if="item.type==25&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <v-distpicker @selected="onSelected($event,item.id)"  :province="item.val?item.val[0]:''" :city="item.val?item.val[1]:''" :area="item.val?item.val[2]:''" ></v-distpicker>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==25">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val.replace(/,/g,' | ') }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>

                <!-- 电话 -->
                <div class="taskdetails_child" :class="item.othertype&&item.othertype!=null&&item.othertype==1?'phone_div':''" v-if="item.type==15&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input class="sr_input" type="text" placeholder="请输入电话号码" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" v-model="item.val">
                    <button v-if="item.othertype&&item.othertype!=null&&item.othertype==1" type="button" class="dick_yz" @click="obtain($event,item.val)">{{ obtainText }}</button>
                    <!-- <div class="dick_yz" @click="obtain($event,item.val)">{{ obtainText }}</div> -->
                    <input v-if="item.othertype&&item.othertype!=null&&item.othertype==1" class="js_input" type="number" placeholder="请输入验证码" v-model="obtainVal">
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==15">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>{{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.val }}</p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>

                <!-- 选人插件 -->
                <div class="taskdetails_child" v-if="item.type==10">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="select_peo" @click="selectionPlugin(item.id,item.choiceMap.type)">
                        <strong v-if="item.valex.length>0" v-for="(con,index) in item.valex" :key="index" @click.stop="delXr(item.valex,con)">{{ con }} <img src="@/assets/img/shanchub.png" alt=""> </strong>
                    </div>
                    <!-- <input type="text" v-model="item.val" readonly="readonly" @click="selectionPlugin"> -->
                </div>

                <!-- 图片上传 -->
                <p v-if="item.type==6" class="pic_p"><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</p>
                <uploadImg v-if="item.type==6" v-bind:imgs.sync="item.val" v-bind:uid.sync="uid" v-bind:count.sync="count"></uploadImg>

                <!-- 地理位置 -->
                <div class="taskdetails_child" v-if="item.type==9">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <input type="text" v-model="geographic" readonly="readonly">
                </div>

                <!-- 视频上传 -->
                <div class="taskdetails_child" v-if="item.citeDataType!=1&&item.type==29" style="position:relative;">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="addVideo weui-uploader__input-box" v-if="item.val==null||item.val==''||item.val==undefined">
                       <!--<img @click="upDataVideo(item.id,'mp4')" src="@/assets/img/addVideo.png" alt="">-->
                        <input  class="weui-uploader__input"  @change="uploadVideo(item.id,$event,'mp4' )" type="file" accept="video/*" multiple="">
                        <!--class="weui-uploader__input"-->
                        <img src="@/assets/img/addVideo.png"  alt="">
                    </div>
                    <div class="mgTopCss" style="text-align:right;color:#ccc;" @click="upDataVideo(item.id,'mp4')" v-if="item.val==null||item.val==''||item.val==undefined">大文件请点击(电脑上传)</div>
                    <div class="seeVideo" v-if="item.val!=null&&item.val!=''&&item.val!=undefined">
                        <img class="removeSmlieImg" @click="item.val=null" src="@/assets/img/shanchub.png" alt="">
                        <img class ="seeImg" @click="videoPropShow=true" src="@/assets/img/videoImgMo.png" alt="">
                    </div>
                </div>

                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==29">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <div class="seeVideoCustom" v-if="itemRefer.val!=null&&itemRefer.val!=''&&itemRefer.val!=undefined">
                          <VideoPlayerCommen :options="itemRefer"></VideoPlayerCommen>
                            <!--<img class ="seeImg" @click="ckSee(itemRefer.val)" src="@/assets/img/videoImgMo.png" alt="">-->
                        </div>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>

                <!-- 音频上传 -->
                <div class="taskdetails_child" v-if="item.citeDataType!=1&&item.type==28" style="position:relative;">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="addMp3 weui-uploader__input-box"     v-if="item.val==null||item.val==''||item.val==undefined">
                       <!--<strong @click="upDataVideo(item.id,'mp3')"  v-if="item.val==null||item.val==''||item.val==undefined">-->
                           <!--<img class="addMp3Img" src="@/assets/img/addMP3.png" alt="">添加音频-->
                       <!--</strong>-->

                        <!--style="position:absolute; clip:rect(0 0 0 0);"-->
                        <input class="weui-uploader__input"  @change="uploadVideo(item.id,$event,'mp3')" type="file" accept="audio/mpeg" multiple="">

                        <strong v-if="item.val==null||item.val==''||item.val==undefined">
                            <img class="addMp3Img" src="@/assets/img/addMP3.png" alt="">添加音频
                        </strong>
                    </div>
                    <div class="mgTopCss" style="text-align:right;color:#ccc;" @click="upDataVideo(item.id,'mp3')" v-if="item.val==null||item.val==''||item.val==undefined">大文件请点击(电脑上传)</div>
                    <div class="mp3Div">
                        <img class="removeSmlieImg" @click="item.val=null" src="@/assets/img/shanchub.png" alt="">
                        <aplayer v-if="item.val!=null&&item.val!=''&&item.val!=undefined" :autoplay="null" :music="{
                            title: '数据来源自',
                            author: '绿芽',
                            url: item.val,
                            pic: '',
                            lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                        }">
                        </aplayer>
                    </div>
                </div>
                <div class="referenceDiv" v-if="item.citeDataType==1&&item.type==28">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <div class="mp3Div">
                            <aplayer v-if="itemRefer.val!=null&&itemRefer.val!=''&&itemRefer.val!=undefined" :autoplay="null" :music="{
                                title: '数据来源自',
                                author: '绿芽',
                                url: itemRefer.val,
                                pic: '',
                                lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                            }">
                            </aplayer>
                        </div>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>

            </template>



            <!-- <div class="taskdetails_ts">
                <span>地理位置 :</span>
                <div class="checkbox_div">
                    北京市朝阳区惠中北路
                </div>
            </div> -->

            <!-- <div class="taskdetails_child">
                <span>图片上传 :</span>
                <div class="picture_div">
                    <div class="img_div">
                        <img src="../../assets/img/jinxingzhong.png" alt="">
                        <i class="icon iconfont icon-banyuanchahao-"></i>
                    </div>
                    <div class="add_div">
                        <img src="../../assets/img/tj_big.png" alt="">
                    </div>
                </div>
            </div> -->

        </div>


        <div v-if="(formZt=='Y'||formZt=='O'||formZt=='C')||(formZt=='N'&&zt==0)||(formZt=='X'&&zt==0)" class="completed_div" v-show="show3">
            <div class="taskdetails_ts" v-if="formZt=='N'&&zt==0">
                <span>•驳回原因</span>
                <div class="checkbox_div">
                    {{ bhBz }}
                </div>
            </div>
            <div class="taskdetails_ts" v-for="item in itmes">
                <template v-if="item.type!=6&&item.type!=29&&item.type!=28&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div v-if="item.type != 8 && item.type != 2" class="checkbox_div">
                        {{ item.valex==''||item.valex==null||item.valex==undefined?'--':item.type==22?removeStr(item.valex,8):item.type==21?item.valex+'%':item.type==3?removeStr(item.valex,3):(item.type==5||item.type==10||item.type==17||item.type==25)?item.valex.replace(/,/g,' | '):item.valex }}
                    </div>
                    <div v-else class="checkbox_div">
                        <x-textarea v-if="item.type == 8" disabled placeholder="" v-model="item.bz" ></x-textarea>
                        <x-textarea v-if="item.type == 2" disabled placeholder="" v-model="item.val" ></x-textarea>
                    </div>
                </template>
                <div class="referenceDiv referenceDivZs" v-if="item.citeDataType==1&&item.type!=6&&item.type!=29&&item.type!=28">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData" :key="index">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <p>
                            {{ itemRefer.val==''||itemRefer.val==null||itemRefer.val==undefined?'--':itemRefer.type==22?removeStr(itemRefer.val,8):itemRefer.type==21?itemRefer.val+'%':itemRefer.type==3?removeStr(itemRefer.val,3):(itemRefer.type==5||itemRefer.type==10||itemRefer.type==17||itemRefer.type==25)?itemRefer.val.replace(/,/g,' | '):itemRefer.val }}
                        </p>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
                <template v-if="item.type==6&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="picture_div" v-if="item.valex!=''&&item.valex!=null&&item!=undefined">
                        <div class="img_div" v-for="(pictures,index) in item.valex.split(',')" :key="index">
                            <img  :src="pictures" alt="" :preview="item.id">
                        </div>
                    </div>
                    <div v-if="item.valex==''||item.valex==null||item.valex==undefined" class="checkbox_div">
                        --
                    </div>
                </template>

                <template v-if="item.type==29&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="checkbox_div">
                        <div class="seeVideoCustom" v-if="item.valex!=null&&item.valex!=''&&item.valex!=undefined">
                          <VideoPlayerCommen :options="item"></VideoPlayerCommen>
                            <!--<img class ="seeImg" @click="ckSee(item.valex)" src="@/assets/img/videoImgMo.png" alt="">-->
                        </div>
                        <div class="hs_div" v-if="item.valex==''||item.valex==null||item.valex==undefined">
                          --
                        </div>
                    </div>
                </template>

                <div class="referenceDiv referenceDivZs" v-if="item.citeDataType==1&&item.type==29">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData" :key="index">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <div class="seeVideoCustom" v-if="itemRefer.val!=null&&itemRefer.val!=''&&itemRefer.val!=undefined">
                          <VideoPlayerCommen :options="itemRefer"></VideoPlayerCommen>
                            <!--<img class ="seeImg" @click="ckSee(itemRefer.val)" src="@/assets/img/videoImgMo.png" alt="">-->
                        </div>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>



                <template v-if="item.type==28&&item.citeDataType!=1">
                    <span><strong :style="item.notnull=='Y'?'color:#ff0000;vertical-align: middle;':''"> {{ (item.notnull=='Y')?'*':'•' }}</strong>{{ item.name }}</span>
                    <div class="checkbox_div">
                        <div class="mp3Div">
                            <aplayer v-if="item.valex!=null&&item.valex!=''&&item.valex!=undefined" :autoplay="null" :music="{
                                title: '数据来源自',
                                author: '绿芽',
                                url: item.valex,
                                pic: '',
                                lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                            }">
                            </aplayer>
                        </div>
                        <div class="hs_div" v-if="item.valex==''||item.valex==null||item.valex==undefined">
                          --
                        </div>
                    </div>
                </template>

                <div class="referenceDiv referenceDivZs" v-if="item.citeDataType==1&&item.type==28">
                    <span>"{{ item.name }}"</span>
                    <div class="referChildDiv" v-for="(itemRefer,index) in item.listCiteData" :key="index">
                        <p><span>{{ itemRefer.name }}</span> <span>{{ itemRefer.orgNames }}</span></p>
                        <div class="mp3Div">
                            <aplayer v-if="itemRefer.val!=null&&itemRefer.val!=''&&itemRefer.val!=undefined" :autoplay="null" :music="{
                                title: '数据来源自',
                                author: '绿芽',
                                url: itemRefer.val,
                                pic: '',
                                lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                            }">
                            </aplayer>
                        </div>
                    </div>
                    <p style="color:#706f6f;" v-if="item.listCiteData.length<=0">--</p>
                </div>
            </div>
            <!-- <div class="taskdetails_ts">
                <span>图片上传 :</span>
                <div class="picture_div">
                    <div class="img_div">
                        <img src="../../assets/img/jinxingzhong.png" alt="">
                    </div>
                </div>
            </div> -->
        </div>

        <div class="prop_history" v-show="show">
            <div class="ts_prop" @click="tsPropshow"></div>
            <div class="prop_history_content">
                <div @click="propShow2">任务周期</div>
                <div @click="propShowtime">数据提交历史</div>
            </div>
        </div>

        <!---->
        <div class="viedoPropParent" v-show="upDataShow">
            <div class="viedoProp">
                <p class="videoP1">
                    <img @click="upDataShow=false" src="@/assets/img/videoX.png" alt="">
                    <img @click="upDataVideo(propId,propsta)" src="@/assets/img/videoRrefresh.png" alt="">
                </p>
                <p class="videoP2">请使用电脑访问此链接上传文件</p>
                <p class="videoP3">（上传成功前，请勿关闭此页面，一小时内有效）</p>
                <p class="videoP4">{{ upDataUrl }}</p>
                <div class="videoP5" v-if="btnGc">上传成功后，点击获取文件（<span>{{ si }}</span>S）</div>
                <div class="videoP5" v-if="!btnGc" @click="obtainVideo">点击获取文件</div>

                <div v-show="inlineDescList.length>0">
                    <checklist title="最近上传文件" :max="1" :options="inlineDescList" v-model="inlineDescListValue" @on-change="changeFile"></checklist>
                </div>
                <div v-show="inlineDescList.length<=0">
                    最近无新上传文件
                </div>
            </div>
        </div>
        <div class="videoParent" @click.prevent.stop="videoPropShow=false" v-if="videoPropShow">
            <video-player class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
            ></video-player>
        </div>





        <showcycle v-if="show2" v-bind:conData="taskCycles" v-bind:indexCycle="indexCycle" @closeSelect="closeSelect" @selectCycle="selectCycle" v-bind:jointimetype="jointimetype" v-bind:cycle="cycle" v-bind:formZt="formZt"></showcycle>
        <showhistime v-if="showtime" v-bind:stime="strTime" v-bind:etime="endTime" v-bind:uid="uid" v-bind:id="id" @closeSelect1="closeSelect1" v-bind:indexCycle1="indexCycle1" @selectCycle1="selectCycle1" v-bind:formZt="formZt"></showhistime>
        <select2 v-bind:uid="uid" v-bind:orgId="orgId" v-bind:type="type" v-bind:sreach_tea="sreach_tea" v-bind:sreach_stu="sreach_stu" @qd="qd" @qx="qx" v-if="tsshow" v-bind:xr="xr"></select2>

        <showorg v-if="show9" @muSelect = "muSelect" v-bind:conJs="conJs" v-bind:conJsSelect="conJsSelect" @selQd="selQd"></showorg>


    </div>

</template>

<script>
import qs from 'qs';
import Cookies from 'js-cookie';
import {formatDate} from '../../plugins/formatDate.js';
import { Group, Cell, XTextarea, Datetime,Checklist  } from "vux";
import VDistpicker from 'v-distpicker'
import showcycle from '@/page/stu/SelectionPeriod'
import showhistime from '@/page/stu/SubmissionTime'
import select2 from '@/components/stu/select'
import {wechatconfigInit,wechatopenimg} from '@/plugins/wechat.js';
import uploadImg  from '@/components/uploadImg'
import { mapState } from 'vuex'
import showorg from '@/components/stu/selecttag'

import VideoPlayerCommen from "@/components/common/video-player-common.vue"


import aplayer from "vue-aplayer";






export default {
    components:{
        Group,
        Cell,
        Checklist,
        XTextarea,
        Datetime,
        VDistpicker,
        showcycle,
        select2,
        uploadImg,
        showhistime,
        showorg,
        aplayer: aplayer,
        VideoPlayerCommen
    },
    data(){
        return{
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "",
                src: '' //url地址
                }],
                // poster: "../../static/images/test.jpg", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
                }
            },

            inlineDescList: [],
            inlineDescListValue: [],
            uid:this.$route.params.uid,
            id:this.$route.params.id,
            strTime:this.$route.params.strtime,
            endTime:this.$route.params.endtime,
            back:this.$route.params.back,
            task:[],
            itmes:[],
            valList:[],
            dx:[],
            bhBz:'',
            zt:null,
            formZt:null,
            selId:'',
            conJs:[],
            conJsSelect:[],



            taskCycles:[],
            indexCycle:0,
            indexCycle1:0,
            tsshow:false,
            show:false,
            show2:false,
            show3:true,
            isshow1:true,
            isshow2:false,
            show9:false,

            dataModel: [],
            // selectZd:[],


            data:[],
            xr:'',
            orgId:'',
            sreach_stu:'',
            sreach_tea:'',
            type:null,
            count:9,
            geographic:'',
            showtime:false,
            jointimetype:'',
            cycle:'',

            // 验证码
            obtainText:'获取验证码',
            obtainVal:'',

            //音视频上传URL
            upDataUrl:'',
            upDataShow:false,
            si:0,
            btnGc:true,
            authorizationCode:'',
            shoqq:true,
            videoPropShow:false,
            propId:null,
            propsta:'',
        }
    },
    computed: mapState({
      _url_: state => state._url_

    }),
    computed: {
        noback:function(){
            return this.back == 1 ? true : false;
        }
    },
    created(){

        wechatconfigInit(this,qs,this.uid,this._url_);
        if(this.strTime=='1970-01-01 08:00:00'||this.strTime==null){
            this.strTime=null
            this.endTime=null
        }
        this.loadData()
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return  formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    methods:{
        //查看类型表单 查看视频
        ckSee(value){
            console.log(value)
            this.videoPropShow=true;
            this.playerOptions.sources[0].src=value
        },
        //获取视频地址
        obtainVideo(){
            var _self = this;

            this.$axios.get( process.env.API_ROOT+"oss/2/get/code/"+_self.authorizationCode,
                qs.stringify({
                })
            ).then(function(res){
                if(res.isSuccess){
                    console.log(res,'获取视频')
                    if(res.data.path!='ok'){
                        _self.playerOptions.sources[0].src=res.data.path
                        _self.itmes.forEach(function(el){
                            if(el.id==_self.propId){
                                el.val=res.data.path;
                            }
                        })
                        _self.upDataShow=false;
                    }else{
                        _self.$vux.toast.show({type: 'warn',text:'暂无文件' });
                    }
                }
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        //倒计时
        countdown() {
            var _self = this;
            _self.si=2;
            _self.btnGc=true;
            var time = window.setInterval(function () {
                if (_self.si === 0) {
                    _self.si = 0;
                    _self.btnGc=false;
                    window.clearInterval(time)
                } else {
                    _self.si -= 1;
                }
            }, 1000)
        },
        //上传视频弹窗
        upDataVideo(id,cad){
            var _self = this;
            _self.upDataShow=true;
            _self.propId=id;
            _self.propsta=cad;
            if(_self.si==0){
                this.$axios.get( process.env.API_ROOT+"oss/2/"+cad+"/get/code",
                    qs.stringify({
                    })
                ).then(function(res){
                    if(res.isSuccess){
                        console.log(res,'验证码');
                        _self.authorizationCode=res.data.code
                        _self.upDataUrl='http://'+window.location.host+'/t/#/views/tea/upVideo/'+_self.propsta+'/'+_self.authorizationCode
                        _self.countdown();

                        _self.inlineDescList = [];

                        res.data.list.forEach(v=>{
                           var obj = {};
                            obj.key = v.url;
                            obj.value = v.url;
                            obj.inlineDesc = "上传于:"+v.time;
                            _self.inlineDescList.push(obj);
                        });
                    }else{
                        _self.$vux.toast.show({type: 'warn',text:res.errorDesc });
                    }
                }).catch(function(err){
                    _self.errorUtil(err);
                })
            }
        },
        removeStr(val,leng){
            if(val){
                return val.substring(0, val.length - leng);
            }else{
                return val
            }
        },
        changeFile (val, label) {
            if(val!=""&&val!=undefined) {

                var _self = this;
                _self.playerOptions.sources[0].src =val[0];
                _self.itmes.forEach(function (el) {
                    if (el.id == _self.propId) {
                        el.val = val[0];
                    }
                })
                _self.upDataShow = false;
            }
        },
        qx(){
          this.tsshow = false;
          this.show3 = true;
        },
        qd(obj){
            var _self = this
            this.itmes.forEach(function(it){
                if(it.id==_self.xr){
                    console.log(it.id)
                    var con =[];
                    var va =[];
                    obj.forEach(function (a) {
                        con.push(a.name)
                        va.push(a.id)
                    })
                    it.valex=con
                    it.val=va.join(',')
                }
            })
          this.tsshow = false;
          this.show3 = true;
        },
        goback(){
            this.$router.go(-1);
        },
        selQd(obj){
            var _self = this;
            var ct = obj;
            this.itmes.forEach(function(el){
                if(el.id==_self.selId){
                    el.val=[];
                    ct.forEach(function(el1){
                        el.formSelectItems.forEach(function(el2){
                            if(el1==el2.id){
                                el.val.push(el2.val)
                            }
                        })
                    })
                }
            })
            this.show9 = false;
            this.show3 = true;
        },
        muSelect(){
            this.show9=false;
            this.show3=true
        },
        muBtn(id,val){
            var _self = this;
            this.selId=id;
            this.conJsSelect=val
            this.show9=true;
            this.show3=false
            this.itmes.forEach(function(el){
                if(el.id==id){
                    _self.conJs=el.formSelectItems
                }
            })
        },
        propShow(){
            this.show=true
        },
        tsPropshow(){
            this.show=false
        },
        propShow2(){
            this.show=false
            this.show2=true
            this.show3=false
            this.showtime=false
        },
        propShowtime(){
            this.show=false
            this.show2=false
            this.show3=false
            this.showtime=true
        },
        closeSelect(){
            this.show3 =true;
            this.show2=false;
        },
        closeSelect1(){
            this.show3 =true;
            this.showtime=false;
        },
        selectCycle(v){
            var _self = this;
            var strtime = _self.taskCycles[v].stime
            var endtime = _self.taskCycles[v].etime
            _self.indexCycle=v
            console.log(strtime)
            console.log(endtime)
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/taskview",
                qs.stringify({
                    uid:_self.uid,
                    taskid:_self.id,
                    stime:strtime,
                    etime:endtime,
                    formid:'',
                })
            ).then(function(res){
                _self.show3 =true;
                _self.show2=false
                _self.task = res.data.task;
                _self.itmes = res.data.itmes;
                _self.zt = res.data.task.status;
                _self.bhBz = res.data.approvalbz;
                _self.taskCycles = res.data.taskCycle.reverse();
                _self.formZt = res.data.zt;
                _self.jointimetype=res.data.task.jointimetype;
                _self.cycle=res.data.task.cycle;

                console.log( res)
                if(_self.zt==1||_self.zt==3){
                    _self.isshow1=true
                    _self.isshow2=false
                    if(res.data.isadd!=undefined&&res.data.isadd==false){
                        _self.isshow1=false
                        _self.isshow2=true
                    }
                }else{
                    _self.isshow1=false
                    _self.isshow2=true
                }

            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        selectCycle1(id,v){
            var _self = this;
            _self.indexCycle1=v
            this.$axios.post( process.env.API_ROOT+"app/stu/v1/taskview",
                qs.stringify({
                    uid:_self.uid,
                    taskid:_self.id,
                    stime:'',
                    etime:'',
                    formid:id,
                })
            ).then(function(res){
                _self.show3 =true;
                _self.showtime=false
                _self.task = res.data.task;
                _self.itmes = res.data.itmes;
                _self.zt = res.data.task.status;
                _self.formZt = res.data.zt;
                _self.bhBz = res.data.approvalbz;

                console.log( res)
                if(_self.zt==1||_self.zt==3){
                    _self.isshow1=true
                    _self.isshow2=false
                    if(res.data.isadd!=undefined&&res.data.isadd==false){
                        _self.isshow1=false
                        _self.isshow2=true
                    }
                }else{
                    _self.isshow1=false
                    _self.isshow2=true
                }
            }).catch(function(err){
                _self.errorUtil(err);
            })
        },
        // 删除选人
        delXr(item,con){
            console.log(item)
            console.log(con)
            item.forEach(function(el,index){
                if(el==con){
                    item.splice(index,1);
                }
            })
        },
        selectionPlugin(id,type){
            this.xr=id
            if(type==1){
                this.type=3
            }else if(type==2){
                this.type=1
            }else if(type==3){
                this.type=2
            }
            console.log(this.xr)
            this.tsshow=!this.tsshow
            this.show=false
            this.show2=false
            this.show3=false
            this.showtime=false
        },
        uploadVideo(id,e,type) {
            //e.target.value文件名

            try {


                this.propId = id;
                var file = e.target.files[0];
                var formdata = new FormData();
                formdata.append('file', file);
                this.ossconfig(id, formdata, type);
            }catch (e) {
                this.$vux.loading.hide();
                this.$vux.toast.show({type: 'warn',text:'当前设备不支持,请在电脑端上传' });
            }
        },
        ossconfig(id,formdata,type) {
            var _self = this;
            //process.env.API_ROOT + 'oss/2/get/config'
            this.$axios.get(process.env.API_ROOT + 'oss/2/get/config').then(res => {
                if (res.isSuccess) {
                    formdata.append('authorization', res.data.authorization);
                    formdata.append('bucket', res.data.bucket);
                    formdata.append('x-date', res.data.date);
                    formdata.append('expiration', res.data.expiration);
                    formdata.append('policy', res.data.policy);
                    formdata.append('save-key', res.data.save_key);

                    _self.doUpload(id, formdata, type,res.data.domain,res.data.url);

                }
            });
        },
        doUpload(id,formdata,type,domain,url) {
            this.$vux.loading.show({
                text: '上传中...'
            })
            var _self = this;
            this.$axios.post(url, formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then(res => {
                _self.$vux.loading.hide();
                console.log(res);
                if(res.code=='200'){

                    if(type=="mp4"){//视频
                        _self.playerOptions.sources[0].src=domain+res.url
                    }

                    _self.itmes.forEach(function(el){
                        if(el.id==id){
                            el.val=domain+res.url;
                        }
                    })
                    _self.upDataShow=false;

                }else{
                    _self.$vux.toast.show({type: 'warn',text:'暂无文件' });
                }

            }).catch(err => {
                console.log(err);
            })
        },
        loadData(){
          var _self = this;
          console.log(_self.strTime)
          console.log(_self.endTime)
          var stt = {};
          stt.uid=_self.uid;
          stt.taskid = _self.id;
          if(_self.strTime==null){
              stt.stime=''
              stt.etime=''
          }else{
              stt.stime=_self.strTime
              stt.etime=_self.endTime
          }
          if(_self.formid==0){
            stt.formid = ''
          }else{
            stt.formid = _self.formid
          }
          this.$axios.post( process.env.API_ROOT+"app/stu/v1/taskview",
            qs.stringify(stt)
          ).then(function(res){
            _self.task = res.data.task;
            _self.itmes = res.data.itmes;
            _self.zt = res.data.task.status;
            _self.taskCycles = res.data.taskCycle.reverse();
            _self.formZt = res.data.zt;
            _self.bhBz = res.data.approvalbz;
            _self.jointimetype=res.data.task.jointimetype;
            _self.cycle=res.data.task.cycle;
            _self.itmes.forEach(function (el,index) {
                if((el.type==4||el.type==8||el.type==16)&&(el.val==null||el.val=='')){
                   el.val = el.bz;
                }
                if(el.type==10){
                    if(_self.formZt=='N'){
                        el.valex =el.valex.split(",")
                    }
                }
                if(el.type==5||el.type==17||el.type==25){
                    if(el.val==null||el.val==''){
                        if(el.bz!=''&&el.bz!=null){
                            el.val = el.bz.split(',');
                        }else{
                            el.val=[]
                        }
                    }else{
                        el.val=el.val.split(',')
                    }
                }
                if(el.type==9){
                    _self.getMap()
                }
            })
            if(_self.zt==1||_self.zt==3){
                _self.isshow1=true
                _self.isshow2=false
                if(res.data.isadd!=undefined&&res.data.isadd==false){
                    _self.isshow1=false
                    _self.isshow2=true
                }
            }else{
                _self.isshow1=false
                _self.isshow2=true
            }

            _self.$previewRefresh()

            console.log(res,'看新返回值')
          }).catch(function(err){
            _self.errorUtil(err);
          })
        },
        onSelected(event,id){
            console.log(event)
            console.log(id)
            this.itmes.forEach(function (el) {
                if(el.id==id){
                    el.val[0]=event.province.value
                    el.val[1]=event.city.value
                    el.val[2]=event.area.value
                }
            })
        },
        // 整数
        number(val,id){
            val=val.replace(/[^\d]/g,'')
            var rs =''
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、+？-]")
            for (var i = 0; i < val.length; i++) {
                rs = rs+val.substr(i, 1).replace(pattern, '');
            }
            this.itmes.forEach(function(el){
                if(el.id==id){
                    el.val=rs
                }
            })
            console.log(val)
        },
        // 获取验证码
        obtain(element,number){
            var _self = this;
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(number)) {
                _self.$vux.toast.show({type: 'warn',text:'请输入正确的手机号码' });
            }else{
                this.$axios.post( process.env.API_ROOT+"app/stu/v1/sendCode",
                    qs.stringify({
                        uid:_self.uid,
                        phone:number
                    })
                ).then(function(res){
                    var num = 60
                    var timer = setInterval(function () {
                        num--
                        _self.obtainText = num + 's后再次获取'
                        element.target.disabled = 'disabled'
                        if (num === 0) {
                            element.target.disabled = ''
                            _self.obtainText = '获取验证码'
                            clearInterval(timer)
                        }
                    }, 1000)
                    console.log(res,'验证码')
                }).catch(function(err){
                    _self.errorUtil(err);
                })

            }
        },
        add(){
            var _self = this;
            var age='';
            var obj = {};
            var zm = true;
            obj.uid=_self.uid;
            obj.taskid = _self.id;
            _self.itmes.forEach(function (el) {
                var vKey = el.dbItemName;
                if(el.type==22){
                    if(el.val==null||el.val==''){
                        obj[vKey] = null
                    }else if(el.val.length<=10){
                        obj[vKey] = el.val+' 00:00:00';
                    }else if(el.val.length>10){
                        obj[vKey] = el.val
                    }
                }else if(el.type==3){
                    if(el.val==null||el.val==''){
                        obj[vKey] = null
                    }else if(el.val.length<=16){
                        obj[vKey] = el.val+':00';
                    }else if(el.val.length>16){
                        obj[vKey] = el.val
                    }
                }else if(el.type==5||el.type==17||el.type==25){
                    obj[vKey] = el.val.join(',')

                }else if(el.type==9){
                    obj[vKey] = _self.geographic

                }
                else{
                    obj[vKey] = el.val;
                }

                if(el.notnull=='Y'&&(el.val==''||el.val==null)){
                    zm=false
                    age='请将信息填写完整'
                }
                if(el.type==15){
                    if(el.notnull!='Y'&&el.val!=''&&el.val!=null){
                        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                        if (!myreg.test(el.val)) {
                            zm=false
                            age='请输入正确的手机号码'
                        }
                        if(el.othertype==1&&(_self.obtainVal==''||_self.obtainVal==null|_self.obtainVal==undefined)){
                            zm=false
                            age='请输入验证码'
                        }
                        if(el.othertype==1){
                            var code = vKey+'_code'
                            obj[code] = _self.obtainVal;
                        }
                    }
                    if(el.notnull=='Y'){
                        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                        if (!myreg.test(el.val)) {
                            zm=false
                            age='请输入正确的手机号码'
                        }
                        if(el.othertype==1&&(_self.obtainVal==''||_self.obtainVal==null|_self.obtainVal==undefined)){
                            zm=false
                            age='请输入验证码'
                        }
                        if(el.othertype==1){
                            var code = vKey+'_code'
                            obj[code] = _self.obtainVal;
                        }
                    }
                }
                if(el.type==14){
                    if(el.notnull!='Y'&&el.val!=''&&el.val!=null){
                        var myreg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                        if (!myreg.test(el.val)) {
                            zm=false
                            age='请输入正确的电子邮箱'
                        }
                    }
                    if(el.notnull=='Y'){
                        var myreg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                        if (!myreg.test(el.val)) {
                            zm=false
                            age='请输入正确的电子邮箱'
                        }
                    }

                }
                if(el.type==27){
                    if(el.notnull!='Y'&&el.val!=''&&el.val!=null){
                        var myreg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
                        if (!myreg.test(el.val)) {
                            zm=false
                            age='请输入正确的身份证号码'
                        }
                    }
                    if(el.notnull=='Y'){
                        var myreg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
                        if (!myreg.test(el.val)) {
                            zm=false
                            age='请输入正确的身份证号码'
                        }
                    }
                }
                if(el.type==26){
                    if(el.notnull!='Y'&&el.val!=''&&el.val!=null){
                        var myreg=/^[1-9]\d{5}$/;
                        if (!myreg.test(el.val)) {
                            zm=false
                            age='请输入正确的邮政编码'
                        }
                    }
                    if(el.notnull=='Y'){
                        var myreg=/^[1-9]\d{5}$/;
                        if (!myreg.test(el.val)) {
                            zm=false
                            age='请输入正确的邮政编码'
                        }
                    }
                }
            })
            console.log(obj)
            console.log(zm)
            if(zm){
                this.$axios.post( process.env.API_ROOT+"app/stu/v1/addtask",
                    qs.stringify(obj)
                ).then(function(res){
                    console.log(res)
                    if(res.data.id&&res.data.id!=''&&res.data.id!=null&&res.data.id!=undefined){
                        _self.id=res.data.id
                        _self.strTime=res.data.stime
                        _self.endTime=res.data.etime
                        _self.$vux.toast.show({
                            type:'success',
                            time:2000,
                            text: '提交成功,请填写下一个任务~',
                            onShow () {

                            },
                            onHide () {
                                wechatconfigInit(_self,qs,_self.uid,_self._url_);
                                if(_self.strTime=='1970-01-01 08:00:00'||_self.strTime==null){
                                    _self.strTime=null
                                    _self.endTime=null
                                }
                            }
                        })
                        _self.loadData()
                    }else{
                        _self.$vux.toast.show({type: 'success',text:"成功" });
                        _self.goback();
                    }
                }).catch(function(err){
                    console.log(err)
                    _self.errorUtil(err);
                })
            }else{
                _self.$vux.toast.show({type: 'warn',text:age });
            }

        },
        getMap() {
            var  self_ = this;
            this.$wechat.ready(function(){
                self_.$wechat.getLocation({
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
                        self_.addressDetail(latitude,longitude);

                    },
                    cancel: function (res) {
                        alert('用户拒绝授权获取地理位置');
                    }
                });
            });
        },
        addressDetail(lat,lng){
            var self=this;
            var geolocation = new BMap.Geolocation();
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(new BMap.Point(lng,lat),function (result) {
                if(result){
                    self.geographic=result.address
                }
            })
        }
    }
}
</script>

<style>
    textarea:disabled{background-color:#fff;}
    .texCon{padding:20px 30px;font-size:28px;overflow: hidden;}
    .texCon .weui-textarea{font-size: 30px!important;color:#444;}
    .texCon .weui-cells__title{float:left;width: 100%;text-align: left;color:#444;padding:10px 0;margin:0;font-size:28px;}
    .texCon .weui-cells{float:left;width:99%;border:1px solid #e2e2e2;/*no*/border-radius:5px;/*no*/padding-left:1%;}
    .texCon .weui-cells:after,.texCon .weui-cells:before,.weui-cell:before{content:none!important;}

    .datetimeCon{padding:10px 30px 0;font-size:28px;overflow: hidden;}
    .datetimeCon > .weui-cells{margin-top: 0;}
    .datetimeCon .weui-cell div{float:left;width: 100%;text-align: left;color:#444;padding:0;font-size:28px;flex: none;padding:10px 0!important;}
    .datetimeCon .weui-cell {display: block;overflow: hidden;padding:0!important;}
    .datetimeCon .weui-cells:after,.datetimeCon .weui-cells:before{content:none;}
    .datetimeCon .weui-cell .weui-cell__ft{text-align: left;padding-left: 30px;}

    .dp-header .dp-right,.dp-header .dp-left{font-size:36px!important;}
    .dp-content .dp-item .scroller-component .scroller-item{font-size:30px!important;}

    .distpicker-address-wrapper > select{width:100%;height:65px;line-height:65px;border:1px solid #e2e2e2;/*no*/border-radius:5px;/*no*/padding:0 0 0 10px;outline:none;font-size: 28px;color: #444;margin-bottom: 20px;-webkit-appearance: none;background: url("../../assets/img/select_down.png") no-repeat right 10px center transparent;}
</style>

<style scoped lang="less">

    .top-back {text-align: center;font-size: 36px;color: #444;position: fixed;left:0;right:0;padding:20px;background-color: #fff;z-index: 100;top: 0;}
    .top-back .img-1{position: absolute;width: 38px;height: 38px;left: 20px;top: 25px}
    .top-back .img-2{position: absolute;left: 80px;top: 15px}
    .top-back .img-2 i{color: #01c269;font-size: 40px;}
    .top-back button {width: 100px;height: 50px;font-size: 36px;color: #01c269;border: none;background-color: #fff;right: 20px;top:20px;position: absolute;outline: none;font-weight: 400}
    .top-back .noBtn{color:#c4c5c6;}
    .n_title{width:55%;margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}


    .taskdetails_content{padding-bottom:20px;margin-top:100px;}
    .taskdetails_child {padding:10px 30px 0;font-size:28px;color:#444;overflow: hidden;}
    .taskdetails_child > span{float:left;width: 100%;text-align: left;padding:10px 0;font-size:28px;}
    .taskdetails_child > input{float:left;width:97%;height:65px;line-height:65px;border:1px solid #e2e2e2;/*no*/border-radius:5px;/*no*/padding-left:3%;outline:none;font-size:28px;}
    .taskdetails_child > .bfb{width:92%;}
    .bfStrong{font-weight:400;float: left;width:4%;height:65px;line-height:65px;text-align:right;}
    .taskdetails_child > div{float: left;width:100%;}
    .taskdetails_child > div input[type='text']{width:95%;height:65px;line-height:65px;margin-bottom:20px;border:1px solid #c4c5c6;/*no*/border-radius:5px;/*no*/padding-left:5%;outline:none;font-size:28px;}
    .pic_p{padding:20px 30px 0;font-size:28px;color:#444;overflow: hidden;}

    .taskdetails_ts{padding:10px 20px 0;font-size:28px;color:#444;overflow: hidden;}
    .taskdetails_ts > span {float:left;width: 100%;text-align: left;padding:10px 0;font-size:28px;}
    .taskdetails_ts select{float:left;width:100%;height:67px;line-height:67px;border:1px solid #e2e2e2;/*no*/border-radius:5px;/*no*/padding-left:3%;outline:none;font-size:28px;}
    .checkbox_div{float: left;width:100%;padding-bottom:10px;color:#706f6f;}
    .checkbox_div label{margin-right: 20px;display: block;min-width:90%;}
    .checkBox {width: 25px;height: 25px;background-color: #fff;-webkit-appearance:none;border: 1px solid #c9c9c9;/*no*/border-radius: 3px;/*no*/outline: none;padding: 2px;margin-bottom: -3px;float: left;margin:9px 5px 0 0;}
    .checkBox:checked{background: url("../../assets/img/duigou.png")no-repeat center;background-size: cover;border: 1px solid #04BE02;/*no*/background-position: top left;}
    .radio {width: 25px;height: 25px;background-color: #fff;-webkit-appearance:none;background: url("../../assets/img/radio.png")no-repeat center;background-size: cover;background-position: top left;float: left;margin:9px 5px 0 0;}
    .radio:checked{background: url("../../assets/img/radio_check.png")no-repeat center;background-size: cover;background-position: top left;}
    input[type=radio]{outline:none;}
    .border-par{border: 1px solid #e2e2e2;/*no*/border-radius:3px;/*no*/}
    .add_input_parent{padding:10px 20px;border-bottom:1px solid #e2e2e2;/*no*/}
    .border-par .add_input_parent:last-child{border-bottom:none;}


    .picture_div{margin: 20px 0;overflow: hidden;width:100%;}
    .img_div,.add_div{width:215px;height:215px;position: relative;margin:0 15px 15px 0;float: left;}
    .img_div i{position: absolute;right:0;top:-8px;width:32px;height:32px;}
    .img_div img,.add_div img{width:100%;height:100%;}


    .completed_div{margin-top:100px;}

    .prop_history{position: fixed;background: rgba(0,0,0,0.5);top: 0;left: 0;right: 0;bottom: 0;z-index: 100000;}
    .prop_history_content{width: 60%;background: #fff;position: fixed;margin: 0 auto;top: 30%;left: 0px;right: 0px;box-shadow: 0 0 5px #ccc;/*no*/border-radius: 3px;/*no*/}
    .prop_history_content > div{text-align: center;font-size: 28px;color:#444;padding: 40px 0;margin: 0 20px;}
    .prop_history_content > div:first-child{border-bottom:1px solid #f4f3f3;/*no*/}
    .ts_prop{width:100%;height:100%;}


    .select_peo{float:left;width:95%!important;min-height:65px;line-height:65px;border:1px solid #e2e2e2;/*no*/border-radius:5px;/*no*/padding:0 2.5%;overflow: hidden;}
    .select_peo strong{font-weight:400;float:left;margin: 5px 10px;border:1px solid #e2e2e2;/*no*/padding:0 5px;/*no*/border-radius:5px;/*no*/position:relative;}
    .select_peo img{position: absolute;top: 0;right: 0;width: 22px;height: 22px;}

    /* 新增电话样式 */
    .phone_div > .sr_input{width:60%;}
    .phone_div > .js_input{margin-top:20px;}

    .phone_div .dick_yz{float: left;width:35%;font-size:28px;height:65px;line-height:65px;text-align:center;color:#01c267;cursor: pointer;border:1px solid #fff;background:#fff;outline:none;}

    input[type="text"],input[type="button"],input[type="tel"],input[type="number"], input[type="submit"], input[type="reset"],select {
    -webkit-appearance: none;}
    textarea {-webkit-appearance: none;} 
    select {background: url("../../assets/img/select_down.png") no-repeat right 10px center transparent;}

    /* 视频 */
    .addVideo{width:215px!important;height:215px;}
    .addVideo img{width:215px;height:215px;}
    .viedoPropParent{position: fixed;background: rgba(0,0,0,0.5);top: 0;left: 0;right: 0;bottom: 0;z-index: 999;}
    .viedoProp{width: 85%;padding:10px 10px 30px;background: #fff;position: fixed;margin: 0 auto;top: 30%;left: 0px;right: 0px;box-shadow: 0 0 5px #ccc;/*no*/border-radius: 3px;/*no*/}
    .viedoProp > p,.viedoProp > div{text-align:center;font-size:26px;margin-bottom:10px;}
    .videoP1 {overflow: hidden;}
    .videoP1 img:first-child{width:22px;float: left;}
    .videoP1 img:last-child{width:28px;float: right;}
    .videoP2 {color:#696969;}
    .videoP3 {color:#bcbbbb;}
    .viedoProp .videoP4 {color:#16c775;word-wrap:break-word;word-break:break-all;}
    .videoP5 {color:#ffffff;background:#56ca99;width:85%;margin:0 auto;padding:15px 0;border-radius:3px;/*no*/}

    .videoParent{position: fixed;top:0;bottom:0;left:0;right:0;width:100%;height:100%;background:#999;z-index: 100000000;}
    /* .videoParent > div video{width:100%;max-width:100%;} */
    .seeVideo {position:relative;width:215px!important;height:215px;}
    .seeVideo .seeImg {width:215px;height:215px;}
    .seeVideo .removeSmlieImg {position: absolute;right:0;top:0;width: 22px;height: 22px;}
    .hs_div{margin-top:20px;color:#706f6f;}
    .video-player.video-player.vjs-custom-skin{margin-top:50%;}

    /* 音频 */
    .addMp3 {height:auto;}
    .addMp3 strong{color:#01c269;font-weight:400;}
    .addMp3Img{width:30px;margin-right:10px;vertical-align: middle;margin-top:-10px;}
    .mp3Div{position: relative;}
    .mp3Div .removeSmlieImg{position: absolute;right:10px;top:10px;width: 28px;height: 28px;z-index: 10;}
    .mp3Div .aplayer{margin-left:0;}


    /* 数据引用 */
    .referenceDiv{padding:10px 20px 0;overflow: hidden;}
    .referenceDiv > span{float:left;width: 100%;text-align: left;font-size:28px;}
    .referChildDiv{float: left;width:100%;}
    .referChildDiv p:first-child{margin-top:10px;}
    .referChildDiv p{font-size:26px;color:#706f6f;}
    .referenceDivZs {padding:10px 1px;}
    .referChildDiv .seeVideo{margin-top:10px;}


    .weui-uploader__input{
       position:absolute;
        z-index:1;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity:0;
        -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    }

    .weui-uploader__input-box{
        float:left;
        position:relative;
        /*margin-right:9px;*/
        /*margin-bottom:9px;*/
        /*width:77px;*/
        /*height:77px;*/
        background-color:transparent;
        border:none;
    }
    .weui-uploader__input-box:after{content:none!important;}
    .weui-uploader__input-box:before{content:none!important;}
    .mgTopCss{position:absolute;bottom:20px;right:20px;width:auto!important;z-index: 2;}

</style>
