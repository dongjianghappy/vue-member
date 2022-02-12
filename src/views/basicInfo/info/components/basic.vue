<template>
  <div class="module-wrap m0">
    <div class="module-content basic-info">
      <div class="info-module">
        <span class="name">基本信息</span>
        <div class="line"></div>
        <span data-coding=""
              class="update-info editbtn"
              @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </div>
      <ul class="info">
        <li>
          <label>用户名</label>
          <div>{{user.username}} ID {{user.account}}</div>
        </li>
        <li>
          <label>昵称</label>
          <div class="con"
               v-if="isEdit">{{user.nickname}}</div>
          <input type="text"
                 v-model="userInfo.nickname"
                 class="input-sm"
                 v-else>
        </li>
        <li>
          <label>签名</label>
          <div class="con"
               v-if="isEdit">{{user.signature}}</div>
          <input type="text"
                 v-model="userInfo.signature"
                 class="input-sm"
                 v-else>
        </li>
        <li>
          <label>真实姓名</label>
          <div class="con"
               v-if="isEdit">{{user.realname}}</div>
          <input type="text"
                 v-model="userInfo.realname"
                 class="input-sm"
                 v-else>
        </li>
        <li>
          <label>姓别</label>
          <div class="con"
               v-if="isEdit">{{user.sex === "1" ? "男" : "女"}}</div>
          <span v-else>
            <input name="sex"
                   type="radio"
                   value="1"
                   class="sex"
                   v-model="userInfo.sex"> 男&nbsp;&nbsp;
            <input name="sex"
                   type="radio"
                   value="0"
                   class="sex"
                   v-model="userInfo.sex"> 女
          </span>
        </li>

        <li>
          <label>生日</label>
          <div class="con"
               v-if="isEdit"><span id="year">{{user.year}}</span>年 <span id="month">{{user.month}}</span>月 <span id="day">{{user.day}}</span>日</div>
          <v-birthday :data="{year: user.year, month: user.month, day: user.day}"
                      @choose="chooseBirthday"
                      v-else />

        </li>

        <li>
          <label>所在地</label>
          <div class="con"
               v-if="isEdit">
            <span id="province">{{address.province}}</span>
            <span id="city">{{address.city}}</span>
            <span id="area">{{address.area}}</span>
          </div>
          <v-citylist :data="{province: user.province, city: user.city, area: user.area}"
                      @choose="chooseArea"
                      v-else />

        </li>
        <li><label>血型</label>
          <div class="con"
               v-if="isEdit">{{user.bloodtype}} 型</div>
          <span class="selectgroup"
                v-else>
            <select v-model="userInfo.bloodtype"
                    class="">
              <option value="A">A型</option>
              <option value="B">B型</option>
              <option value="AB">AB型</option>
              <option value="O">O型</option>
            </select>
          </span>
        </li>
        <li style="min-height: 95px"><label>简介</label>
          <div class="con"
               v-if="isEdit">{{user.introduction}}</div>
          <textarea v-model="userInfo.introduction"
                    v-else></textarea>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, computed } from 'vue'
import citys from '@/assets/cityData'

export default defineComponent({
  name: 'AsideView',
  props: {
    user: {
      type: Object,
      default: () => {return {}}
    },
    edit: {
      type: Function,
      default: () => {
        return 
      }
    }
  },
emits: ['update:user'],
setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  let isEdit = ref(true)
  const cityData: any = reactive(citys)
  const userInfo: any = ref(props.user)
 

  const address =  computed(() => render());

  function render(){
    let province = ""
    let city = ""
    let area = ""
    for(var i in cityData){
      const arr = i.split(',');
      if(arr.length == 1){
        province = cityData[i][props.user.province]
      }
      if(arr.length == 2 && arr[1] == props.user.province){
        city = cityData[i][props.user.city]
      }
      if(arr.length == 3 && arr[2] == props.user.city){
        area = cityData[i][props.user.area]
      }
    }	

    return {
      province,
      city,
      area
    }
  }

  function Edit(){
    isEdit.value = !isEdit.value
    debugger
    userInfo.value = props.user
    context.emit('update:user', userInfo.value)

    if(isEdit.value){
      const { nickname, signature, realname, sex, year, month, day, province, city, area, bloodtype, introduction } = props.user
      props.edit({
        nickname,
        signature,
        realname,
        sex,
        year,
        month,
        day,
        province,
        city,
        area,
        bloodtype,
        introduction

      })
    }
   
  }

  function chooseBirthday(param: any){
    userInfo.value.year = param.year
    userInfo.value.month = param.month
    userInfo.value.day = param.day
  }

  function chooseArea(param: any){
    userInfo.value.province = param.province
    userInfo.value.city = param.city
    userInfo.value.area = param.area
  }
    

  return {
    isEdit,
    Edit,
    userInfo,
    chooseBirthday,
    chooseArea,
    address
  }
}    
  
})
</script>
