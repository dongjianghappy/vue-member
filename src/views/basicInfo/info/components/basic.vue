<template>
<div class="module-wrap m0">
  <div class="module-content basic-info">
    <div class="info-module" :class="{'cancel-module': !isEdit}">
      <span class="name">基本信息</span>
      <div class="line"></div>
      <v-space>
        <span v-show="!isEdit" class="update-info cancelbtn" @click="handelCancel">取消</span>
        <span class="update-info editbtn" @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </v-space>
    </div>
    <ul class="info">
      <li>
        <label>用户名</label>
        <div>{{basicInfo.username}} ID {{basicInfo.account}}</div>
      </li>
      <li>
        <label>昵称</label>
        <div class="con" v-if="isEdit">{{basicInfo.nickname}}</div>
        <input type="text" v-model="userInfo.nickname" class="input-sm" v-else>
      </li>
      <li>
        <label>空间名称</label>
        <div class="con" v-if="isEdit">{{basicInfo.space_name}}</div>
        <textarea v-model="userInfo.space_name" v-else></textarea>
      </li>
      <li>
        <label>签名</label>
        <div class="con" v-if="isEdit">{{basicInfo.signature}}</div>
        <input type="text" v-model="userInfo.signature" class="input-sm" v-else>
      </li>
      <li>
        <label>真实姓名</label>
        <div class="con" v-if="isEdit">{{basicInfo.realname}}
          <span class="right" @click="secrecy('realname')">保密</span>
        </div>
        <input type="text" v-model="userInfo.realname" class="input-sm" v-else>
      </li>
      <li>
        <label>姓别</label>
        <div class="con" v-if="isEdit">{{basicInfo.sex === "1" ? "男" : "女"}}
          <span class="right" @click="secrecy('sex')">保密</span>
        </div>
        <span v-else>
          <input name="sex" type="radio" value="1" class="sex" v-model="userInfo.sex"> 男&nbsp;&nbsp;
          <input name="sex" type="radio" value="0" class="sex" v-model="userInfo.sex"> 女
        </span>
      </li>

      <li>
        <label>生日</label>
        <div class="con" v-if="isEdit"><span id="year">{{basicInfo.year}}</span>年 <span id="month">{{basicInfo.month}}</span>月 <span id="day">{{basicInfo.day}}</span>日
          <span class="right" @click="secrecy('birth')">保密</span>
        </div>
        <v-birthday :data="{year: basicInfo.year, month: basicInfo.month, day: basicInfo.day}" @choose="chooseBirthday" v-else />

      </li>

      <li>
        <label>所在地</label>
        <div class="con" v-if="isEdit">
          <span id="province">{{address.province}}</span>
          <span id="city">{{address.city}}</span>
          <span id="area">{{address.area}}</span>
          <span class="right" @click="secrecy('address')">保密</span>
        </div>
        <v-citylist :data="{province: basicInfo.province, city: basicInfo.city, area: basicInfo.area}" @choose="chooseArea" v-else />

      </li>
      <li><label>血型</label>
        <div class="con" v-if="isEdit">{{basicInfo.bloodtype}} 型
          <span class="right" @click="secrecy('bloodtype')">保密</span>
        </div>
        <span class="selectgroup" v-else>
          <select v-model="userInfo.bloodtype" class="">
            <option value="A">A型</option>
            <option value="B">B型</option>
            <option value="AB">AB型</option>
            <option value="O">O型</option>
          </select>
        </span>
      </li>
      <li style="height: auto"><label>博主说明</label>
        <div class="con" v-if="isEdit">{{basicInfo.blogger}}</div>
        <textarea v-model="userInfo.blogger" v-else></textarea>
      </li>
      <li style="height: auto"><label>简介</label>
        <div class="con" v-if="isEdit">{{basicInfo.introduction}}</div>
        <textarea v-model="userInfo.introduction" v-else></textarea>
      </li>
      <li style="height: auto"><label>留言寄语</label>
        <div class="con" v-if="isEdit">{{basicInfo.message}}</div>
        <textarea v-model="userInfo.message" v-else></textarea>
      </li>
    </ul>
  </div>

</div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  computed
} from 'vue'
import citys from '@/assets/cityData'

const props: any = defineProps({
  basicInfo: {
    type: Object,
    default: () => {
      return {}
    }
  },
  edit: {
    type: Function,
    default: () => {
      return
    }
  },
  secrecy: {
    type: Function,
    default: () => {
      return
    }
  },
})
const emit: any = defineEmits(['update:basicInfo'])
let isEdit = ref(true)
const cityData: any = reactive(citys)
const userInfo: any = ref(props.basicInfo)
const address = computed(() => render());

function render() {
  let province = ""
  let city = ""
  let area = ""
  for (var i in cityData) {
    const arr = i.split(',');
    if (arr.length == 1) {
      province = cityData[i][props.basicInfo.province]
    }
    if (arr.length == 2 && arr[1] == props.basicInfo.province) {
      city = cityData[i][props.basicInfo.city]
    }
    if (arr.length == 3 && arr[2] == props.basicInfo.city) {
      area = cityData[i][props.basicInfo.area]
    }
  }

  return {
    province,
    city,
    area
  }
}

function Edit() {
  isEdit.value = !isEdit.value
  userInfo.value = props.basicInfo
  emit('update:basicInfo', userInfo.value)

  if (isEdit.value) {
    const {
      nickname,
      space_name,
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
      blogger,
      introduction,
      message
    } = props.basicInfo
    props.edit({
      nickname,
      space_name,
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
      blogger,
      introduction,
      message
    })
  }
}

function chooseBirthday(param: any) {
  userInfo.value.year = param.year
  userInfo.value.month = param.month
  userInfo.value.day = param.day
}

function chooseArea(param: any) {
  userInfo.value.province = param.province
  userInfo.value.city = param.city
  userInfo.value.area = param.area
}

function handelCancel() {
  isEdit.value = !isEdit.value
}
</script>
