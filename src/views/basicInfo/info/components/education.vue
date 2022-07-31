<template>
<div class="module-wrap m0">
  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module" :class="{'cancel-module': !isEdit}" >
      <span class="name">教育信息</span>
      <div class="line"></div>
      <v-space>
        <span v-show="!isEdit" class="update-info cancelbtn" @click="handelCancel">取消</span>
        <span  class="update-info editbtn" @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </v-space>
    </div>
    <ul class="info">
      <li>
        <label for="username"></label>
        <div class="con" v-if="isEdit">{{user.education}}</div>
        <textarea v-model="userInfo.education" class="" v-else></textarea>
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
    user: {
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
  emits: ['update:user'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    let isEdit = ref(true)
    const userInfo: any = ref(props.user)

    function Edit() {
      isEdit.value = !isEdit.value
      userInfo.value = props.user
      context.emit('update:user', userInfo.value)

      if (isEdit.value) {
        const {
          education
        } = props.user
        props.edit({
          education
        })
      }
    }

    // 取消
    function handelCancel() {
      isEdit.value = !isEdit.value
    }

    return {
      isEdit,
      Edit,
      handelCancel,
      userInfo
    }
  }
})
</script>
