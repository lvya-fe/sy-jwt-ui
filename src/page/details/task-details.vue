<template>
  <div class="task-details" :class="{'hasbgColor': hasbgColor}">
    <div class="top-back">
      <img class="img-1" src="../../assets/img/back_left_green.png" alt="" @click="goback">
      <div class="n_title">{{ title }}</div>
      <span class="img-2" style="display:none;">
                <i class="icon iconfont icon-shiyongcishu ripple"></i>
            </span>
    </div>
    <div class="empty-top"></div>
    <form action="" class="stuInfo" v-show="formShow">
      <ul>
        <!-- 1单行输出   2 多行输入  3 日期时间  4 单项选择 5 多项选择  6 图片上传  8  描述文本 9 地理位置  10 选人插件,
        14 邮箱 15 电话 16选择列表 17 多选列表  19 整数 20 小数
            21 百分数 22 日期  25 省市区  26 邮编  27 身份证 28 音频 29 视频 -->
        <li class="fields-item" v-for="(item,index) in curFieldsLists" :key="item.order">
          <!-- 单行 -->
          <div class="fieldsWrap  input-line-custom" v-if="item.formItemType == '1'">
            <template v-if="[1,3].includes(formState) && item.citeDataType ==0  ">
              <div>
                <span class="fieldInput fieldname" >{{item.formItemName}}</span>
                <input type="text" class="txtInput" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" v-model="item.formItemValue"  @input="item.formItemValue=item.formItemValue.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')" placeholder="请输入">
              </div>
            </template>
            <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
          </div>
          <!-- 多行 -->
          <div class="fieldsWrap txtarea hookTxtarea" v-if="item.formItemType == '2'">
            <template v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
              <div>
                  <p v-if=" [1,3].includes(formState) && item.citeDataType ==0 " :class="{'vux-1px-b': ([1,3].includes(formState) && item.citeDataType ==0)}"><span>{{item.formItemName}}</span></p>
                  <x-textarea v-if=" [1,3].includes(formState) && item.citeDataType ==0 " v-model="item.formItemValue"  placeholder="请输入" :show-counter="false"></x-textarea>
              </div>
            </template>
            <!-- <div v-else>
                <div v-if="item.formItemValue !=''" class="readOnly-block">
                    <x-textarea disabled v-model="item.formItemValue" :class="{'readAll':item.readAll}" :autosize="item.readAll" :show-counter="false"></x-textarea>
                    <span class="moreTxt" @click="readAll(index)" v-show="!item.showBtn">{{item.btntext}}</span>
                </div>
                <div v-else class="nodata">
                    <img src="../../assets/img/noData.png" alt="">
                </div>
            </div> -->
            <FormComsItem  v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
          </div>
          <!-- 日期时间 -->
          <template v-if="item.formItemType == '3'">
            <div>
              <group class="fieldsDatetime hasIco" v-if="[1,3].includes(formState) && item.citeDataType ==0 " :class="{'readonly': ![1,3].includes(formState) || item.citeDataType !=0}" >
                <img src="../../assets/img/ico_datetime.png" alt="">
                <datetime v-model="item.formItemValue" format="YYYY-MM-DD HH:mm" :readonly="[1,3].includes(formState) && item.citeDataType ==0 ? false :true"  @on-change="change" :title="item.formItemName"></datetime>
              </group>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 单项选择 -->
          <template v-if="item.formItemType == '4'">
            <div>
              <div class="fieldsWrap radios" v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <p class="vux-1px-b"><span>{{item.formItemName}}</span></p>
                <radioList :lists="item.formSelectItemResps" :disabled = '(![1,3].includes(formState) || item.citeDataType !=0) ? true :false' :checkVal="item.formItemValue" :index="index" @changeVal="changeRadio"></radioList>

              </div>
              <FormComsItem  v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 多项选择 -->
          <div class="fieldsWrap radios" v-if="item.formItemType == '5'">
            <p v-if="item.citeDataType ==0" class="vux-1px-b"><span>{{item.formItemName}}</span></p>
            <group v-if="item.formSelectItemResps.length >0 && item.citeDataType ==0 ">
              <checklist label-position="left" :options="item.formSelectItemResps" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" v-model="item.itemValArr" @on-change="checkListChange(item.itemValArr,index)"></checklist>
            </group>
            <FormComsItem  v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
          </div>
          <!-- 图片上传 -->
          <template v-if="item.formItemType == '6'">
            <div>
              <div class="fieldsWrap imgUpload" v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <p><img src="../../assets/img/ico_position.png" alt=""><span>{{item.formItemName}}</span></p>
                <uploadImg v-if="[1,3].includes(formState) && item.citeDataType ==0" :imgs.sync="item.formItemValue" v-bind:uid.sync="uid" v-bind:count.sync="count"></uploadImg>
                <div v-else>
                  <div v-if="item.formItemValue == ''" class="nodata">
                    <img src="../../assets/img/noData.png" alt="">
                  </div>
                  <ul v-else class="img-items">
                    <li v-for="(url,i) in item.itemValArr" :key="i">
                      <img :src="url" :preview="i" alt="">
                    </li>
                  </ul>
                </div>
              </div>
              <FormComsItem v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 文本描述 -->
          <div class="fieldsWrap wenben hookTxtarea" v-if="item.formItemType == '8'">
            <p><span>{{item.formItemName}}</span></p>
            <!-- <p class="txt" v-if="item.formItemValue != '' && item.formItemValue != null">{{item.formItemValue}}</p> -->
            <div v-if="item.formItemValue != ''" class="readOnly-block"  >
              <x-textarea disabled v-model="item.formItemValue" :class="{'readAll':item.readAll}" :autosize="item.readAll" :show-counter="false"></x-textarea>
              <span class="moreTxt" @click="readAll(index)" v-show="!item.showBtn">{{item.btntxt}}</span>
            </div>
            <div v-else class="nodata">
              <img src="../../assets/img/noData.png" alt="">
            </div>
          </div>
          <!-- 地理位置 -->
          <template v-if="item.formItemType == '9'">
            <div>
              <div class="fieldsWrap positionWrap hasIco " v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <img src="../../assets/img/ico_position.png" alt="">
                <span class="fieldname">{{item.formItemName}}</span>
                <p>{{geographic}}</p>
              </div>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 选人插件 -->
          <div class="choosePeople hasIco" v-if="item.formItemType == '10'">
            <p @click="selectionPlugin(item.formItemId,item.choiceType,index)">
              <img class="icon" src="../../assets/img/ico_people.png" alt="">
              <span class="fieldname">{{item.formItemName}}</span>
              <span v-if="[1,3].includes(formState) && item.citeDataType ==0" class="ico-right">请选择</span>
            </p>
            <ul class="itemsWrap" v-if="item.formSelectItemResps.length >0">
              <li v-for="val in item.formSelectItemResps" :key="val.id">{{val.value}}</li>
            </ul>
            <div v-if="![1,3].includes(formState) || item.citeDataType !=0">
              <div v-if="item.formSelectItemResps.length == 0" class="nodata">
                <img src="../../assets/img/noData.png" alt="">
              </div>
            </div>
          </div>
          <!-- 邮箱 -->
          <template v-if="item.formItemType == '14'">
            <div>
              <div class="fieldsWrap hasIco " v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <img class="icon" src="../../assets/img/ico_email.png" alt="">
                <span class="fieldname">{{item.formItemName}}</span><input type="text" @blur="verifyField(item.formItemValue,item.formItemType)" v-model="item.formItemValue" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" >
              </div>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 电话 -->
          <template v-if="item.formItemType == '15'">
            <div>
              <div class="fieldsWrap hasIco " v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <img class="icon" src="../../assets/img/ico_phone.png" alt="">
                <span class="fieldname">{{item.formItemName}}</span><input type="number" v-if="[1,3].includes(formState) && item.citeDataType ==0" v-model="item.formItemValue" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" oninput = "value=value.replace(/[^\d]/g,'')" @blur="verifyField(item.formItemValue,item.formItemType)" >
                <p class="readPhone" v-else>{{item.formItemValue.substring(0,3)}}  {{item.formItemValue.substring(3,7)}} {{item.formItemValue.substring(7)}}</p>
              </div>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 选择列表 -->
          <template v-if="item.formItemType == '16'">
            <div>
              <group class="fieldsWrap selectList" v-if="[1,3].includes(formState) && item.citeDataType ==0 " @click.native="showCheckList(item,index,formState,item.citeDataType)">
                <cell :title="item.formItemName" ></cell>
                <span v-if="[1,3].includes(formState) && item.citeDataType ==0" class="ico-right" :class="{'hasVal':item.formItemValue != ''}">{{item.formItemValue == '' || item.formItemValue == null ? '请选择' :item.formItemValue}}</span>
                <span v-else class="ico-right readOnly">{{item.formItemValue}}</span>
              </group>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 多选择列表 -->
          <template v-if="item.formItemType == '17'">
            <div>
              <group class="fieldsWrap selectList" v-if="[1,3].includes(formState) && item.citeDataType ==0 " @click.native="showCheckList(item,index,formState,item.citeDataType)">
                <cell :title="item.formItemName" ></cell>
                <span v-if="[1,3].includes(formState) && item.citeDataType ==0" class="ico-right" :class="{'hides': (item.formItemValue != '' && item.formItemValue != null) }">请选择</span>
                <span v-else class="ico-right readOnly"></span>
                <ul class="itemsWrap" v-if="item.itemValArr.length >0">
                  <!-- <li class="vux-1px" v-for="val in item.itemValArr" :key="val">{{val}}</li> -->
                  <li v-for="val in item.itemValArr" :key="val">{{val}}</li>
                </ul>
                <div v-if="![1,3].includes(formState) || item.citeDataType !=0">
                  <div v-if="item.formItemValue == ''" class="nodata">
                    <img src="../../assets/img/noData.png" alt="">
                  </div>
                </div>
              </group>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>
          <!-- 整数 -->
          <template v-if="item.formItemType == '19'">
            <div>
              <div class="fieldsWrap " v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <span class="fieldname">{{item.formItemName}}</span>
                <!-- <input type="number" v-model="item.formItemValue"   @input="testInput(item.formItemValue,index)" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' : ''"> -->
                <input type="tel" v-model="item.formItemValue"  oninput = "value=value.replace(/[^\d]/g,'')" maxlength="15" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' : ''">
              </div>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 小数 -->
          <template v-if="item.formItemType == '20'">
            <div>
              <div class="fieldsWrap " v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <span class="fieldname">{{item.formItemName}}</span>
                <input type="number" v-model="item.formItemValue" @input="maxLengthCheck(item.formItemValue,index)" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" onkeyup="value=value.match(/\d+\.?\d{0,2}/,'')" >
              </div>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 百分数 -->
          <template v-if="item.formItemType == '21'">
            <div>
              <div class="fieldsWrap " v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <span class="fieldname">{{item.formItemName}}</span>
                <input type="number" class="padr30" v-model="item.formItemValue" @input="maxLengthCheck(item.formItemValue,index)" :disabled="[1,3].includes(formState) && item.citeDataType == 0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入百分数(如：60.23)' : ''" onkeyup="value=value.match(/\d+\.?\d{0,2}/,'')" >
                <span class="percent">%</span>
              </div>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 日期 -->
          <template v-if="item.formItemType == '22'">
            <div>
              <group v-if="[1,3].includes(formState) && item.citeDataType ==0 " class="fieldsDatetime hasIco" :class="{'readonly': (![1,3].includes(formState) || item.citeDataType !=0)} ">
                <img src="../../assets/img/ico_date.png" alt="">
                <datetime v-model="item.formItemValue" :readonly="[1,3].includes(formState) && item.citeDataType ==0 ? false :true"  @on-change="change" :title="item.formItemName"></datetime>
              </group>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 省市区 -->
          <template v-if="item.formItemType == '25'">
            <div>
              <group  class="hasIco" v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <img class="ico_address" src="../../assets/img/ico_address.png" alt="">
                <x-address :title="item.formItemName" v-model="item.itemValArr" :raw-value='true' @on-hide="addressHide" @on-show="addressShow(index)" @on-shadow-change="changeAddress" :class="{'disabled': (![1,3].includes(formState) || item.citeDataType != 0)}" :disabled="[1,3].includes(formState) && item.citeDataType ==0 ? false :true" :list="addressData" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请选择' :''"></x-address>
              </group>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 邮编 -->
          <template v-if="item.formItemType == '26'">
            <div>
              <div class="fieldsWrap hasIco " v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <img class="ico_postcode icon" src="../../assets/img/ico_postcode.png" alt="">
                <span class="fieldname">{{item.formItemName}}</span><input type="number" :disabled="[1,3].includes(formState) && item.citeDataType == 0 ? false :true" v-model="item.formItemValue" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" oninput = "value=value.replace(/[^\d]/g,'')" @blur="verifyField(item.formItemValue,item.formItemType)">
              </div>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 身份证 -->
          <template v-if="item.formItemType == '27'">
            <div>
              <div class="fieldsWrap hasIco " v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <img class="ico_idcard icon" src="../../assets/img/ico_idcard.png" alt="">
                <span class="fieldname">{{item.formItemName}}</span>
                <input type="text" v-model="item.formItemValue" :disabled="[1,3].includes(formState) && item.citeDataType == 0 ? false :true" :placeholder="[1,3].includes(formState) && item.citeDataType ==0 && item.formItemValue == '' ? '请输入' :''" @blur="verifyField(item.formItemValue,item.formItemType)" >
              </div>
              <FormComsItem class="paddinglr30" v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 音频 -->
          <template v-if="item.formItemType == '28'">
            <div>
              <div class="fieldsWrap hasIco fieldAudio" v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <p class="vux-1px-b">
                  <img src="../../assets/img/ico_audio.png" alt="">
                  <span>{{item.formItemName}}</span>
                </p>
                <template v-if ="item.citeDataType == 0 && [1,3].includes(formState)">
                  <div class="addAudio"  v-if="item.formItemValue ==''">
                    <div class="addAudioInput">
                      添加音频
                      <!-- <input type="file" name="" :disabled="[1,3].includes(formState) ? false :true" @change="tirggerFile($event,index)" accept="audio/mpeg"> -->
                      <input type="file" name="" @change="uploadVideo(item.id,$event,'mp3',index)" accept="audio/mpeg">
                    </div>
                    <span @click="upDataVideo(item.id,'mp3',index)">大文件请点击</span>
                  </div>
                </template>
                <template v-if="(item.formItemValue !='')">
                  <div class="showAudio">
                    <img class="close" @click="item.formItemValue = ''" src="../../assets/img/shanchub.png" v-show="item.citeDataType == 0 && [1,3].includes(formState)">
                    <aplayer :autoplay="null" :music="{
                                            title: '数据来源自',
                                            author: '绿芽',
                                            url: item.formItemValue,
                                            pic: '',
                                            lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                                            }">
                    </aplayer>
                  </div>
                </template>
                <div v-if="(item.citeDataType != 0 || ![1,3].includes(formState)) && item.formItemValue ==''" class="videoNOdata">
                  <img src="../../assets/img/noData.png" alt="">
                </div>
              </div>
              <FormComsItem v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

          <!-- 视频 -->
          <template v-if="item.formItemType == '29'">
            <div>
              <div class="fieldsWrap hasIco" :class="{'hasUrl':(item.formItemValue !='' && item.formItemValue != null)}" v-if="[1,3].includes(formState) && item.citeDataType ==0 ">
                <img src="../../assets/img/ico_video.png" alt="">
                <span>{{item.formItemName}}</span>
                <template v-if ="item.citeDataType == 0 && [1,3].includes(formState)">
                  <div class="addVideo" v-if="item.formItemValue =='' ">
                    <div class="inputFile">
                      <input type="file" name="" @change="uploadVideo(item.id,$event,'mp4',index)" accept="video/*">
                    </div>
                    <span @click="upDataVideo(item.id,'mp4',index)">大文件请点击</span>
                  </div>
                  <template v-else>
                    <div class="showVideo">
                      <VideoPlayerCommon :options.sync="item" @deleteVideo="deleteVideo(index)" :showDelete="(item.citeDataType == 0 && [1,3].includes(formState))"></VideoPlayerCommon>
                      <!--<img src="../../assets/img/img_video.jpg" @click="playMP4(index)" alt="">-->
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div class="showVideo" v-if="(item.formItemValue !='')">
                    <VideoPlayerCommon :options="item" ></VideoPlayerCommon>
                    <!--<img src="../../assets/img/img_video.jpg" @click="playMP4(index)" alt="">-->
                  </div>
                  <div v-else class="videoNOdata">
                    <img src="../../assets/img/noData.png" alt="">
                  </div>
                </template>
              </div>
              <FormComsItem v-else :formItem.sync="item" :taskState="formState"></FormComsItem>
            </div>
          </template>

        </li>
      </ul>
      <div class="btnsWrap">
        <x-button type="primary" v-if="[1,3].includes(formState)" action-type="button" @click.native="submit">提交</x-button>
        <!-- <x-button type="primary" action-type="button">提交并切换学生</x-button> -->
        <x-button action-type="button" @click.native="goback">返回</x-button>
      </div>
      <!-- 选择列表，多选择列表 -->
      <x-dialog v-model="showHideOnBlur" :dialog-style="{'max-width': '100%',width:'80%', overflow:'auto', 'background-color':'#fff',color:'#696969','border-radius':'6px','box-shadow': '0 0 4px #ccc'}" :class="{'vux-1px':showHideOnBlur}" hide-on-blur>
        <h4 class="vux-1px-b">{{popData.formItemName}}</h4>
        <div class="modalWrapper">
          <group title="" v-if="popType == 0">
            <radio :options="popData.formSelectItemResps" v-model="popData.formItemValue"></radio>
          </group>
          <div v-if="popType == 1">
            <checklist title=""  label-position="left" :options="popData.formSelectItemResps" v-model="popData.itemValArr" @on-change="change"></checklist>
          </div>
        </div>
        <flexbox>
          <flexbox-item>
            <x-button type="default cancel" action-type="button"  @click.native="showHideOnBlur = false">取消</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button class="confirm" action-type="button" type="default" @click.native="checkListCommit">确定</x-button>
          </flexbox-item>
        </flexbox>
      </x-dialog>
    </form>
    <!--视频大文件上传弹框-->
    <div class="viedoPropParent" v-show="upDataShow">
      <div class="viedoProp">
        <p class="videoP1">
          <img @click="upDataShow=false" src="@/assets/img/videoX.png" alt="">
          <img @click="upDataVideo(propId,propsta,-1)" src="@/assets/img/videoRrefresh.png" alt="">
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
    <div class="weui-toast myToast" v-show="toastShow">
      <inline-loading class="toastLoading"></inline-loading>
      <p>上传中：{{percent}}</p>
    </div>
    <!-- 视频播放控件 -->
    <div class="videoParent" @click.prevent.stop="videoPropShow=false" v-if="videoPropShow">
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
      ></video-player>
    </div>
    <!-- 选人插件组件 -->
    <SelectStu v-bind:uid="uid" v-bind:orgId="orgId" v-bind:type="type" v-bind:sreach_tea="sreach_tea" v-bind:sreach_stu="sreach_stu" @qd="qd" @qx="qx" v-if="tsshow && roleType=='stu'" v-bind:xr="xr"></SelectStu>
    <SelectTea v-bind:uid="uid" v-bind:orgId="orgId" v-bind:type="type" v-bind:sreach_tea="sreach_tea" v-bind:sreach_stu="sreach_stu" @qd="qd" @qx="qx" v-if="tsshow && roleType=='tea'" v-bind:xr="xr"></SelectTea>
  </div>
</template>

<style lang="less">
  @import "less/task-details.less";
</style>

<script>
  import taskDetails from './task-details.js'
  export default taskDetails
</script>

