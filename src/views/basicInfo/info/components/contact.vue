<template>
<div class="module-wrap m0">
  <div class="module-content basic-info">
    <div class="info-module" :class="{'cancel-module': !isEdit}">
      <span class="name">联系信息</span>
      <div class="line"></div>
      <v-space>
        <span v-show="!isEdit" class="update-info cancelbtn" @click="handelCancel">取消</span>
        <span class="update-info editbtn" @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </v-space>
    </div>
    <ul class="info">
      <li>
        <label>邮箱</label>
        <div class="con" v-if="isEdit">{{basicInfo.email}}
          <span class="right" @click="secrecy('email')">保密</span>
        </div>
        <input type="text" v-model="userInfo.email" class="input-sm" v-else>
      </li>
      <li>
        <label>电话</label>
        <div class="con" v-if="isEdit">{{basicInfo.phone}}
          <span class="right" @click="secrecy('phone')">保密</span>
        </div>
        <input type="text" v-model="userInfo.phone" class="input-sm" v-else>
      </li>
      <li>
        <label>QQ</label>
        <div class="con" v-if="isEdit">{{basicInfo.qq}}
          <span class="right" @click="secrecy('qq')">保密</span>
        </div>
        <input type="text" v-model="userInfo.qq" class="input-sm" v-else>
      </li>
      <li>
        <label>微信</label>
        <div class="con" v-if="isEdit">{{basicInfo.weixin}}
          <span class="right" @click="secrecy('weixin')">保密</span>
        </div>
        <input type="text" v-model="userInfo.weixin" class="input-sm" v-else>
      </li>
    </ul>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref
} from 'vue'

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
const userInfo: any = ref(props.basicInfo)

function Edit() {
  isEdit.value = !isEdit.value
  userInfo.value = props.basicInfo
  emit('update:basicInfo', userInfo.value)

  if (isEdit.value) {
    const {
      email,
      phone,
      qq,
      weixin
    } = props.basicInfo
    props.edit({
      email,
      phone,
      qq,
      weixin
    })
  }
}

function handelCancel() {
  isEdit.value = !isEdit.value
}
</script>
