<template>
<div class="module-wrap m0">
  <div class="module-content basic-info">
    <div class="info-module" :class="{'cancel-module': !isEdit}" >
      <span class="name">联系信息</span>
      <div class="line"></div>
      <v-space>
        <span v-show="!isEdit" class="update-info cancelbtn" @click="handelCancel">取消</span>
        <span  class="update-info editbtn" @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </v-space>
    </div>
    <ul class="info">
      <li>
        <label>邮箱</label>
        <div class="con" v-if="isEdit">{{basicInfo.email}}</div>
        <input type="text" v-model="userInfo.email" class="input-sm" v-else>
      </li>
      <li>
        <label>电话</label>
        <div class="con" v-if="isEdit">{{basicInfo.phone}}</div>
        <input type="text" v-model="userInfo.phone" class="input-sm" v-else>
      </li>
      <li>
        <label>QQ</label>
        <div class="con" v-if="isEdit">{{basicInfo.qq}}</div>
        <input type="text" v-model="userInfo.qq" class="input-sm" v-else>
      </li>
      <li>
        <label>微信</label>
        <div class="con" v-if="isEdit">{{basicInfo.weixin}}</div>
        <input type="text" v-model="userInfo.weixin" class="input-sm" v-else>
      </li>
    </ul>
  </div>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  computed
} from 'vue'

export default defineComponent({
  name: 'AsideView',
  props: {
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
    }
  },
  emits: ['update:basicInfo'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    let isEdit = ref(true)
    const userInfo: any = ref(props.basicInfo)

    function Edit() {
      isEdit.value = !isEdit.value
      userInfo.value = props.basicInfo
      context.emit('update:basicInfo', userInfo.value)

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

    // 取消
    function handelCancel() {
      isEdit.value = !isEdit.value
    }

    return {
      isEdit,
      handelCancel,
      Edit,
      userInfo
    }
  }
})
</script>
